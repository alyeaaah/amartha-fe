import React from 'react';
import { Card, Tag, Statistic, Row, Col, Skeleton } from 'antd';
import { StarOutlined, TrophyOutlined, TeamOutlined, UsergroupAddOutlined, DesktopOutlined } from '@ant-design/icons';
import { useRouteParams } from 'typesafe-routes/react-router';
import { paths } from '@/router/paths';
import { AnimeApiHooks } from '../api';
import { Link } from 'react-router-dom';
import LayoutWrapper from '@/components/LayoutWrapper';
import { CarouselThumbnailMiniComponent } from '../components/carousel-thumbnail-mini.component';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';



export const AnimeDetailPage: React.FC = () => {
  const breakpoint = useBreakpoint();
  const slidesToShow: number = (() => {
    switch (true) {
      case breakpoint.lg:
        return 10;
      case breakpoint.md:
        return 6;
      case breakpoint.sm:
        return 3;
      default:
        return 3;
    }
  })()
  const { id } = useRouteParams(paths.animePage.detail);
  const { data: animeData, isLoading: animeLoading } = AnimeApiHooks.useGetAnimeDetail({
    params: {
      id: id,
    },
  }, {
    enabled: !!id,
    select: (data) => data.data
  });
  const { data: relatedData, isLoading: relatedLoading } = AnimeApiHooks.useGetAnimeRelated({
    params: {
      id: id,
    },
  }, {
    enabled: !!id,
    select: (data) => data.data
  });
  const { data: recommendationsData, isLoading: recommendationsLoading } = AnimeApiHooks.useGetAnimeRecommendations({
    params: {
      id: id,
    },
  }, {
    enabled: !!id,
    select: (data) => data.data
  });
  return (
    <div className="min-h-screen bg-gradient-to-br bg-white text-gray-100">
      {/* Header Section */}
      <div className="relative min-h-96 overflow-hidden flex items-end">
        <div className='absolute inset-0 rounded-b-3xl overflow-hidden'>
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm scale-110 rounded-b-3xl overflow-hidden"
            style={{ backgroundImage: `url(${animeData?.images.jpg.large_image_url})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-white/20 to-white" />
        </div>
        <LayoutWrapper>
          <div className="relative mx-auto p-6 h-full flex items-end justify-end rounded-t-3xl bg-opacity-50 bg-dark backdrop-blur-sm mt-6">
            <div className="flex gap-6 w-full flex-col lg:flex-row">
              {animeLoading &&
                <Skeleton.Image active style={{ width: "224px", height: "100%", aspectRatio: "3/4" }} />
              }
              {!animeLoading &&
                <img
                  src={animeData?.images.jpg.large_image_url || ""}
                  alt={animeData?.title || ""}
                  className="w-full lg:w-56 h-full object-cover rounded-lg shadow-2xl ring-2 ring-white/10"
                />
              }
              <div className="flex-1 pb-4 flex flex-col justify-end">
                {!animeLoading && <>
                  <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-xl">
                    {animeData?.title}
                  </h1>
                  <p className="text-lg text-white font-bold drop-shadow-[0_0_2px_rgba(0,0,0,0.7)] opacity-60 mb-4">{animeData?.title_japanese}</p>
                  <div className="flex gap-1 flex-wrap">
                    {animeData?.genres?.map((genre) => (
                      <Tag key={genre.name} className="bg-white/10 border-white/20 text-white">
                        {genre.name}
                      </Tag>
                    ))}
                  </div>
                  <div className="flex flex-col mt-4 gap-0">
                    <span>Produced by:</span>
                    <div className='flex flex-wrap gap-1 mt-1'>
                      {animeData?.producers?.map((producer) => (
                        <Tag key={producer.name} className="bg-[#7C51A2]/90 border-[#7C51A2]/90 text-white">
                          {producer.name}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-wrap mt-2">
                    Themes:&nbsp;
                    {animeData?.themes?.map((theme) => theme.name)?.join(', ')}
                  </div>
                </>
                }
                {animeLoading && <div className='flex flex-col gap-2'>
                  <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-xl">
                    <Skeleton.Node active style={{ width: "320px", height: "32px" }} />
                  </h1>
                  <Skeleton.Node active style={{ width: "180px", height: "28px" }} />
                  <div className='flex gap-2'>
                    <Skeleton.Node active style={{ width: "180px", height: "18px" }} />
                    <Skeleton.Node active style={{ width: "120px", height: "18px" }} />
                    <Skeleton.Node active style={{ width: "160px", height: "18px" }} />
                  </div>
                  <Skeleton.Node active style={{ width: "220px", height: "18px" }} />
                  <Skeleton.Node active style={{ width: "420px", height: "18px" }} />
                </div>
                }
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </div>

      {/* Main Content */}
      <LayoutWrapper>
        {/* Statistics Row */}
        {!animeLoading && <Row gutter={[16, 16]} className="my-8 !mx-4">
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-slate-800/80 border-slate-700 backdrop-blur relative rounded-2xl">
              <Statistic
                title={<span className="text-white">Score</span>}
                value={animeData?.score || 'N/A'}
                prefix={<StarOutlined className="text-yellow-500" />}
                valueStyle={{ color: '#fff' }}
              />
              <p className="absolute bottom-4 right-4 text-xs text-white mt-1">{animeData?.scored_by?.toLocaleString()} users</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-slate-800/80 border-slate-700 backdrop-blur relative rounded-2xl">
              <Statistic
                title={<span className="text-white">Ranked</span>}
                value={animeData?.rank ? `#${animeData?.rank}` : 'N/A'}
                prefix={<TrophyOutlined className="text-purple-500" />}
                valueStyle={{ color: '#fff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-slate-800/80 border-slate-700 backdrop-blur relative rounded-2xl">
              <Statistic
                title={<span className="text-white">Popularity</span>}
                value={animeData?.popularity ? `#${animeData?.popularity}` : 'N/A'}
                prefix={<TeamOutlined className="text-blue-500" />}
                valueStyle={{ color: '#fff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="bg-slate-800/80 border-slate-700 backdrop-blur relative rounded-2xl">
              <Statistic
                title={<span className="text-white">Members</span>}
                value={animeData?.members?.toLocaleString() || 'N/A'}
                valueStyle={{ color: '#fff' }}
              />
            </Card>
          </Col>
        </Row>
        }
        {
          animeLoading && <div className="grid grid-cols-12 gap-2 lg:gap-6 p-6">
            <Skeleton.Node className='col-span-3 !rounded-2xl !h-[110px] !w-full' active />
            <Skeleton.Node className='col-span-3 !rounded-2xl !h-[110px] !w-full' active />
            <Skeleton.Node className='col-span-3 !rounded-2xl !h-[110px] !w-full' active />
            <Skeleton.Node className='col-span-3 !rounded-2xl !h-[110px] !w-full' active />
          </div>
        }

        {/* Synopsis */}
        <Card className=" border-[#7C51A2] backdrop-blur mb-6 !mx-6 rounded-2xl flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-[#7C51A2]">Synopsis</h2>
          {animeLoading && <div className='w-full h-24 flex-1'>
            <Skeleton paragraph={{ rows: 3, width: "100%", style: { height: "14px", width: "100%" } }} title={false} active />
          </div>}
          {!animeLoading && <p className="text-gray-800 leading-relaxed">{animeData?.synopsis}</p>}
        </Card>

        {/* Background */}
        {animeData?.background && (
          <Card className=" border-[#7C51A2] backdrop-blur mb-6 !mx-6 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-[#7C51A2]">Background</h2>
            {!animeLoading && <p className="text-gray-800 leading-relaxed">{animeData?.background}</p>}
          </Card>
        )}

        {/* Information Grid */}
        <Row gutter={[16, 16]} className="!mx-4">
          <Col xs={24} lg={8}>
            <Card className="bg-gradient-to-r from-[#401A55] to-[#693979] backdrop-blur rounded-2xl h-full">
              <h2 className="text-xl font-semibold mb-4 text-white">Information</h2>

              {animeLoading && <div className='w-full h-24 flex-1'>
                <Skeleton paragraph={{ rows: 8, width: "100%", style: { height: "14px", width: "100%" } }} title={false} active />
              </div>}
              {!animeLoading && <div className="space-y-0">
                <InfoRow label="Type" value={animeData?.type || "Movie"} />
                <InfoRow label="Episodes" value={animeData?.episodes} />
                <InfoRow label="Status" value={animeData?.status} />
                <InfoRow label="Aired" value={animeData?.aired?.string} />
                <InfoRow
                  label="Licensors"
                  value={animeData?.licensors?.map(l => l.name).join(', ') || 'None found'}
                />
                <InfoRow
                  label="Studios"
                  value={animeData?.studios?.map(s => s.name).join(', ')}
                />
                <InfoRow label="Source" value={animeData?.source} />
                <InfoRow label="Duration" value={animeData?.duration} />
                <InfoRow label="Rating" value={animeData?.rating} />
              </div>}
            </Card>
          </Col>

          <Col xs={24} lg={8} className='flex flex-col justify-between h-full'>
            <Card className="border-[#7C51A2] backdrop-blur mb-4 rounded-2xl flex flex-col flex-1 !pt-0 overflow-y-scroll" >
              <h2 className="text-xl sticky z-10 font-semibold mb-2 text-[#7C51A2] top-0 bg-white">Favorited By</h2>
              <div className='flex flex-row items-center'>
                <UsergroupAddOutlined className="text-[#7C51A2] text-4xl" />
                <span className="text-2xl">{Intl.NumberFormat().format(animeData?.favorites || 0)}</span>
              </div>
            </Card>
            <Card className="border-[#7C51A2] backdrop-blur mb-4 rounded-2xl flex flex-col flex-1 !pt-0 overflow-y-scroll" >
              <h2 className="text-xl sticky z-10 font-semibold mb-2 text-[#7C51A2] top-0 bg-white">Broadcast</h2>
              <div className='flex flex-row gap-2 items-start'>
                <DesktopOutlined className="text-[#7C51A2] text-4xl" />
                {animeData?.broadcast?.day && <div className='flex flex-row justify-between w-full'>
                  <span className="text-2xl font-bold flex-col flex">{animeData?.broadcast?.day}
                    <span className="text-lg"> {animeData?.broadcast?.time}</span>
                  </span>
                  <span className="text-sm flex-col flex items-end bg-gradient-to-br from-[#7C51A2] to-[#693979] p-2 rounded-xl text-white h-fit">
                    {animeData?.broadcast?.timezone}
                    <span className="text-xs">Timezone</span>
                  </span>
                </div>}
                {!animeData?.broadcast?.day && <div className='flex flex-row items-center flex-1 h-full'>
                  <span className="text-xl flex-col flex">N/A</span>
                </div>}
              </div>
            </Card>

            <Card className="border-[#7C51A2] backdrop-blur rounded-2xl flex flex-col flex-1 !pt-0 overflow-y-scroll" >
              <h2 className="text-xl sticky z-10 font-semibold mb-2 text-[#7C51A2] top-0 bg-white">Titles</h2>
              <div className='flex flex-row items-center'>
                <div className='flex flex-col gap-1 items-start'>
                  {animeData?.titles?.map((title, i) => (
                    <div className='flex flex-row items-center gap-2' key={i}>
                      <span className="text-lg">{title.title}</span>
                      <span className="text-xs">{title.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card className="border-[#7C51A2] backdrop-blur mb-6 rounded-2xl h-full">
              <h2 className="text-xl font-semibold mb-4 text-[#7C51A2]">Related Anime</h2>
              <div className="space-y-3 flex flex-col">
                {relatedData?.map((relation) => {
                  const relationName = relation.relation;
                  return relation.entry.map((anime, ai) => (
                    <Link
                      to={paths.animePage.detail({ id: String(anime.mal_id) }).$}
                      key={ai}
                      className="border-b"
                    >
                      {relationName}: {anime.name}
                    </Link>
                  ))
                }) || "No related anime"}
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={24} lg={24} className='px-6 mt-6'>
            {(!recommendationsLoading && recommendationsData && recommendationsData?.length > 0) && <CarouselThumbnailMiniComponent
              animeList={recommendationsData?.map((anime) => ({
                id: anime.entry.mal_id,
                title: anime.entry.title,
                imageUrl: anime.entry.images?.jpg.image_url || ''
              })) || []}
              title='Recommendation'
              slideshow={{
                slidesToScroll: 1,
                slidesToShow: slidesToShow,
              }}
            />}
          </Col>
        </Row>
      </LayoutWrapper>
    </div>
  );
};

const InfoRow: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div className="flex justify-between py-2 my-0 border-b border-slate-700/50">
    <span className="text-white font-medium">{label}:</span>
    <span className="text-gray-200 text-right max-w-xs">{value || 'N/A'}</span>
  </div>
);


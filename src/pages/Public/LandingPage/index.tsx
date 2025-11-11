import { IconLogo } from '@/assets/images/icons';
import LayoutWrapper from '@/components/LayoutWrapper';
import { Divider, Layout, Button, Carousel, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { PublicHeader } from '@/components/Header';
import { paths } from '@/router/paths';
import { AnimeApiHooks } from '@/pages/Anime/api';
import { CarouselThumbnailComponent } from '@/pages/Anime/components/carousel-thumbnail.component';

const { Header, Content } = Layout;


export const LandingPage = () => {
  const navigate = useNavigate();
  const [animateMenu, setAnimateMenu] = useState(-1);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,

  });
  const { data: topAnimeList, isLoading: topAnimeLoading } = AnimeApiHooks.useGetAnimeTop({
    queries: {
      limit: 24,
    }
  }, {});
  useEffect(() => {
    setAnimateMenu((prev) => prev + 1);
  }, [inView]);
  return (
    <>
      {/* <PageHeader /> */}
      <PublicHeader />
      <PublicHeader key={inView ? 'inView' : 'notInView'} className={`rounded-b-2xl fixed top-[-90px] w-full z-20 ${inView === true && animateMenu > 1 ? `animate-slide-out-top` : (inView === false && animateMenu > 1 ? `fixed animate-slide-in-top ` : '')}`} />

      <div className='h-[20vh] w-full bg-[linear-gradient(to_right,#38144E,#92599D)] mb-6 relative rounded-b-[48px] shadow-xl overflow-hidden'>

        <LayoutWrapper className="h-full">
          <div className='z-10 h-full flex flex-col justify-around text-white items-center'>
            <div className='flex flex-row items-center gap-2 '
              ref={ref}
            >
              <IconLogo className="w-48 h-24" />
              <Divider className='border-white h-14' type='vertical' />
              <div className='flex flex-col'>
                <h2 className='text-lg font-semibold'>Frontend Take Home Test</h2>
                <h2 className='text-xs font-light opacity-70'>By <span className='font-semibold'>Zau</span></h2>
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </div>
      {/* BEGIN: First Section */}
      <LayoutWrapper className='w-full max-w-full grid grid-cols-12 gap-2 sm:gap-8 overflow-hidden'>
        <CarouselThumbnailComponent
          isLoading={topAnimeLoading}
          bordered
          title="Top Anime"
          subtitle="Our curated list of top anime"
          action={<Button
            type="default"
            size='large'
            variant="outlined"
            className='text-[#7C51A2] border-[#7C51A2] hover:!text-white hover:!bg-[#7C51A2] hover:!border-[#7C51A2]'
            onClick={() => navigate(paths.animePage.index({}).$)}
          >
            Dive In
          </Button>}
          animeList={topAnimeList?.data || []}
          slideshow={{
            autoplay: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            dots: true,
            arrows: false,
          }}
        />
      </LayoutWrapper>
      {/* END: First Section */}
      {/* BEGIN: Second Section */}
      <LayoutWrapper className='bg-transparent rounded-[48px] shadow-xl relative'>
        <div className='h-3/4 absolute left-0 top-0 w-1/12 z-0 overflow-hidden flex items-center'>
          <IconLogo className="w-64 h-48 -rotate-90" />
        </div>
        <div className='h-3/4 absolute right-0 top-0 w-1/12 z-0 overflow-hidden flex items-center'>
          <IconLogo className="w-64 h-48 rotate-90" />
        </div>
        <Content className='!z-10'>
          <div className='grid grid-cols-12 gap-2 lg:gap-8 w-full mb-24 my-4'>
          </div>
        </Content>
      </LayoutWrapper>
      {/* END: Second Section */}
      {/* BEGIN: Third Section */}
      <LayoutWrapper>
        <Content>
        </Content>
      </LayoutWrapper>
      {/* END: Third Section */}
    </>
  );
}
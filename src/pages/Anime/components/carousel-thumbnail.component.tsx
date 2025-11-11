import { Carousel, Image } from "antd";
import { Anime } from "../api/schema";
import { EyeFilled, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { paths } from "@/router/paths";
interface CarouselThumbnailComponentProps {
  bordered?: boolean;
  action?: React.ReactNode;
  animeList: Anime[];
  title?: string;
  subtitle?: string;
  slideshow?: {
    autoplay?: boolean;
    slidesToShow?: number;
    slidesToScroll?: number;
    dots?: boolean;
    arrows?: boolean;
  }
}
export const CarouselThumbnailComponent = ({ action, animeList, title, subtitle, slideshow, bordered }: CarouselThumbnailComponentProps) => {
  return (<div className={`col-span-12 w-full overflow-visible ${bordered ? 'border border-[#7C51A2] p-4 rounded-2xl' : ''}`}>
    {title && <div className='w-full mb-4 flex flex-row gap-2 justify-between'>
      <div>
        <h2 className='text-2xl font-bold text-[#7C51A2]'>{title}</h2>
        {subtitle && <p className='text-xs font-light text-dark'>{subtitle}</p>}
      </div>
      {action}
    </div>}
    <Carousel
      autoplay={slideshow?.autoplay || true}
      className={`w-full h-fit gap-2 flex overflow-visible ${slideshow?.dots ? 'pb-2' : ''}`}
      slidesToShow={slideshow?.slidesToShow || 6}
      slidesToScroll={slideshow?.slidesToScroll || 1}
      dots={slideshow?.dots || false}
      arrows={slideshow?.arrows || false}
    >
      {animeList?.map((anime, index) => (
        <Link key={index} to={paths.animePage.detail({ id: String(anime.mal_id) }).$} className='px-2 flex flex-col gap-2 cursor-pointer hover:scale-110 transition-all duration-500 m-4'>
          <div className='rounded-2xl overflow-hidden aspect-[3/4] flex relative group'>
            <Image src={anime.images.webp.image_url || ''} alt={anime.title} className='!w-full !h-full !flex !object-cover' preview={false} />
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10 group-hover:opacity-0 transition-all duration-300'></div>
            <div className='absolute bottom-0 left-0 w-full h-fit z-20 px-2 flex group-hover:translate-y-[100px] translate-y-0  transition-all duration-700 items-center  bg-black/30 text-white'>
              {title && <span className="flex items-center gap-2 text-xs my-1"><EyeFilled />{Intl.NumberFormat('id-ID').format(anime.popularity || 0)}</span>}
              {!title && <div className='flex flex-col'>
                <h2 className='text-sm font-semibold text-[#fff] line-clamp-1'>{anime.title}</h2>
                <p className='text-xs font-light text-white'>
                  <span className='flex line-clamp-2'>
                    {anime.title_english}
                  </span>
                </p>
              </div>}
            </div>
          </div>
          {title && <div className='flex flex-col'>
            <h2 className='text-sm font-semibold text-[#7C51A2] line-clamp-1'>{anime.title}</h2>
            <p className='text-xs font-light text-dark group'>
              <span className='group-hover:hidden flex line-clamp-2'>
                {anime.title_english}
              </span>
              <span className='group-hover:flex hidden line-clamp-2'>
                {anime.title_japanese}
              </span>
            </p>
          </div>}
          {!title && <div className='flex flex-col'>
            <h2 className='text-xs font-semibold text-[#7C51A2] line-clamp-1 px-1 flex items-center justify-between'>
              <div className="flex items-center gap-1">
                <EyeFilled />{Intl.NumberFormat('id-ID').format(anime.popularity || 0)}
              </div>
              <div className="flex items-center gap-1">
                <StarFilled />{Intl.NumberFormat('id-ID').format(anime.favorites || 0)}
              </div>
            </h2>
          </div>}
        </Link>
      ))}
    </Carousel>
  </div >
  );
};
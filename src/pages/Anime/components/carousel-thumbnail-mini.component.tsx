import { Carousel, Image } from "antd";
import { Anime } from "../api/schema";
import { EyeFilled, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { paths } from "@/router/paths";
interface CarouselThumbnailMiniComponentProps {
  bordered?: boolean;
  action?: React.ReactNode;
  animeList: {
    id: number,
    title: string,
    imageUrl: string
  }[];
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
export const CarouselThumbnailMiniComponent = ({ action, animeList, title, subtitle, slideshow, bordered }: CarouselThumbnailMiniComponentProps) => {
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
        <Link key={index} className='px-2 flex flex-col gap-2 cursor-pointer hover:scale-110 transition-all duration-500 m-4' to={paths.animePage.detail({ id: String(anime.id) }).$}>
          <div className='rounded-2xl overflow-hidden aspect-[3/4] flex relative group'>
            <Image src={anime.imageUrl || ''} alt={anime.title} className='!w-full !h-full !flex !object-cover' preview={false} />
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10 group-hover:opacity-0 transition-all duration-300'></div>
            <div className='absolute bottom-0 left-0 w-full h-fit z-20 px-2 flex group-hover:translate-y-[100px] translate-y-0  transition-all duration-700 items-center  bg-black/30 text-white'>
              <p className='text-xs font-light text-white py-1'>
                <span className='flex !line-clamp-2 drop-shadow-md'>
                  {anime.title}
                </span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </Carousel >
  </div >
  );
};
import { Link } from "react-router-dom";
import { paths } from "@/router/paths";
import { Anime } from "../api/schema";
import { EyeOutlined, SafetyCertificateOutlined } from "@ant-design/icons";

export const AnimeThumbnailComponent = ({ anime }: { anime: Anime }) => {
  return (
    <Link to={paths.animePage.detail({ id: anime.mal_id.toString() }).$} className="group flex flex-col h-full hover:scale-105 transition-all duration-300 hover:shadow-xl rounded-lg">
      <div className="relative aspect-[3/4] !overflow-hidden rounded-lg block border border-[#7C51A2]">
        <img
          src={anime.images.jpg.image_url || ""}
          alt={anime.title}
          className="!w-full !h-full flex-1 object-cover !overflow-hidden rounded-lg "
          width={100}
          height={100}
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/600x400";
          }}
        />
      </div>
      <div className="flex flex-row items-center justify-between text-xs rounded-b-lg bg-[#7C51A2] text-white px-2 py-1 pt-3 -mt-2">
        <div className="flex flex-row items-center gap-1">
          <SafetyCertificateOutlined />
          <span>{anime.rating}</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <EyeOutlined />
          <span>{Intl.NumberFormat().format(anime.popularity || 0)}</span>
        </div>
      </div>
      <div className="flex flex-col flex-1 -mt-2 pt-4 group-hover:bg-[#7C51A217] p-2 rounded-b-lg hover:bg-opacity-10">
        <div className="font-semibold line-clamp-2 group-hover:text-[#7C51A2]">{anime.title}</div>
        <div className="text-xs text-gray-500 line-clamp-2">{anime.synopsis}</div>
      </div>
    </Link>
  )
} 
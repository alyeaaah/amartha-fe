import { ReactNode, useState } from "react";
import { CarouselThumbnailComponent } from "./components/carousel-thumbnail.component";
import { AnimeApiHooks } from "./api";
import { Badge, Button, Divider, Select, Table } from "antd";
import { useRouteParams } from "typesafe-routes/react-router";
import { paths } from "@/router/paths";
import { AnimeOrderBy, AnimeRating, AnimeSearchQuery, AnimeStatus, AnimeType, SortDirection } from "./api/schema";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "ahooks";
import Search from "antd/es/input/Search";
import { FilterOutlined } from "@ant-design/icons";
import { orderOptions } from "@/utils/constants";
import { AnimeFilterModal } from "./components/anime-filter.modal";
import dayjs from "dayjs";
import { AnimeThumbnailComponent } from "./components/anime-thumbnail.component";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";


export { AnimeDetailPage } from "./Detail";
export const AnimePage = () => {
  const navigate = useNavigate();
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
  const queryParams = useRouteParams(paths.animePage.index);
  const dateFormat = 'YYYY-MM-DD';
  const {
    limit,
    page,
    order_by,
    sort,
    q,
    genres,
    type,
    rating,
    status,
    producers,
    max_score,
    min_score,
    start_date,
    end_date
  } = queryParams;

  const [openFilter, setOpenFilter] = useState(false);

  const setQueryParams = (newParams: Partial<typeof queryParams>) => {
    navigate(paths.animePage.index({
      ...queryParams,
      ...newParams,
    }).$);
  }
  const { data: popularAnimeList, isLoading: popularAnimeListLoading } = AnimeApiHooks.useGetAnimeList({
    queries: {
      order_by: "popularity",
      sort: "desc",
      limit: 24,
    },
  });

  const { data: dataAnimeList, isLoading: dataAnimeListLoading } = AnimeApiHooks.useGetAnimeList({
    queries: {
      limit: limit || 25,
      page: page || 1,
      order_by: order_by as AnimeOrderBy || undefined,
      sort: sort as SortDirection || undefined,
      q: useDebounce(q || undefined, { wait: 500 }),
      genres: genres || undefined,
      type: type as AnimeType || undefined,
      rating: rating as AnimeRating || undefined,
      status: status as AnimeStatus || undefined,
      producers: producers || undefined,
      max_score: max_score || undefined,
      min_score: min_score || undefined,
      start_date: start_date ? dayjs(start_date).format(dateFormat) : undefined,
      end_date: end_date ? dayjs(end_date).format(dateFormat) : undefined,
    }
  }, { enabled: true });
  const countFilters = Object.values(queryParams).filter((value) => value !== undefined).length;
  return (
    <section className={`container mx-auto p-4 lg:px-8`}>
      <header className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
          Anime Archives
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-600">
          Browse through our collection of anime, from classic favorites to the latest releases.
        </p>
      </header>
      {/* Mission & Vision */}
      <div className="grid grid-cols-12">
        <div className="col-span-12 relative my-6">
          <div className="absolute bg-white border-[#7C51A2] border-2  rounded-lg lg:-top-4 lg:-left-4 top-0 left-0 h-fit z-10">
            <div className="flex flex-col items-center justify-center h-full overflow-hidden">
              <h2 className="px-2 py-1 text-2xl font-light text-[#7C51A2] !font-poppins  drop-shadow-[0_0_1px_rgba(124,81,162,1)] text-end flex flex-col">Popular Anime</h2>
            </div>
          </div>
          <CarouselThumbnailComponent
            className="border-2 border-[#7C51A2] shadow-[0_0_24px_rgba(124,81,162,1)_inset]  rounded-xl"
            slideshow={{
              autoplay: true,
              slidesToShow: slidesToShow,
              slidesToScroll: 1,
              dots: false,
              arrows: true,
            }}
            animeList={popularAnimeList?.data || []}
          />
        </div>
        <div className="col-span-12 grid grid-cols-12 py-2 gap-4">
          <div className="col-span-12 lg:col-span-4 flex flex-row items-center gap-2">
            <div className="flex-1">
              <Search
                placeholder="Search anime"
                className="rounded-lg border !border-[#7C51A2] z-20 relative"
                onChange={(e) => setQueryParams({ q: e.target.value })}
                size="large"
                value={q}
                allowClear
              />
            </div>
            <Button
              type="default"
              variant="outlined"
              id="filter-button"
              data-testid="filter-button"
              size="large"
              className="border-[#7C51A2] text-[#7C51A2] hover:!bg-[#7C51A2] hover:!text-white hover:!border-[#7C51A2]"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <FilterOutlined />
              {countFilters > 4 && <Badge count={countFilters - 4} />}
            </Button>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 flex flex-row items-center justify-end gap-2">
            <Select
              options={orderOptions}
              className="w-52"
              placeholder="Sort by"
              size="large"
              id="sort-by"
              data-testid="sort-by"
              value={order_by}
              onChange={(value) => setQueryParams({ order_by: value })}
            />
            <Select
              options={[{ value: "asc", label: "Ascending" }, { value: "desc", label: "Descending" }]}
              className="min-w-24 placeholder:!text-lg"
              placeholder="Sort"
              id="sort"
              data-testid="sort"
              value={sort}
              size="large"
              onChange={(value) => setQueryParams({ sort: value })}
            />
          </div>
        </div>
        <Divider className="col-span-12 my-2 lg:!my-4 border-[#7C51A2]" />
        <div className="col-span-12">
          <Table
            columns={[
              {
                dataIndex: "mal_id",
                key: "mal_id",
                render: (text, record) => (
                  <AnimeThumbnailComponent anime={record} />
                ),
              },
            ]}
            rowKey="mal_id"
            dataSource={dataAnimeList?.data || []}
            showHeader={false}
            loading={dataAnimeListLoading}
            pagination={{
              total: dataAnimeList?.pagination?.items?.total || 0,
              current: page || 1,
              pageSize: limit || 25,
              showSizeChanger: true,
              onChange: (page, limit) => {
                setQueryParams({ page, limit });
              },
            }}
            className="table-grid"
            components={{
              body: {
                wrapper: ({ children }: { children: ReactNode }) => <tbody className="thumbnail-grid-body">{children}</tbody>,
                row: ({ children }: { children: ReactNode }) => <tr className="thumbnail-grid-row">{children}</tr>,
                cell: ({ children }: { children: ReactNode }) => <td className="thumbnail-grid-cell">{children}</td>,
              },
            }}
          />
        </div>
        {/* Scroll to top Button using FAB*/}

        <AnimeFilterModal
          openFilter={openFilter}
          onApply={(filters) => {
            console.log(filters);
            setQueryParams({
              ...filters,
              page: 1,
              sort: filters.sort || undefined,
              genres: filters.genres || undefined,
              type: filters.type || undefined,
              rating: filters.rating || undefined,
              status: filters.status || undefined,
              producers: filters.producers || undefined,
              max_score: filters.max_score || undefined,
              min_score: filters.min_score || undefined,
              order_by: filters.order_by || undefined,
              start_date: !!filters.start_date ? dayjs(filters.start_date).format(dateFormat) : undefined,
              end_date: !!filters.end_date ? dayjs(filters.end_date).format(dateFormat) : undefined,
            });
            setOpenFilter(false);
          }}
          onClose={() => setOpenFilter(false)}
          filters={queryParams as AnimeSearchQuery}
        />
      </div>
    </section>
  );
}
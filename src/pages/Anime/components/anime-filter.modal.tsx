import { Button, DatePicker, Input, Modal, Select } from "antd";
import { AnimeSearchQuery, CustomDropdownType } from "../api/schema";
import { useState } from "react";
import { AnimeTypeEnum, AnimeRatingEnum, AnimeStatusEnum } from "../api/schema";
import { ratingOptions } from "@/utils/constants";
import FormItemLabel from "antd/es/form/FormItemLabel";
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AnimeApiHooks } from "../api";
import { useDebounce } from "ahooks";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Jakarta');

interface AnimeFilterModalProps {
  openFilter: boolean;
  onApply: (filters: AnimeSearchQuery) => void;
  onClose: () => void;
  filters: AnimeSearchQuery
}

export const AnimeFilterModal = ({ openFilter, onApply, onClose, filters }: AnimeFilterModalProps) => {
  const [tempFilters, setTempFilters] = useState<AnimeSearchQuery>(filters);
  const dateFormat = 'YYYY-MM-DD';
  const [keywords, setKeywords] = useState<string>('');
  const { data: genresData } = AnimeApiHooks.useGetAnimeGenres({}, {
    enabled: !!openFilter,
  });
  const { data: producersData, isLoading: producersLoading } = AnimeApiHooks.useGetAnimeProducers({
    queries: {
      q: useDebounce(keywords, { wait: 500 }),
    }
  }, {
    enabled: !!openFilter, select: (data) => {
      // filter duplicate data.mal_id
      const uniqueData = data.data.filter((item, index) => data.data.findIndex((t) => t.mal_id === item.mal_id) === index);
      return uniqueData;
    }
  });

  return (
    <Modal
      title="Filters"
      open={openFilter}
      onCancel={onClose}
      footer={<div className="flex items-center gap-2 justify-between">
        <Button onClick={() => {
          setTempFilters({
            ...tempFilters,
            limit: 25,
            page: 1,
            order_by: undefined,
            sort: undefined,
            genres: undefined,
            type: undefined,
            selectedGenres: undefined,
            selectedProducers: undefined,
            rating: undefined,
            status: undefined,
            producers: undefined,
            max_score: undefined,
            min_score: undefined,
            start_date: undefined,
            end_date: undefined,
          });
        }}>Reset</Button>
        <div className="flex flex-row items-center gap-2">
          <Button
            className="hover:bg-[#7C51A2] hover:text-white !bg-white !text-[#7C51A2] hover:!border-[#7C51A2]"
            onClick={() => {
              onClose();
            }}>Cancel</Button>
          <Button
            className="bg-[#7C51A2] text-white hover:!bg-white hover:!text-[#7C51A2] hover:!border-[#7C51A2]"
            onClick={() => {
              onApply(tempFilters);
            }}>Apply</Button>
        </div>
      </div>}
      className="lg:!w-[60vw]"
    >
      <div className="grid grid-cols-12 gap-2 lg:gap-4">
        <div className="lg:col-span-4 col-span-12">
          <FormItemLabel label="Type" prefixCls="!text-[#7C51A2]" htmlFor="type" />
          <Select
            placeholder="Select Type"
            id="type"
            onChange={(value) => setTempFilters({ ...tempFilters, type: value })}
            className="capitalize min-w-full line-clamp-1"
            size="large"
            allowClear
            options={Object.values(AnimeTypeEnum.Values).map((type) => ({ value: type, label: type }))}
            optionRender={(option) => <div className="capitalize">{option.label}</div>}
          />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <FormItemLabel label="Rating" prefixCls="!text-[#7C51A2]" htmlFor="rating" />
          <Select
            placeholder="Select Rating"
            id="rating"
            onChange={(value) => setTempFilters({ ...tempFilters, rating: value })}
            className="capitalize min-w-full line-clamp-1"
            size="large"
            allowClear
            options={ratingOptions}
            defaultValue={AnimeRatingEnum.enum.g}
            optionRender={(option) => <div className="capitalize">{option.label}</div>}
          />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <FormItemLabel label="Status" prefixCls="!text-[#7C51A2]" htmlFor="status" />
          <Select
            placeholder="Select Status"
            id="status"
            onChange={(value) => setTempFilters({ ...tempFilters, status: value })}
            className="capitalize min-w-full line-clamp-1"
            size="large"
            allowClear
            options={Object.values(AnimeStatusEnum.Values).map((status) => ({ value: status, label: status }))}
            optionRender={(option) => <div className="capitalize">{option.label}</div>}
          />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <FormItemLabel label="Genres" prefixCls="!text-[#7C51A2]" htmlFor="genres" />
          <Select
            placeholder="Select Genres"
            id="genres"
            onChange={(value) => {
              value = value.map((item) => String(item));
              setTempFilters({ ...tempFilters, genres: value.join(","), selectedGenres: genresData?.data.filter((genre) => value.includes(String(genre.mal_id)))?.map((genre) => ({ value: String(genre.mal_id), label: genre.name })) || [] })
            }}
            className="capitalize min-w-full line-clamp-1"
            key={JSON.stringify(tempFilters.selectedGenres)}
            value={tempFilters.selectedGenres?.map((genre) => String(genre.value))}
            defaultValue={tempFilters.selectedGenres?.map((genre) => String(genre.value))}
            size="large"
            allowClear
            mode="multiple"
            options={genresData?.data.map((genre) => ({ value: genre.mal_id, label: genre.name }))}
            optionRender={(option) => <div className="capitalize">{option.label}</div>}
            labelRender={(label) => <div className="capitalize">{genresData?.data.find((genre) => String(genre.mal_id) == String(label.value))?.name}</div>}
          />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <FormItemLabel label="Producers" prefixCls="!text-[#7C51A2]" htmlFor="producers" />
          <Select
            placeholder="Select Producers"
            optionFilterProp="title"
            id="producers"
            onChange={(value) => {
              value = value.map((item) => String(item));
              const filteredData = producersData?.filter((producer) => value.includes(String(producer.mal_id))) || [];
              const pickedProducers: CustomDropdownType[] = filteredData.map((producer) => ({ value: String(producer.mal_id), label: producer.name || "", title: producer.titles?.[0]?.title }));
              // concat pickedProducers with tempFilters.selectedProducers 
              const updatedProducers = [...(tempFilters.selectedProducers || []), ...pickedProducers];
              // remove duplicates
              const uniqueProducers = updatedProducers.filter((item, index) => updatedProducers.findIndex((t) => t.value === item.value) === index);
              // remove if data in uniqueProducers is not in value[]
              const filteredProducers = uniqueProducers.filter((producer) => value.includes(producer.value));
              setTempFilters({ ...tempFilters, selectedProducers: filteredProducers, producers: filteredProducers.map((producer) => producer.value).join(",") });
            }}
            value={tempFilters.selectedProducers?.map((producer) => producer.value)}
            onSearch={(value) => setKeywords(value)}
            className="capitalize min-w-full line-clamp-1"
            size="large"
            allowClear
            key={JSON.stringify(tempFilters.selectedProducers)}
            mode="multiple"
            loading={producersLoading}
            options={producersData?.map((producer) => ({ value: producer.mal_id, label: producer.name, title: producer.titles?.[0]?.title }))}
            optionRender={(option) => <div key={option.value}><span className="font-semibold capitalize">{option.label}</span> <span className="text-xs text-gray-500">{option.data?.title}</span></div>}
            labelRender={(label) => <div className="capitalize">{tempFilters.selectedProducers?.find((producer) => {
              return String(producer.value) === String(label.value)
            })?.title}</div>}
          />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <FormItemLabel label="Score" prefixCls="!text-[#7C51A2]" />
          <div className="flex items-center flex-row gap-2">
            <Input
              placeholder="Min Score"
              onChange={(e) => setTempFilters({ ...tempFilters, min_score: Number(e.target.value) })}
              value={tempFilters.min_score}
              size="large"
              allowClear
            /> -
            <Input
              placeholder="Max Score"
              onChange={(e) => setTempFilters({ ...tempFilters, max_score: Number(e.target.value) })}
              value={tempFilters.max_score}
              size="large"
              allowClear
            />
          </div>
        </div>
        <div className="lg:col-span-6 col-span-12">
          <FormItemLabel label="Release Date" prefixCls="!text-[#7C51A2]" htmlFor="releaseDate" />
          <DatePicker.RangePicker
            className="!h-[40px] rounded-lg"
            size="large"
            defaultValue={[tempFilters.start_date ? dayjs(tempFilters.start_date, dateFormat) : undefined, tempFilters.end_date ? dayjs(tempFilters.end_date, dateFormat) : undefined]}
            value={[tempFilters.start_date ? dayjs(tempFilters.start_date, dateFormat) : undefined, tempFilters.end_date ? dayjs(tempFilters.end_date, dateFormat) : undefined]}
            format={dateFormat}
            onChange={(dates) => {
              setTempFilters({ ...tempFilters, start_date: dates?.[0]?.format(dateFormat), end_date: dates?.[1]?.format(dateFormat) })
              console.log(dates?.[0]?.format(dateFormat), dates?.[1]?.format(dateFormat));
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
'use client';
import { reviewAlltApi } from '@/api/review';
import Review from '@/components/reviiew/Review';
import ReviewItem from '@/components/reviiew/ReviewItem';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import s from './reviewpage.module.scss';

const ReviewPage = () => {
  const [ref, isView] = useInView();
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => reviewAlltApi(0, 10),
    queryKey: ['reviewList'],
    staleTime: 1000 * 60 * 5,
  });

  const size = 5;

  const {
    data: FeedList,
    fetchNextPage: FeedListFetchNextPage,
    hasNextPage: FeedListHasNextPage,
    status: FeedListStatus,
    error: FeedListError,
    refetch,
    // isLoading,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ["getFeedList"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await reviewAlltApi(pageParam, size);
      return response
      // return response.map((item: any) => ({
      //   tag: item.tag,
      //   youtube_link: item.youtube_link,
      //   id: item.id
      // }));
    },
    staleTime: 1000 * 60 * 1,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // console.log('aa', allPages);
      return lastPage?.length === size ? allPages.length : undefined;
    },
  });

  useEffect(() => {
    if (isView && FeedListHasNextPage && !isFetchingNextPage) {
      FeedListFetchNextPage();
    }
  }, [isView, FeedListHasNextPage, FeedListFetchNextPage, isFetchingNextPage]);

  console.log('dd', FeedList);

  console.log('data', data);

  return (
    <div className="page">
      {/* <ReviewItem key={idx} data={item} type="slide" /> */}
      {FeedListStatus === "success" && (
        <div className="list-container">
          {FeedList?.pages[0].map((item: any, idx: any) => (
            <ReviewItem
              key={idx}
              data={item}
              type="reviewPage"
            />
          ))}
          {isFetchingNextPage && <div>Loading more...</div>}
          <div ref={ref} style={{ height: '10px' }} />
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
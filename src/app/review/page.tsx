import { reviewAlltApi } from '@/api/review';
import Review from '@/components/reviiew/Review';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ReviewPage = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => reviewAlltApi(0, 10),
    queryKey: ['reviewList'],
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div>
      전체 리뷰 상세보기

      {/* <ReviewItem key={idx} data={item} type="slide" /> */}
    </div>
  );
};

export default ReviewPage;
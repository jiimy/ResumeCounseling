import React from 'react';
import s from './review.module.scss';

const ReviewItem = ({ data }: { data: any }) => {
  return (
    <div className={s.review_item}>
      <p>{data.content}</p>
    </div>
  );
};

export default ReviewItem;
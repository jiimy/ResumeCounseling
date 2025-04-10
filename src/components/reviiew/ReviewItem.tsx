import React from 'react';
import s from './review.module.scss';

type data = {
  content: string;
  year: string;
  created_at: string;
  branch: string;
  name: string;
}

type reviewType = {
  type?: 'slide' | 'reviewPage';
  data: | data;
}

const ReviewItem = ({ type, data }: reviewType) => {
  return (
    <>
      {type === 'slide' &&
        <div className={s.review_item}>
          <p>{data?.content}</p>
        </div>
      }
      {type === 'reviewPage' &&
        <div className={s.review_item}>
          <h3>{data?.name}</h3>
          <span>{data?.year}</span>
          <p>{data?.content}</p>
        </div>
      }
    </>

  );
};

export default ReviewItem;
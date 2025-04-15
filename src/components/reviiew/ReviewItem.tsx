import React from 'react';
import s from './review.module.scss';
import classNames from 'classnames';

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
  console.log('item', data);
  return (
    <>
      {type === 'slide' &&
        <div className={s.review_item}>
          <p>{data?.content}</p>
        </div>
      }
      {type === 'reviewPage' &&
        <div className={classNames([s.review_item], {
          [s.page]: type === 'reviewPage',
        })}>
          <div className='flex justify-between'>
            <h3>{data?.name}</h3>
            <span>{data?.year}년차</span>
          </div>
          <div className='mt-8'>{data?.branch}</div>
          <p className='mt-20'>{data?.content}</p>
        </div>
      }
    </>

  );
};

export default ReviewItem;
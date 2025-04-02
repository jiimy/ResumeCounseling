import React from 'react';
import s from './post.module.scss'

const PostPage = () => {
  return (
    <div className={s.post_page}>
      <div>
        <input type="number" name="" id="" placeholder='연차 입력' />
        <input type="text" name="" id="" placeholder='분야' />
      </div>
      <textarea name="" id="" placeholder='내용 입력'></textarea>
      <button>작성완료</button>
    </div>
  );
};

export default PostPage;
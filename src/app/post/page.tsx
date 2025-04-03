import React from 'react';
import s from './post.module.scss';
import { useForm } from "react-hook-form";

const PostPage = () => {

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setError,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });

  const onSubmit = (data: any) => {
    console.log('data', data);
  }

  return (
    <div className={s.post_page}>
      <form onSubmit={handleSubmit(onSubmit)}>

      </form>
      <div className='flex gap-10'>
        <input type="text" id="year" placeholder='연차 입력(ex: 10년)'
          {...register("year", {
            required: "이름은 필수 입력입니다.",
            minLength: {
              value: 2,
              message: "2자리 이상 입력해주세요.",
            },
          })}
        />
        <input type="text" name="" id="" placeholder='분야(ex: 프론트, 백)' />
      </div>
      <textarea name="" id="" placeholder='후기 입력'></textarea>
      <div className='flex justify-end mt-20'>
        <button>작성완료</button>
      </div>
    </div>
  );
};

export default PostPage;
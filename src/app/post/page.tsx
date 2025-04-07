'use client';
import React from 'react';
import s from './post.module.scss';
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { reviewPostApi } from '@/api/review';

type FormType = {
  year: string;
  branch: string;
  content: string;
};

const PostPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const inquiryMutation = useMutation({
    mutationFn: (data: FormType) => reviewPostApi(data.year, data.branch, data.content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getReviewList'] });
      router.back();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: "onChange" });

  const onSubmit = (data: FormType) => {
    inquiryMutation.mutate(data);
  };

  return (
    <div className={s.post_page}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex gap-10'>
          <div className='input-wrap'>
            <input
              type="text"
              placeholder='* 연차 입력(ex: 10년)'
              {...register("year", {
                required: "연차는 필수 입력입니다.",
                minLength: {
                  value: 1,
                  message: "연차는 필수 입력입니다.",
                },
              })}
            />
            {errors.year && (
              <small className="error-message">{errors.year.message}</small>
            )}
          </div>
          <div className='input-wrap'>
            <input
              type="text"
              placeholder='* 분야(ex: 프론트, 백)'
              {...register("branch", {
                required: "분야는 필수 입력입니다.",
                minLength: {
                  value: 1,
                  message: "분야는 필수 입력입니다.",
                },
              })}
            />
            {errors.branch && (
              <small className="error-message">{errors.branch.message}</small>
            )}
          </div>
        </div>
        <div className='input-wrap mt-30'>
          <textarea
            placeholder='후기 입력'
            {...register("content", {
              required: "내용은 필수 입력입니다.",
              minLength: {
                value: 2,
                message: "내용은 필수 입력입니다.",
              },
            })}
          ></textarea>
          {errors.content && (
            <small className="error-message">{errors.content.message}</small>
          )}
        </div>
        <div className='flex justify-end mt-20'>
          <button type="submit">작성완료</button>
        </div>
      </form>
    </div>
  );
};

export default PostPage;

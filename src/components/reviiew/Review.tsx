'use client';
import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
// import s from "./slider.module.scss";
import './slider.scss';
import classNames from "classnames";
import { createClient } from "@/util/supabase/client";
import { useQuery } from '@tanstack/react-query';

import { UserStore } from "@/store/user";
import { reviewAlltApi } from "@/api/review";
import Link from "next/link";
import ReviewItem from "./ReviewItem";

type Props = {
  type?: 'kv' | 'slide'
}

const Review = ({ type = 'kv' }: Props) => {
  const supabase = createClient();
  const setUser = UserStore((state) => state.setName);

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => reviewAlltApi(0, 10),
    queryKey: ['reviewList'],
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const user = async () => {
      const session = await supabase.auth.getSession();
      console.log('session', session);
      console.log('리뷰에서 가져온 유저정보:', session.data.session?.user?.user_metadata?.full_name);
      setUser(session.data.session?.user?.user_metadata?.full_name);
    }
    user();
  }, [])

  console.log('reviewdata: ', data);


  const slideSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };


  return (
    <div className={classNames("slide", {
      "is-not-slide": isSuccess && data.length <= 3
    })}>
      <span>
        <Link href="/review">자세히 보기</Link>
      </span>
      {isSuccess && data.length > 4 ?
        <div className="slide-wrap">
          <Slider {...slideSettings}>
            {isSuccess && data.map((item: any, idx: number) => (
              <ReviewItem key={idx} data={item} type="slide"/>
            ))}
          </Slider>
        </div> :
        <div>
          {isSuccess && data.map((item: any, idx: number) => (
            <ReviewItem key={idx} data={item} type="slide"/>
          ))}
        </div>
      }

    </div>
  );
};

export default Review;
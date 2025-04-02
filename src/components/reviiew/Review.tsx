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
import { UserStore } from "@/store/user";

type Props = {
  type?: 'kv' | 'slide'
}

const Review = ({ type = 'kv' }: Props) => {
  const supabase = createClient();
  const setUser = UserStore((state) => state.setName);

  useEffect(() => {
    const user = async () => {
      const session = await supabase.auth.getSession();
      console.log('session', session);
      console.log('리뷰에서 가져온 유저정보:', session.data.session?.user?.user_metadata?.full_name);
      setUser(session.data.session?.user?.user_metadata?.full_name);
    }
    user();
  }, [])


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
    })}>
      <span>자세히 보기</span>
      <div className="slide-wrap">
        <Slider {...slideSettings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Review;
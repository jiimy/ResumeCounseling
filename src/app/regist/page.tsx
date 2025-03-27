'use client';

import Button from '@/components/button/Button';
import axios from 'axios';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';


const Index = () => {
  const [tab, setTab] = useState(-1);
  const [radio, setRadio] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<formType>({ mode: "onChange" });

  // 카카오 로그인
  const click = () => {
    router.push(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=8fd7a1f394d9bbd09fdfdd3827146d73&redirect_uri=
http://localhost:3000/oauth/kakao`);
  }

  const onChangeRadio = (e: any) => {
    if (e.target.value === 'isRegistrationTrue') {
      setRadio('true');
    } else {
      setRadio('false');
    }
  }

  return (
    <div className=''>
      <div className=''>
        <nav className=''>
          <button onClick={click}>카카오 회원가입</button>
        </nav>
      </div>
    </div>
  )
}

export default Index;



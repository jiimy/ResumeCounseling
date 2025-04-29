'use client';

import axios from 'axios';
import classNames from 'classnames';
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
  const clickKako = () => {
    router.push(`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=b7994d2e7eb68c893299c087cae666a3&redirect_uri=
http://localhost:3000/oauth/kakao`);
  }

  // 구글 로그인
  const clickGoogle = () => { }

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
          <button onClick={clickKako}>카카오 회원가입</button>
          <button onClick={clickGoogle}>구글 회원가입</button>
        </nav>
      </div>
    </div>
  )
}

export default Index;



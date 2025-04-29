'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import s from './loginPage.module.scss';
import { createClient } from "@/util/supabase/client";

const Index = () => {
  const router = useRouter();

  const signInWithKakao = async () => {
    const supabase = createClient();
    const redirectUrl = `${window.location.origin}/auth/callback`;

    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
      router.push(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`);
      // alert('배포환경입니다.');
    }

    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider: 'kakao',
    //   options: {
    //     redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
    //       ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
    //       : 'http://localhost:3000/auth/callback'
    //     // redirectTo: `${window.location.origin}/auth/callback`
    //     // redirectTo: location.origin + "/auth/callback",
    //     // redirectTo: 'http://localhost:3000/auth/callback'
    //   },
    // });

    // if (error) {
    //   console.error("OAuth 로그인 에러:", error);
    // } else {
    //   console.log("로그인 성공:", data);
    // }
  };

  return (
    <>
      <div className={s.login_page}>
        <button
          onClick={signInWithKakao}
          className={`${s.login_btn} h-38`}
        >
          카카오 로그인
        </button>
      </div>
    </>
  );
};

export default Index;

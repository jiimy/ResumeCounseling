'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import s from './header.module.scss';
import { UserStore } from '@/store/user';
import { createClient } from '@/util/supabase/client';

const Header = () => {
  const supabase = createClient();
  const userStore = UserStore();
  // console.log('헤더의 스토어 : ', userStore)
  const [username, setUsername] = useState(userStore.name);


  useEffect(() => {
    const user = async () => {
      const session = await supabase.auth.getSession();
      console.log('session', session);
      console.log('리뷰에서 가져온 유저정보:', session.data.session?.user?.user_metadata?.full_name);
      setUsername(session.data.session?.user?.user_metadata?.full_name);
    }
    user();

    setUsername(userStore.name);
  }, [userStore.name]);

  console.log('로그인? : ', username);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      alert('로그아웃 되었습니다');
      setUsername('');
    } else {
      alert('로그아웃 실패');
    }
  };

  return (
    <div className={s.header}>
      <ul>
        <li><Link href="/post">후기 작성</Link></li>
      </ul>
      {username === '' ? (
        <Link href="/login">로그인</Link>
      ) : (
        <button onClick={logout}>로그아웃</button>
      )}
    </div>
  );
};

export default Header;

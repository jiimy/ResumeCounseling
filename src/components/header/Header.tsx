'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import s from './header.module.scss';
import { useRouter } from 'next/navigation'
import { UserStore } from '@/store/user';
import { createClient } from '@/util/supabase/client';

const Header = () => {
  const router = useRouter()
  const supabase = createClient();
  const userStore = UserStore();
  // console.log('헤더의 스토어 : ', userStore)
  const [username, setUsername] = useState(userStore.name);


  useEffect(() => {
    const user = async () => {
      const session = await supabase.auth.getSession();
      // console.log('session', session);
      // console.log('리뷰에서 가져온 유저정보:', session.data.session?.user?.user_metadata?.full_name);
      setUsername(session.data.session?.user?.user_metadata?.full_name);
    }
    user();

    setUsername(userStore.name);
  }, [userStore.name, username, supabase.auth]);

  console.log('로그인? : ', username);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUsername('');
      alert('로그아웃 되었습니다');
      router.push('/')
    } else {
      alert('로그아웃 실패');
    }
  };

  return (
    <div className={s.header}>
      <ul>
        <li><Link href="/post">후기 작성</Link></li>
      </ul>
      {username === '' || username === undefined ? (
        <Link href="/login">로그인</Link>
      ) : (
        <button onClick={logout}>로그아웃</button>
      )}
    </div>
  );
};

export default Header;

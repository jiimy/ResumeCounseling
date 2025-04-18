'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import s from './header.module.scss';
import { useRouter } from 'next/navigation'
import { UserStore } from '@/store/user';
import { createClient } from '@/util/supabase/client';

const Header = () => {
  const router = useRouter();
  const supabase = createClient();
  const userStore = UserStore();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      const fullName = data.session?.user?.user_metadata?.full_name;
      setUsername(fullName ?? '');
    };
    fetchUser();
  }, []); // 의존성 없음 → 처음 한 번만 실행

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUsername('');
      alert('로그아웃 되었습니다');
      router.push('/');
    } else {
      alert('로그아웃 실패');
    }
  };

  return (
    <div className={s.header}>
      <ul>
        <li><Link href="/post">후기 작성</Link></li>
      </ul>
      {username ? (
        <button onClick={logout}>로그아웃</button>
      ) : (
        <Link href="/login">로그인</Link>
      )}
    </div>
  );
};

export default Header;

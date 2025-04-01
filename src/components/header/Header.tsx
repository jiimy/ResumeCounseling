import Link from 'next/link';
import React from 'react';
import s from './header.module.scss';

const Header = () => {
  return (
    <div className={s.header}>
      <ul>
        <li><Link href="/post">후기 작성</Link></li>
      </ul>
      {/* 로그인/로그아웃 */}
      <Link href="/login">로그인</Link>
    </div>
  );
};

export default Header;
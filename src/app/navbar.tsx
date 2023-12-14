'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

function handleClickLogin() {
  console.log('click login button');
}

function handleClickPost() {
  console.log('click post button');
}

function handleClickMessage() {
  console.log('click message button');
}

function handleClickAvatar() {
  console.log('click avatar button');
}

var isLogin = true;

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="fixed top-0 flex h-16 w-full items-center justify-between bg-yellow-400 p-4 text-white">
      <div className="flex items-center">
        {/* Logo (Replace with your logo/icon component) */}
        <Link href="/">
          <div className="text-2xl font-bold">Logo</div>
        </Link>
      </div>
      {isLogin ? (
        <div className="relative space-x-4">
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleClickPost}
          >
            發布卡片
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleClickMessage}
          >
            <Link href="/chat">訊息</Link>
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={toggleMenu}
          >
            頭貼
          </button>
          {showMenu && (
            <div
              ref={menuRef}
              className="absolute right-0 top-full mt-2 rounded border bg-white shadow-md"
            >
              <div className="px-4 py-2 text-black">
                <Link href="/profile">個人資訊</Link>
              </div>
              <div className="px-4 py-2 text-black">
                <Link href="/application">申請驗證</Link>
              </div>
              <div className="px-4 py-2 text-black">登出</div>
            </div>
          )}
        </div>
      ) : (
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={handleClickLogin}
        >
          登入
        </button>
      )}
    </div>
  );
}

export default NavBar;

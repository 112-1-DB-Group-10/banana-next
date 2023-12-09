'use client'
// components/NavBar.tsx
import React, { useState, useEffect, useRef } from 'react';

function handleClickLogin() {
    console.log("click login button")
}

function handleClickPost() {
    console.log("click post button");
}

function handleClickMessage() {
    console.log("click message button");
}

function handleClickAvatar() {
    console.log("click avatar button");
}


// interface NavBarProps {
//     isLogin: boolean;
// }
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
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="w-full fixed top-0 flex items-center justify-between bg-yellow-400 text-white p-4">
            <div className="flex items-center">
                {/* Logo (Replace with your logo/icon component) */}
                <div className="text-2xl font-bold">Logo</div>
            </div>
            {isLogin ? (
                <div className="relative space-x-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleClickPost}>
                        發布卡片
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleClickMessage}>
                        訊息
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={toggleMenu}>
                        頭貼
                    </button>
                    {showMenu && (
                        <div ref={menuRef} className="absolute top-full right-0 mt-2 bg-white border rounded shadow-md">
                            <div className="py-2 px-4 text-black">個人資訊</div>
                            <div className="py-2 px-4 text-black">申請驗證</div>
                            <div className="py-2 px-4 text-black">登出</div>
                        </div>
                    )}
                </div>
            ) : (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleClickLogin}>
                        登入
                    </button>
                )}
        </div>
    );
}

export default NavBar;

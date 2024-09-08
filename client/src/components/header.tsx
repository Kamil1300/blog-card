// components/Header.tsx
import React from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { label: 'Home', path: '/home' },
  { label: 'Create Post', path: '/createPost' },
];

export const Header: React.FC = () => { 
  return (
    <header className="bg-black p-4 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          <Link href="/home">My Blog</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path} className="text-white hover:text-gray-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

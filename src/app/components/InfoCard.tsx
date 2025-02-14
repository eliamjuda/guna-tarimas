'use client';

import { ReactNode } from 'react';

interface InfoCardProps {
  title: string; 
  value: number; 
  icon?: ReactNode; 
  color?: string; 
}

export function InfoCard({ title, value, icon, color = '#3749bb' }: InfoCardProps) {
  return (
    <div className="flex items-center justify-evenly min-w-64 p-4 rounded-md border border-gray-300 h-[110px] max-h-[110px]">
      <div className="bg-[#7888ec] p-3 rounded-md text-white" style={{ backgroundColor: color }}>
        {icon || ( // icono por defecto
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-box"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
            <path d="M12 12l8 -4.5" />
            <path d="M12 12l0 9" />
            <path d="M12 12l-8 -4.5" />
          </svg>
        )}
      </div>
      <div>
        <div className="">{title}</div>
        <div className="flex justify-center font-bold text-[2.5rem]" style={{ color }}>
          {value}
        </div>
      </div>
    </div>
  );
}
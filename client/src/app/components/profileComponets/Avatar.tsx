// components/Avatar.tsx
"use client";

import React from 'react';
import classNames from 'classnames';

interface AvatarProps {
    children: React.ReactNode;
    className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ children, className }) => {
    return (
        <div className={classNames("relative rounded-full overflow-hidden", className)}>
            {children}
        </div>
    );
};

interface AvatarImageProps {
    src: string;
    alt: string;
    className?: string;
}

export const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt, className }) => {
    return <img src={src} alt={alt} className={classNames("object-cover w-full h-full", className)} />;
};

interface AvatarFallbackProps {
    children: React.ReactNode;
    className?: string;
}

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children, className }) => {
    return (
        <div className={classNames("flex items-center justify-center bg-gray-200 text-gray-500 text-xl", className)}>
            {children}
        </div>
    );
};

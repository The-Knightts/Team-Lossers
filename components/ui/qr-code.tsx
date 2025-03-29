"use client";

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
  className?: string;
  title?: string;
  gradient?: boolean;
  gradientColors?: string;
}

const QRCode = ({
  value,
  size = 200,
  bgColor = '#ffffff',
  fgColor = '#000000',
  level = 'M',
  includeMargin = false,
  className,
  title,
  gradient = false,
  gradientColors = 'from-purple-500 to-pink-500'
}: QRCodeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        'flex flex-col items-center justify-center p-4 rounded-xl',
        gradient ? `bg-gradient-to-br ${gradientColors} shadow-lg` : 'bg-white shadow-md',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {title && (
        <h3 className={cn(
          'text-lg font-semibold mb-3',
          gradient ? 'text-white' : 'text-gray-800'
        )}>
          {title}
        </h3>
      )}
      
      <motion.div
        className={cn(
          'p-3 bg-white rounded-lg',
          isHovered ? 'shadow-xl' : 'shadow-md'
        )}
        animate={{ 
          rotate: isHovered ? [0, -1, 1, -1, 0] : 0,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <QRCodeSVG
          value={value}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
          includeMargin={includeMargin}
        />
      </motion.div>
      
      <p className={cn(
        'mt-3 text-sm',
        gradient ? 'text-white/80' : 'text-gray-500'
      )}>
        Scan to open form
      </p>
    </motion.div>
  );
};

export { QRCode };
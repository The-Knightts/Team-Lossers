import React from 'react';

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
      <img
        src="/bg.png"
        alt="Background"
        className="absolute h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/75 via-purple-900/25 to-gray-900/75 backdrop-blur-[8px] z-[1] border border-white/10 shadow-lg bg-white/5" />
    </div>
  );
};

export default VideoBackground;
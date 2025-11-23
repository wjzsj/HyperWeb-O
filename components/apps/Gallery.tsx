import React from 'react';

const Gallery: React.FC = () => {
  const images = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    url: `https://picsum.photos/400/600?random=${i}`,
    aspect: i % 3 === 0 ? 'aspect-[2/3]' : 'aspect-square'
  }));

  return (
    <div className="h-full bg-black text-white overflow-y-auto">
      <div className="p-4 sticky top-0 bg-black/80 backdrop-blur-md z-10 flex justify-between items-end pb-4 border-b border-white/10">
        <h1 className="text-3xl font-light">相册</h1>
        <span className="text-blue-500 text-sm font-medium">选择</span>
      </div>
      <div className="p-1 grid grid-cols-3 gap-1">
        {images.map((img) => (
          <div key={img.id} className={`relative overflow-hidden bg-gray-800 ${img.aspect}`}>
            <img 
                src={img.url} 
                alt="Gallery Item" 
                className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="h-20"></div> {/* Bottom padding for dock */}
    </div>
  );
};

export default Gallery;
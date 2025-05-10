import React from 'react';

export default function ImageDetails({ name, imageUrl }) {
  const defaultImage = `https://img.pokemondb.net/artwork/large/${name}.svg`;

  return (
    <div className='flex flex-col items-center'>
      <img
        src={imageUrl || defaultImage}
        alt={name}
        className='w-full h-full object-contain rounded-md border-gray-200 bg-white'
      />
    </div>
  );
}

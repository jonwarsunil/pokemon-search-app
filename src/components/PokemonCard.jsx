import Link from 'next/link';

export default function PokemonCard({ name }) {
  const imageUrl = `https://img.pokemondb.net/artwork/large/${name}.jpg`;

  return (
    <div className='mt-15'>
      <div className='bg-white p-5 rounded-t-xl'>
        <img src={imageUrl} alt={name} className='w-full h-40 object-contain' />
      </div>
      {/* card Details */}
      <div className='bg-gray-50 p-5 rounded-b-xl'>
        <h2 className='capitalize font-medium mb-15 text-lg'>{name ? name : 'Pokemon'}</h2>
        <Link href={`/pokemon/${name}`} className='text-blue-700'>
          Details <span className='text-blue-600 text-lg'>➔</span>
        </Link>
      </div>
    </div>
  );
}

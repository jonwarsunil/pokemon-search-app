import ImageDetails from '@/components/ImageDetails';
import Link from 'next/link';

export default async function PokemonDetail({ params }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const pokemon = await res.json();
  console.log('pokemon', pokemon.moves);
  const artwork = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <div className='container'>
      <div className='bg-gray-100 flex justify-center items-center h-screen relative'>
        <Link className='absolute top-10 left-10 cursor-pointer font-semibold text-green-600 text-md' href='/'>
          {'<'} Back
        </Link>
        <div className='max-w-xl mx-auto bg-[#60E2C9]'>
          <div className='w-sm mx-auto p-6'>
            <ImageDetails name={pokemon.name} imageUrl={artwork} />
          </div>
          <div className='mt-6 space-y-2 bg-[#FDC666] px-4 py-6'>
            <p className='capitalize'>
              <strong>Types:</strong> {pokemon.name}
            </p>
            <p>
              <strong>Types:</strong> {pokemon.types.map(item => item.type.name).join(', ')}
            </p>
            <p>
              <strong>Stats:</strong> {pokemon.stats.map(item => item.stat.name).join(', ')}
            </p>
            <p>
              <strong>Ability:</strong> {pokemon.abilities.map(item => item.ability.name).join(', ')}
            </p>
            <p>
              <strong>Moves:</strong>{' '}
              {pokemon.moves
                .slice(0, 5)
                .map(item => item.move.name)
                .join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

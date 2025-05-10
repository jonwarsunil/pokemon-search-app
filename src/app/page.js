'use client';

import SearchForm from '@/components/SearchForm';
import './globals.css';
import PokemonCard from '@/components/PokemonCard';
import { usePokemonList } from '@/Hooks/usePokemonList';

export default function Home() {
  const { filteredList, setSearchTerm, setSelectedType } = usePokemonList();

  return (
    <div className=''>
      <main className='container my-6 bg-gray-200 py-6'>
        <SearchForm onSearch={setSearchTerm} onTypeChange={setSelectedType} />
        {filteredList.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {filteredList.map(pokemon => (
              <PokemonCard key={pokemon.name} name={pokemon.name} />
            ))}
          </div>
        ) : (
          <div className='py-20 text-center text-gray-600 text-lg'> No data found</div>
        )}
      </main>
    </div>
  );
}

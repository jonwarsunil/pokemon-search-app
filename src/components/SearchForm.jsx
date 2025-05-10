'use client';
import { useEffect, useState, useRef } from 'react';
import { SearchIcon } from './Icon';

const SearchForm = ({ onSearch, onTypeChange }) => {
  const [types, setTypes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/type');
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        const data = await res.json();
        setTypes(data.results.map(t => t.name));
      } catch (err) {
        console.error('Error fetching types', err);
      }
    }
    fetchTypes();
  }, []);

  const handleInputChange = e => {
    const value = e.target.value;
    setSearchInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch(value);
    }, 1000);
  };

  return (
    <form className='flex flex-col gap-4 mb-6 w-full px-4' onSubmit={e => e.preventDefault()}>
      <select
        className='shadow-sm bg-white p-3 rounded-md w-full max-w-xs focus:outline-none focus:ring-0'
        onChange={e => {
          onTypeChange(e.target.value);
          onSearch(searchInput);
        }}
      >
        <option value=''>All Types</option>
        {types.map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <div className='w-full max-w-xs flex items-center relative'>
        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500'>
          <SearchIcon />
        </span>
        <input
          type='text'
          placeholder='search...'
          value={searchInput}
          onChange={handleInputChange}
          className='p-3 pl-10 rounded-l-md w-full focus:outline-none focus:ring-0 bg-white shadow-sm'
        />
        <button
          type='button'
          onClick={() => onSearch(searchInput)}
          className='bg-[#004368] text-white font-medium py-[13px] px-3 rounded-r-md shadow-sm cursor-pointer'
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;

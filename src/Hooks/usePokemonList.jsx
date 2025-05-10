'use client';

import { useEffect, useState } from 'react';

export function usePokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        const data = await res.json();
        setPokemonList(data.results);
        setFilteredList(data.results);
      } catch (error) {
        console.error('Failed to fetch Pokémon data:', error);
      }
    }

    fetchData();
  }, []);

  // filter for input Search
  useEffect(() => {
    let filtered = [...pokemonList];
    if (searchTerm) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredList(filtered);
  }, [searchTerm, selectedType]);

  // filter for select type
  useEffect(() => {
    async function filterByType() {
      if (selectedType) {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const data = await res.json();
          let list = data.pokemon.map(item => item.pokemon);

          if (searchTerm) {
            list = list.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
          }
          setFilteredList(list);
        } catch (error) {
          console.error('Error fetching Pokémon by type:', error);
        }
      } else {
        const list = pokemonList.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredList(list);
      }
    }

    filterByType();
  }, [selectedType, searchTerm, pokemonList]);

  return {
    filteredList,
    setSearchTerm,
    setSelectedType,
  };
}

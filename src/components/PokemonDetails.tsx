import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface PokemonSprites {
  front_default: string;
}

interface Pokemon {
  name: string;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        const data: Pokemon = await response.json(); // Type assertion ensures proper structure
        setPokemon(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-bold">{error}</div>;
  }

  if (!pokemon) {
    return <div className="text-center text-lg">No Pokémon Found</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center capitalize">
        {pokemon.name}
      </h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto mt-4 w-32 h-32"
      />
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Base Stats:</h2>
        <ul className="mt-2">
          {pokemon.stats.map((stat) => (
            <li
              key={stat.stat.name}
              className="flex justify-between border-b py-2"
            >
              <span className="capitalize">{stat.stat.name}</span>
              <span>{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Abilities:</h2>
        <ul className="mt-2">
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name} className="capitalize">
              {ability.ability.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetails;

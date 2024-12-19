import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import PokemonCard from "../components/PokemonCard";
import Section from "../components/Section";

async function fetchPokemons() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=3");
  const data = await response.json();
  return data.results; //.filter((pokemon: any) => pokemon.name.startsWith("f"));
}

export default function Fetch() {
  // State and effect for fetch() example
  const [pokemons, setFetchPokemons] = useState([] as any[]);
  useEffect(() => {
    fetchPokemons().then(setFetchPokemons);
  }, []);

  // React Query example
  const {
    data: queryPokemons,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["u-pokemon"],
    queryFn: fetchPokemons,
  });

  return (
    <>
      <Section heading="Pokemons fetched with fetch()">
        <div className="grid grid-cols-3 gap-4">
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
                .split("/")
                .slice(-2, -1)}.png`}
            />
          ))}
        </div>
      </Section>

      <Section heading="Pokemons fetched with React Query">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading Pokémons.</p>}
        {!isLoading && !isError && (
          <div className="grid grid-cols-3 gap-4">
            {queryPokemons.map((pokemon: any) => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
                  .split("/")
                  .slice(-2, -1)}.png`}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

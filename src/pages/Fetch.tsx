import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import PokemonCard, { PokemonCardProps } from "../components/PokemonCard";
import Section from "../components/Section";

type PokemonItem = {
  name: string;
  url: string;
};

async function fetchPokemons(): Promise<PokemonCardProps[]> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=3");
  const data = await response.json();
  return data.results.map((p: PokemonItem) => {
    return { name: p.name, detailsUrl: p.url };
  });
}

export default function Fetch() {
  // State and effect for fetch() example
  const [pokemons, setFetchPokemons] = useState<PokemonCardProps[]>([]);
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
          {pokemons.map((p) => (
            <PokemonCard key={p.name} name={p.name} detailsUrl={p.detailsUrl} />
          ))}
        </div>
      </Section>

      <Section heading="Pokemons fetched with React Query">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading Pokémons.</p>}
        {queryPokemons && !isLoading && !isError && (
          <div className="grid grid-cols-3 gap-4">
            {queryPokemons.map((p: PokemonCardProps) => (
              <PokemonCard
                key={p.name}
                name={p.name}
                detailsUrl={p.detailsUrl}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

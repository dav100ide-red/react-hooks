import { useState, useEffect } from "react";
import PokemonCard, { PokemonCardProps } from "../components/PokemonCard";
import Section from "../components/Section";
import { fetchPokemons } from "../functions/fetchPokemons";

export default function Fetch() {
  // State and effect for fetch() example
  const [pokemons, setFetchPokemons] = useState<PokemonCardProps[]>([]);
  useEffect(() => {
    fetchPokemons().then(setFetchPokemons);
  }, []);

  return (
    <>
      <Section heading="Pokemons fetched with fetch()">
        <div className="grid grid-cols-3 gap-4">
          {pokemons.map((p) => (
            <PokemonCard key={p.name} name={p.name} detailsUrl={p.detailsUrl} />
          ))}
        </div>
      </Section>
    </>
  );
}

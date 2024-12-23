import { useState, useEffect } from "react";
import PokemonCard, { PokemonCardProps } from "../components/PokemonCard";
import Section from "../components/Section";
import { fetchPokemons } from "../functions/fetchPokemons";
import { GenericLoader } from "../components/Genericloader";

export default function Fetch() {
  const [pokemons, setPokemons] = useState<PokemonCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Start loading
        setIsError(false); // Reset error state
        const data = await fetchPokemons();
        setPokemons(data);
      } catch {
        setIsError(true); // Set error state on failure
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  return (
    <Section heading="Pokemons fetched with fetch()">
      {isLoading && <GenericLoader />}
      {isError && <p>Error loading Pokémons.</p>}
      {pokemons && !isLoading && !isError && (
        <div className="grid grid-cols-3 gap-4">
          {pokemons.map((p) => (
            <PokemonCard key={p.name} name={p.name} detailsUrl={p.detailsUrl} />
          ))}
        </div>
      )}
    </Section>
  );
}

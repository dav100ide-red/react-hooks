import { useQuery } from "@tanstack/react-query";
import Section from "../components/Section";
import { pokemonQueryFn } from "../functions/fetchPokemons";
import PokemonCard, { PokemonCardProps } from "../components/PokemonCard";
import { GenericLoader } from "../components/Genericloader";

export default function UseQuery() {
  const {
    data: pokemons,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pokemons"],
    queryFn: pokemonQueryFn,
  });

  return (
    <Section heading="Pokemons fetched with React Query">
      {isLoading && <GenericLoader />}
      {isError && <p>Error loading Pokémons.</p>}
      {pokemons && !isLoading && !isError && (
        <div className="grid grid-cols-3 gap-4">
          {pokemons.map((p: PokemonCardProps) => (
            <PokemonCard key={p.name} name={p.name} detailsUrl={p.detailsUrl} />
          ))}
        </div>
      )}
    </Section>
  );
}

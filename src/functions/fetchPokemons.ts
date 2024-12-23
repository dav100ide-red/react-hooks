import { PokemonCardProps } from "../components/PokemonCard";

type PokemonItem = {
  name: string;
  url: string;
};

export async function fetchPokemons(): Promise<PokemonCardProps[]> {
  // fetch and dto conversion
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=3");
  const data = await response.json();
  return data.results.map((p: PokemonItem) => {
    return { name: p.name, detailsUrl: p.url };
  });
}

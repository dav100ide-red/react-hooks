import { PokemonCardProps } from "../components/PokemonCard";

type PokeApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonItem[];
};

type PokemonItem = {
  name: string;
  url: string;
};

function pokeApiResToPokemonCardProps(
  res: PokeApiResponse
): PokemonCardProps[] {
  return res.results.map((p: PokemonItem) => {
    return { name: p.name, detailsUrl: p.url };
  });
}

export async function fetchPokemons(): Promise<PokemonCardProps[]> {
  // fetch and dto conversion
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=3"
  );
  const data: PokeApiResponse = await response.json();
  return pokeApiResToPokemonCardProps(data);
}

export async function pokemonQueryFn(): Promise<PokemonCardProps[]> {
  // fetch and dto conversion
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=3&limit=3"
  );
  const data: PokeApiResponse = await response.json();
  return pokeApiResToPokemonCardProps(data);
}

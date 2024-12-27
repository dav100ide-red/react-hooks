export const extractPokemonId = (url: string): string => {
  return url.split("/").slice(-2, -1)[0];
};

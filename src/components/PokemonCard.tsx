import React from "react";
import { Link } from "react-router-dom";
import { extractPokemonId } from "../constants/extractPokemonId";

export type PokemonCardProps = {
  name: string;
  detailsUrl: string;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, detailsUrl }) => {
  const id = extractPokemonId(detailsUrl); // Extract Pokémon ID using utility function

  const getImageUrl = (id: string): string => {
    const imageUrlPrefix =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
    return `${imageUrlPrefix}/${id}.png`;
  };

  return (
    <Link
      to={`/pokemon/${id}`}
      className="block border p-4 rounded shadow hover:shadow-lg"
    >
      <img
        src={getImageUrl(id)} // Use the extracted ID
        alt={name}
        className="w-20 h-20 mx-auto"
      />
      <p className="text-center mt-2 font-bold capitalize">{name}</p>
    </Link>
  );
};

export default PokemonCard;

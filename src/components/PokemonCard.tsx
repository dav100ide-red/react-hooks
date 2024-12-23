// PokemonCard.tsx
import React from "react";

export type PokemonCardProps = {
  name: string;
  detailsUrl: string;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, detailsUrl }) => {
  const getImageUrl = (url: string): string => {
    const imageUrlPrefix =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
    const id = url.split("/").slice(-2, -1)[0];
    return `${imageUrlPrefix}/${id}.png`;
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg">
      <img
        src={getImageUrl(detailsUrl)}
        alt={name}
        className="w-20 h-20 mx-auto"
      />
      <p className="text-center mt-2 font-bold capitalize">{name}</p>
    </div>
  );
};

export default PokemonCard;

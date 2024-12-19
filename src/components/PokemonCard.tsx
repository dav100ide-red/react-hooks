type Props = {
  name: string;
  image: string;
};

export default function PokemonCard({ name, image }: Props) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg">
      <img src={image} alt={name} className="w-20 h-20 mx-auto" />
      <p className="text-center mt-2 font-bold capitalize">{name}</p>
    </div>
  );
}

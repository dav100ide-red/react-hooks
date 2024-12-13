interface SectionProps {
  heading: string;
  description?: string; // Optional prop
  children: React.ReactNode;
}

export default function Section({
  heading,
  description,
  children,
}: SectionProps) {
  return (
    <>
      <section>
        <h3 className="text-blue-300">{heading}</h3>
        {description && <em className="text-gray-500 ">{description}</em>}
        <>{children}</>
      </section>
      <hr />
    </>
  );
}

"use client";

interface HeadingProps {
  title: string;
  subtitle: string;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <h2
        className="
          text-2xl
          font-bold
        "
      >
        {title}
      </h2>
      <p className="text-sm text-neutral-500">{subtitle}</p>
    </div>
  );
};

export default Heading;

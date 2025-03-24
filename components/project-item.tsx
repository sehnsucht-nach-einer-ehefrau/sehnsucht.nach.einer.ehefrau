import Image from "next/image";
import { useRouter } from "next/navigation";

type StaticImageData = {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
};

export default function ProjectItem({
  title,
  description,
  imagePath,
  githubLink,
}: {
  title: string;
  description: string;
  imagePath: string | StaticImageData;
  githubLink?: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col max-w-[250px] min-w-[250px]">
      <a
        onClick={() => {
          router.push(`/pages/downloads/${title}`);
        }}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full aspect-square overflow-hidden rounded-[22%] shadow-md mb-3 block cursor-pointer"
      >
        <Image src={imagePath} alt={title} fill className="object-cover" />
      </a>
      <a
        href={githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-lg mt-2"
      >
        {title}
      </a>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
}

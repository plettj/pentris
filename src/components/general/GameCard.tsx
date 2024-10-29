import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export interface GameCardProps {
  title: string;
  imageSrc: string;
  imageSize: [number, number];
  url: string;
  square?: boolean;
}

export default function GameCard({
  title,
  imageSrc,
  imageSize,
  url,
  square = false,
}: GameCardProps) {
  return (
    <Link href={url}>
      <div className="w-full relative">
        <div
          className={cn(
            "relative w-full overflow-hidden rounded-inherit",
            square ? "aspect-square" : "aspect-[16/9]"
          )}
        >
          <Image
            src={imageSrc}
            alt={title}
            width={imageSize[0]}
            height={imageSize[1]}
            className="w-full h-full object-cover object-center rounded-lg"
          />
        </div>
        <div className="absolute inset-0 p-4 flex items-center justify-center transition opacity-0 bg-opacity-0 bg-white hover:bg-opacity-60 hover:opacity-100 duration-200">
          <h1 className="text-3xl font-light text-foreground text-center text-balance">
            {title}
          </h1>
        </div>
      </div>
    </Link>
  );
}

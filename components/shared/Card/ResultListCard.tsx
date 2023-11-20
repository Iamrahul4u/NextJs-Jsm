import Image from "next/image";
import React from "react";

const ResultListCard = ({ title, type }: { title: string; type: string }) => {
  return (
    <div className="flex w-full cursor-pointer  items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50">
      <Image
        alt="tags"
        width="18"
        height="18"
        className="mt-1 object-contain invert dark:invert-0"
        src="/assets/icons/tag.svg"
      />
      <div className="flex flex-col">
        <p className="body-medium text-dark200_light800 line-clamp-1">
          {title}
        </p>
        <p className="small-medium mt-1 text-xs font-semibold capitalize text-gray-500">
          {type}
        </p>
      </div>
    </div>
  );
};

export default ResultListCard;

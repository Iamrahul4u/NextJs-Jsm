import Image from "next/image";
import React from "react";
import { BadgeDemo } from "../Badge";

interface tag {
  id: string;
  name: string;
  questions: string[];
}

const TagsCard = ({ tag }: { tag: tag }) => {
  return (
    <div className="relative flex flex-1 cursor-pointer flex-col items-start gap-2  overflow-hidden rounded-xl p-4  text-center shadow-md">
      <p className="rounded-sm bg-zinc-100 px-2 py-1 font-bold">{tag.name}</p>
      <p className="mt-2 text-xs">
        <span className="mr-2 text-sm text-orange-500">
          {tag.questions.length}+
        </span>
        Questions
      </p>
    </div>
  );
};

export default TagsCard;

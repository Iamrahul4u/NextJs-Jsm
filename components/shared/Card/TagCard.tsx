import React from "react";

interface tag {
  id: string;
  name: string;
  questions: string[];
}

const TagsCard = ({ tag }: { tag: tag }) => {
  return (
    <div className="relative  flex flex-1 cursor-pointer flex-col items-start gap-2 overflow-hidden rounded-xl p-4 text-center  shadow-md  hover:shadow-zinc-900   hover:transition-all">
      <p className="rounded-sm bg-zinc-100 px-2 py-1 font-bold   dark:bg-zinc-800 dark:text-white ">
        {tag.name}
      </p>
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

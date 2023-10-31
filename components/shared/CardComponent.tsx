import { timeAgo } from "@/utlils/helperFunction";
import Image from "next/image";
import React from "react";
import { BadgeDemo } from "./Badge";

const card = {
  id: 1,
  title: "NEXT",
  description: 'This is the description for the card with the title "NEXT".',
  user: "Maximiliano Villoldo",
  datetime: "2023-10-25T15:30:00Z",
  votes: 0,
  answers: 0,
  views: 0,
  imageUrl: "https://example.com/card1-image.jpg",
  tags: ["Next.js", "Routing", "React"],
};

const Card = () => {
  return (
    <div className="mb-4 rounded-lg p-4 shadow-md dark:bg-zinc-800">
      <div className="flex items-center">
        <div className="mr-4">
          <img
            src="https://www.gravatar.com/avatar/0f5f0ea6a2dc7ed3cb5830377a4fe7e2?s=256&d=identicon&r=PG"
            alt={card.title}
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold ">{card.title}</h2>
          <p className="text-gray-600">{card.user}</p>
          <p className="text-sm text-gray-500">{timeAgo(card.datetime)}</p>
        </div>
      </div>
      <p className="mt-4">{card.description}</p>
      <div className="mt-4 flex-col justify-between md:flex md:flex-row">
        <div className="flex items-center">
          <span className="mr-2 flex gap-2 text-sm text-gray-600">
            <Image
              src="assets/icons/like.svg"
              height={18}
              width={18}
              alt="likes"
            />
            <p className="flex text-xs md:text-sm">{card.votes} Votes</p>
          </span>
          <span className="mr-2 flex gap-2 text-sm text-gray-600">
            <Image
              src="assets/icons/message.svg"
              height={18}
              width={18}
              alt="likes"
            />
            <p className="flex text-xs md:text-sm">{card.answers} Answers</p>
          </span>
          <span className="flex gap-2 text-sm text-gray-600">
            <Image
              src="assets/icons/eye.svg"
              height={18}
              width={18}
              alt="likes"
            />
            <p className="flex text-xs md:text-sm">{card.views} Views</p>
          </span>
        </div>
        <div className="mt-2 space-x-2">
          {card.tags.map((tag, index) => (
            <BadgeDemo key={tag} title={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;

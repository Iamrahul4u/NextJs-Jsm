import Image from "next/image";
import React from "react";

interface user {
  id: string;
  name: string;
  image: string;
  username: string;
  picture: string;
}

const UserCard = ({ user }: { user: user }) => {
  return (
    <div className="relative flex cursor-pointer flex-col items-center justify-between overflow-hidden rounded-xl p-4 pb-10 text-center shadow-xl">
      <Image
        src={user.picture}
        width={102}
        height={102}
        alt="User_profile_image"
        objectFit="contain"
        className="mx-auto mb-4 rounded-full "
      />
      <div>
        <h1 className="font-semibold text-gray-700">{user.name}</h1>
        <p className="text-sm text-gray-500">@{user.username}</p>
      </div>
    </div>
  );
};

export default UserCard;

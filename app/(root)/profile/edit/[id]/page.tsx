import ProfileForm from "@/components/shared/Profile/ProfileForm";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const { userId } = auth();
  if (!userId) return null;
  const user = await getUser({ userId });
  return (
    <div>
      <h1 className="mb-10 text-2xl font-semibold">Edit Profile</h1>
      <ProfileForm user={JSON.stringify(user)} />
    </div>
  );
};

export default Page;

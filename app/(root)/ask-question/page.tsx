import Questions from "@/components/shared/QuestionPage/Questions";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {
  const userId = auth();
  if (!userId) {
    redirect("log-in");
  }
  const mongoUser = await getUser(userId);
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="mb-4 text-2xl font-bold">Ask Question</h1>
      </div>
      <Questions type="Create" mongoUser={JSON.stringify(mongoUser?._id)} />
    </>
  );
};

export default Page;

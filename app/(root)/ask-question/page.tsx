import Questions from "@/components/shared/QuestionPage/Questions";
import { getUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
// import { auth } from "@clerk/nextjs";

const Page = async() => {
  // const userId=auth();
  const userId="12345"
  if(!userId){
    redirect('log-in');

  }
  const mongoUser=await getUser(userId);
  return (
    <section className=" flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="mb-4 text-2xl font-bold">Ask Question</h1>
      </div>
      <Questions mongoUser={JSON.stringify(mongoUser?._id)}/>
    </section>
  );
};

export default Page;

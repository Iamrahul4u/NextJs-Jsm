import Card from "@/components/shared/Card/CardComponent";
import Filter from "@/components/shared/Filter";
import SearchBar from "@/components/shared/SearchBar";
import { IQuestion } from "@/database/question.model";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Collection({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  if (!userId) return null;
  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className=" text-dark100_light900 text-3xl font-bold">
          All Questions
        </h1>
      </div>
      <div className="mt-8  flex gap-2">
        <SearchBar title={"Search Topics"} />
        <Filter filter={AnswersFilter} />
      </div>
      <div className="mt-10 flex  flex-col gap-6">
        {(result.length ?? 0) > 0 ? (
          result?.map((question: IQuestion) => (
            <Link key={question._id} href={`/question/${question._id}`}>
              <Card question={question} />
            </Link>
          ))
        ) : (
          <div className=" mt-10 flex justify-center gap-2">
            <p className=" self-center text-3xl font-semibold">
              No Saved Questions
            </p>
          </div>
        )}
      </div>
    </>
  );
}

const AnswersFilter = [
  {
    id: "1",
    label: "Highest Upvotes",
  },
  {
    id: "2",
    label: "Lowest Upvotes",
  },
  {
    id: "3",
    label: "Most Recents",
  },
  {
    id: "4",
    label: "Oldest",
  },
];

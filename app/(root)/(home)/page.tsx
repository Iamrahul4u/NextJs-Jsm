import Card from "@/components/shared/Card/CardComponent";
import SearchBar from "@/components/shared/SearchBar";
import HomePageFilter from "@/components/shared/home/HomePageFilter";
import { Button } from "@/components/ui/button";
import { getQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamsProps) {
  const result = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className=" text-dark100_light900 text-3xl font-bold">
          All Questions
        </h1>
        <Link className="flex justify-end max-sm:w-full" href="/ask-question">
          <Button className="primary-gradient  bg-orange-400 text-white dark:text-white">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        <SearchBar title={"Search Topics"} />
      </div>
      <HomePageFilter />
      <div className="mt-10 flex  flex-col gap-6">
        {result
          ? result?.map((question) => (
              <Card question={question} key={question._id} />
            ))
          : "No Questions"}
      </div>
    </>
  );
}

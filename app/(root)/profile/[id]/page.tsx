import RelatedTabs from "@/components/shared/QuestionPage/RelatedTabs";
import Stats from "@/components/shared/Profile/Stats";
import { getUserInfo } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { convertDateFormat } from "@/utlils/helperFunction";
import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const { answersCount, questionsCount, user, questions, answers } =
    await getUserInfo({
      userId: params.id,
    });
  const { userId: clerkId } = auth();
  const showEditButton = clerkId === params.id && clerkId !== null;
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            alt="user avatar"
            width={140}
            height={140}
            className="rounded-full object-cover"
            src={user.picture}
          />
          <div className="mt-3">
            <h2 className="text-dark100_light900 text-2xl font-bold ">
              {user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{user.username}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5 ">
              {user.portfolioWebsite && (
                <div className="flex-center gap-1 text-sky-500">
                  <Image
                    src="/assets/icons/link.svg"
                    alt="link icon"
                    width="20"
                    height="20"
                  />
                  <Link
                    target="_blank"
                    className="paragraph-medium hover:underline"
                    href={user.portfolioWebsite}
                  >
                    Portfolio
                  </Link>
                </div>
              )}

              {user.location && (
                <div className="flex-center gap-1">
                  <Image
                    src="/assets/icons/location.svg"
                    alt="link icon"
                    width="20"
                    height="20"
                  />
                  <p className="paragraph-medium text-dark400_light700">
                    {user.location}
                  </p>
                </div>
              )}
              {user.joinedAt && (
                <div className="flex-center gap-1">
                  <Image
                    alt="link icon"
                    src="/assets/icons/calendar.svg"
                    width="20"
                    height="20"
                  />
                  <p className="paragraph-medium text-dark400_light700">
                    {convertDateFormat(user.joinedAt)}
                  </p>
                </div>
              )}
            </div>
            {user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {showEditButton && (
              <Link href={`/profile/edit/${params.id}`}>
                <button className="paragraph-medium btn-secondary inline-flex h-9 min-h-[46px] min-w-[175px] items-center justify-center rounded-md bg-slate-900 px-4 py-3 text-sm font-medium text-black shadow transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-white  dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300">
                  Edit Profile
                </button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats questions={questionsCount} answers={answersCount} />
      <div className="mt-10 w-full p-10">
        <RelatedTabs
          questions={questions}
          answers={answers}
          userId={user.clerkId}
        />
      </div>
    </div>
  );
};

export default Page;

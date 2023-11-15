import Image from "next/image";
import React from "react";

const Stats = ({
  questions,
  answers,
}: {
  questions: number;
  answers: number;
}) => {
  return (
    <div className="mt-10">
      <h4 className="text-dark200_light900 text-xl font-bold">Stats</h4>
      <div className="xs:grid-cols-2 mt-5 grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="light-border background-light900_dark300 shadow-light-300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {questions || 0}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {answers || 0}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>
        <div className="light-border background-light900_dark300 shadow-light-300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 dark:shadow-dark-200">
          <Image
            alt="gold medal icon"
            width="40"
            height="50"
            src="/assets/icons/gold-medal.svg"
          />
          <div>
            <p className="paragraph-semibold text-dark200_light900">0</p>
            <p className="body-medium text-dark400_light700">Gold Badges</p>
          </div>
        </div>
        <div className="light-border background-light900_dark300 shadow-light-300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 dark:shadow-dark-200">
          <Image
            alt="gold medal icon"
            width="40"
            height="50"
            src="/assets/icons/silver-medal.svg"
          />
          <div>
            <p className="paragraph-semibold text-dark200_light900">0</p>
            <p className="body-medium text-dark400_light700">Silver Badges</p>
          </div>
        </div>
        <div className="light-border background-light900_dark300 shadow-light-300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 dark:shadow-dark-200">
          <Image
            alt="gold medal icon"
            width="40"
            height="50"
            src="/assets/icons/bronze-medal.svg"
          />
          <div>
            <p className="paragraph-semibold text-dark200_light900">0</p>
            <p className="body-medium text-dark400_light700">Bronze Badges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

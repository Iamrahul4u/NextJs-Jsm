"use client";
import { deleteAnswersById } from "@/lib/actions/answer.action";
import { deleteQuestionById } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Props {
  type: string;
  itemId: string;
}
const EditDeleteAction = ({ type, itemId }: Props) => {
  const path = usePathname();
  const router = useRouter();
  const handleEdit = async (itemId: string) => {
    router.push(`/question/edit/${itemId}`);
  };
  const handleDelete = async (itemId: string) => {
    if (type === "Question") {
      await deleteQuestionById({ questionId: itemId, path });
    } else if (type === "Answer") {
      await deleteAnswersById({ answerId: itemId, path });
    }
  };

  return (
    <div className="flex grow-0 gap-2">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="editQuestion"
          height={16}
          width={16}
          onClick={() => handleEdit(itemId)}
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        alt="deleteIcon"
        height={16}
        width={16}
        onClick={() => handleDelete(itemId)}
      />
    </div>
  );
};

export default EditDeleteAction;

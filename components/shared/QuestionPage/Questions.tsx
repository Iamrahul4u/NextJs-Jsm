"use client";
// import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Editor } from "@tinymce/tinymce-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { QuestionSchema } from "@/utlils/Validations";
import * as z from "zod";
import React, { useRef, useState } from "react";
import process from "process";
import { X } from "lucide-react";
import {
  postQuestion,
  updateQuestionById,
} from "@/lib/actions/question.action";
import { useRouter } from "next/navigation";

interface Props {
  mongoUser: string;
  questionDetails?: string;
  type?: string;
}
const Questions = ({ mongoUser, questionDetails, type }: Props) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const editorRef = useRef(null);
  const defaultValues = questionDetails
    ? JSON.parse(questionDetails as string)
    : "";

  const groupedTags = defaultValues
    ? defaultValues.tags.map((tag: any) => tag.name)
    : [];
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: defaultValues.title || "",
      content: "",
      tags: groupedTags || [],
    },
  });

  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== "") {
        if (tagValue.length > 10) {
          return form.setError("tags", {
            type: "required",
            message: "Tag name should be less than 10 characters",
          });
        }
        if (tagValue.length < 3) {
          return form.setError("tags", {
            type: "required",
            message: "Tag name should be More than 3 characters",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        } else {
          form.setError("tags", {
            type: "validate",
            message: "Tag already exists",
          });
        }
      } else {
        form.trigger();
      }
    }
  };
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    try {
      setSubmitting(true);

      if (type === "Edit") {
        await updateQuestionById({
          title: values.title!,
          content: values.content,
          path: `question/${defaultValues._id}`,
          questionId: defaultValues._id,
        });
        router.push(`question/${defaultValues._id}`);
      } else {
        await postQuestion({
          title: values.title!,
          content: values.content,
          tags: values.tags,
          author: JSON.parse(mongoUser),
          path: "/",
        });
      }
      router.push("/");
    } catch (error: any) {
    } finally {
      setSubmitting(false);
    }
  }
  function deleteTag(
    item: string,
    field: ControllerRenderProps<
      { title: string; content: string; tags: string[] },
      "tags"
    >,
  ): void {
    const removed = field.value.filter((tag: string) => tag !== item);
    form.setValue("tags", removed);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full rounded-md border-2 border-gray-400 p-2"
                  />
                </FormControl>
                <FormDescription className="text-[#7f9e8c]">
                  Enter a Descriptive Title
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">content</FormLabel>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  onEditorChange={(content) => {
                    // @ts-ignore
                    field.onChange(content);
                  }}
                  initialValue={defaultValues.content || ""}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "visualblocks",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | blocks | formatselect |" +
                      "codesample | bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent |",
                    content_style: `body {  font-family: Arial, Inter;
                        font-size: 14px;
                        `,
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Tags</FormLabel>
                <FormControl>
                  <Input
                    disabled={type === "Edit"}
                    onKeyDown={(e) => handleTags(e, field)}
                    className="w-full rounded-md border-2 border-gray-400 p-2"
                  />
                </FormControl>
                {field.value ? (
                  <div className="flex gap-2 rounded-sm ">
                    {form.getValues("tags").map((item) => (
                      <p
                        key={item}
                        className="flex items-center gap-2 rounded-sm bg-slate-200 p-2 text-sm dark:bg-white dark:text-black "
                      >
                        {item}
                        {type !== "Edit" && (
                          <X
                            color="gray"
                            size={18}
                            className="cursor-pointer"
                            onClick={() => deleteTag(item, field)}
                          />
                        )}
                      </p>
                    ))}
                  </div>
                ) : (
                  <FormDescription className="text-[#7f9e8c]">
                    Enter Related Tags
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isSubmitting ? (
              <>{type === "Edit" ? "Editing.." : "Posting..."}</>
            ) : (
              <>{type === "Edit" ? "Edit" : "Ask a Question"}</>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default Questions;

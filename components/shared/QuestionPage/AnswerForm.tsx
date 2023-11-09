"use client";
import React, { MutableRefObject, useRef, useState } from "react";
import { Button } from "../../ui/button";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { AnswerSchema } from "@/utlils/Validations";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";
import { postAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";

const AnswerForm = ({
  author,
  question,
}: {
  author: string;
  question: string;
}) => {
  const editorRef = useRef();
  const { theme } = useTheme();
  const pathname = usePathname();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });
  async function onSubmit(values: z.infer<typeof AnswerSchema>) {
    try {
      setSubmitting(true);
      await postAnswer({
        content: values.content,
        author: JSON.parse(author),
        question: JSON.parse(question),
        path: pathname,
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="my-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold"> Write Your Answer Here</h3>
        <Button className=" flex max-h-10 items-center gap-1 bg-zinc-100 text-orange-500 dark:text-orange-500">
          <span>
            <Image
              src="/assets/icons/stars.svg"
              height={18}
              width={18}
              alt="generateAiAnswer"
            />
          </span>
          Generate AI Answer
        </Button>
      </div>

      {/* Form for user Answer */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
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
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: false,
                    link_default_target: "_blank",
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
                      "alignright alignjustify | bullist numlist outdent indent | link",
                    content_style: `body {  font-family: Arial, Inter;
                        font-size: 14px;
                        `,
                    skin: theme === "dark" ? "oxide-dark" : "oxide",
                    content_css: theme === "dark" ? "dark" : "light",
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="primary-gradient justify-end"
            disabled={submitting}
          >
            {submitting ? "Posting" : "Post"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;

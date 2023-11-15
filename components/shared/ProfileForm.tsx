"use client";
import React, { useState } from "react";
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
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProfileSchema } from "@/utlils/Validations";
import { Textarea } from "../ui/textarea";
import { updateUser } from "@/lib/actions/user.action";
import { usePathname, useRouter } from "next/navigation";

const ProfileForm = ({ user }: { user: string }) => {
  const [submiting, setSubmitting] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const defaultValues = user ? JSON.parse(user) : "";
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: defaultValues.username || "",
      name: defaultValues.name || "",
      bio: defaultValues.bio || "",
      location: defaultValues.location || "",
      portfolioWebsite: defaultValues.portfolioWebsite || "",
    },
  });
  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    try {
      setSubmitting(true);
      await updateUser({
        clerkId: defaultValues.clerkId,
        updateData: {
          ...values,
        },
        path: pathname,
      });
      router.push(`/profile/${defaultValues.clerkId}`);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base ">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Your Username"
                  {...field}
                  className="w-full rounded-sm bg-zinc-100 p-2 dark:bg-zinc-800 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base ">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Your Name"
                  {...field}
                  className="w-full rounded-sm bg-zinc-100 p-2 dark:bg-zinc-800 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base ">Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Your Location"
                  {...field}
                  className="w-full rounded-sm bg-zinc-100 p-2 dark:bg-zinc-800 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base ">Portfolio Website</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Your Portolio Link"
                  {...field}
                  className="w-full rounded-sm bg-zinc-100 p-2 dark:bg-zinc-800 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base ">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your Bio here."
                  {...field}
                  className="w-full rounded-lg bg-zinc-100 p-2 text-base placeholder:text-base dark:bg-zinc-800"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="primary-gradient" disabled={submiting}>
          {submiting ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;

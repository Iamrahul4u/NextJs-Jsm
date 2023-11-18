import { type ClassValue, clsx } from "clsx";
import queryString from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props {
  params: string;
  value: string | null;
  key: string;
}
export function formUrlQuery({ params, value, key }: Props) {
  const currPath = queryString.parse(params);
  currPath[key] = value;
  const newUrl = queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currPath,
    },
    { skipNull: true },
  );
  return newUrl;
}

interface RemoveProps {
  params: string;
  keys: string[];
}
export function RemoveUrlQuery({ params, keys }: RemoveProps) {
  const currPath = queryString.parse(params);
  keys.forEach((key) => {
    delete currPath[key];
  });
  const newUrl = queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currPath,
    },
    { skipNull: true },
  );
  return newUrl;
}

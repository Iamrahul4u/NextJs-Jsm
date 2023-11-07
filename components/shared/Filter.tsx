import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface filter {
  id: string;
  label: string;
}
const Filter = ({ filter }: { filter: filter[] }) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] ">
        <SelectValue placeholder="Select Filter" />
      </SelectTrigger>
      <SelectContent>
        {filter?.map((user) => (
          <SelectItem key={user.id} value={user.label}>
            {user.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Filter;

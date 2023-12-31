'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface DropdownProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
}

const Dropdown = ({ filters, otherClasses }: DropdownProps) => {
  return (
    <Select>
      <SelectTrigger
        className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
      >
        <div className="line-clamp-1 flex-1 text-left">
          <SelectValue placeholder="Select a filter" />
        </div>
        <SelectContent>
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectTrigger>
    </Select>
  );
};

export default Dropdown;

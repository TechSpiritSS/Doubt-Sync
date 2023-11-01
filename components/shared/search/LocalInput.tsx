'use client';

import { Input } from '@/components/ui/input';

interface LocalInputProps {
  placeholder: string;
}

const LocalInput = ({ placeholder }: LocalInputProps) => {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      //   value={''}
      onChange={() => {}}
      className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
    />
  );
};

export default LocalInput;

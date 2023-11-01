import Dropdown from './Dropdown';

interface FilterProps {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: FilterProps) => {
  return (
    <div className={`relative ${containerClasses}`}>
      <Dropdown filters={filters} otherClasses={otherClasses} />
    </div>
  );
};

export default Filter;

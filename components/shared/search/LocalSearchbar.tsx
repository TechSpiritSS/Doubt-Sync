import Image from 'next/image';
import LocalInput from './LocalInput';

interface LocalSearchbarProps {
  route: string;
  iconPosition?: string;
  imageSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imageSrc,
  placeholder,
  otherClasses,
}: LocalSearchbarProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === 'left' && (
        <Image
          className="cursor-pointer"
          src={imageSrc}
          alt="search"
          width={24}
          height={24}
        />
      )}

      <LocalInput placeholder={placeholder} />

      {iconPosition === 'right' && (
        <Image
          className="cursor-pointer"
          src={imageSrc}
          alt="search"
          width={24}
          height={24}
        />
      )}
    </div>
  );
};

export default LocalSearchbar;

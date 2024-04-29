import type { TitleProps } from "./type";

export const Title: React.FC<TitleProps> = ({ icon, text }) => {
  return (
    <div className="flex flex-row items-center gap-x-2 justify-center">
      {icon} {text}
    </div>
  );
};

export default Title;

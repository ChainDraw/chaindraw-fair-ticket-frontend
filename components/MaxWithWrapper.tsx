import { cn } from "@/lib/utils";
import { ReactNode } from "react";
interface IMaxWidthWrapper {
  children: ReactNode;
  className?: string;
}
const MaxWidthWrapper = ({ children, className }: IMaxWidthWrapper) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};
export default MaxWidthWrapper;

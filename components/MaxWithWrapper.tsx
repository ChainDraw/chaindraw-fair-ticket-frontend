import { cn } from "@/lib/utils";
import { ReactNode } from "react";
interface IMaxWidthWrapper {
  children: ReactNode;
  className?: string;
}
const MaxWidthWrapper = ({ children, className }: IMaxWidthWrapper) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-2xl px-5 md:px-20", className)}
    >
      {children}
    </div>
  );
};
export default MaxWidthWrapper;

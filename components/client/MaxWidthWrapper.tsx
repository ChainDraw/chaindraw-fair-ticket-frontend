import { cn } from "@/lib/utils";
import { ReactNode } from "react";
interface IMaxWidthWrapper {
  children: ReactNode;
  className?: string;
}
const MaxWidthWrapper = ({ children, className }: IMaxWidthWrapper) => {
  return (
    <section
      className={cn("mx-auto w-full max-w-screen-xl px-5 md:px-10", className)}
    >
      {children}
    </section>
  );
};
export default MaxWidthWrapper;

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Hero from "@/components/client/hero/Hero";
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <>
      <Hero />
      <MaxWidthWrapper className="mx-auto text-white">
        <Hero />
        <Hero />
        <Hero />
      </MaxWidthWrapper>
    </>
  );
}

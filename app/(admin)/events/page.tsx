import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/admin/events", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const responseData = await res.json();

  const { data } = responseData;
  console.log("data", data);

  if (!data.length) {
    return (
      <div className="flex-center flex-col h-full">
        <p className="mb-4">暂无活动</p>
        <div>
          <Button>
            <Link href="/events/create">新建活动</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {data.length &&
        data.map((item: any) => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}

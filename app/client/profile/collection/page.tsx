import { Button } from "@/components/ui/button";
import React from "react";
import SubmitDrawer from "./components/SubmitDrawer.tsx";

export default function CollectionPage() {
  const collection = {
    title: "Ape",
    price: 0.00001,
    description: "description",
    club: {
      name: "Mutant Ape Yacht Club",
      description:
        "The MUTANT APE YACHT CLUB is a collection of up to 20,000 Mutant Apes that can only be created by exposing an existing Bored Ape to a vial of MUTANT SERUM or by minting a Mutant Ape in the public sale.",
    },
  };

  return (
    <div className=" min-h-screen flex flex-col md:py-20  2xl:px-0 bg-black text-white">
      <div className="flex items-center justify-end h-14 px-4 mx-10 bg-slate-800 rounded">
        <SubmitDrawer price={collection.price} />
      </div>

      <div className=" flex  items-start m-10 bor">
        <div className="w-5/12">
          <img
            className="w-11/12 round-xl object-cover overflow-hidden rounded"
            src="https://i.seadn.io/s/raw/files/9a0a2f7945e3cf75c19879d883b6d786.png?auto=format&dpr=1&w=1000"
            alt=""
          />
        </div>
        <div className="w-7/12">
          <div className="w-full  h-96 p-5  bg-slate-800 rounded">
            <h2 className="text-4xl font-bold text-white">
              {collection.title}
            </h2>
            <p>about {collection.club.name}</p>
            <p>{collection.club.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";

export type TTicket = {
  id: string;
  imageId: string;
  name: string;
  size: string;
  color: string;
  price: number;
};
const Ticket = ({ ticket }: { ticket: TTicket }) => {
  console.log(ticket.imageId);
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <Image
          src={ticket.imageId}
          alt="ticket image"
          width={100}
          height={100}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{ticket.name}</h3>
          <p className="mt-1 text-sm text-gray-500">
            Size {ticket.size.toUpperCase()}, {ticket.color}
          </p>
        </div>

        <p className="text-sm font-medium text-gray-900">{ticket.price}</p>
      </div>
    </div>
  );
};

export default Ticket;

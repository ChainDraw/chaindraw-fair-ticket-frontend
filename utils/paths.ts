// api v1
export const paths = {
  client: {
    home: "/client",
    market: "/market",
    tickets: "/tickets",
    ticketInfo: (id: string) => {
      return `/ticket/${id}`;
    },
    create: "/create",
  },
  admin: {},
};

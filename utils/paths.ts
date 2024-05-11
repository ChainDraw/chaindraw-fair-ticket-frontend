// api v1
export const paths = {
  client: {
    home: "/client",
    market: "client/market",
    tickets: "client/tickets",
    ticketInfo: (id: string) => {
      return `client/ticket/${id}`;
    },
    create: "client/create",
  },
  admin: {},
};

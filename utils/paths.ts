// api v1
export const paths = {
  client: {
    home: '/client',
    profile: '/client/profile',
    market: '/client/market',
    lottery: '/client/lottery',
    ticketInfo: (id: string) => {
      return `client/shows/${id}`;
    },
  },
  admin: {
    events: '/events', // 后台活动列表
    settings: '/settings', // 后台主办方设置
  },
};

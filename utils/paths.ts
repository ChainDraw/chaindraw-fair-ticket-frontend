// api v1
export const paths = {
  client: {
    home: '/client',
    profile: '/client/profile',
    market: '/client/market',
    lottery: '/client/lottery',
    allLottery: '/client/lottery/allLottery',
    lotteryInfo: (id: string) => {
      return `/client/lottery/allLottery/${id}`;
    },
    ticketInfo: (id: string) => {
      return `/client/shows/${id}`;
    },
  },
  admin: {
    events: '/events', // 后台活动列表
    create: '/events/create', // 活动创建
    settings: '/settings', // 后台主办方设置
  },
};

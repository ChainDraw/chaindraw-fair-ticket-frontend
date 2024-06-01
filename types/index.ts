export interface EventBasics {
  concert_id: string;
  concert_name: string;
  address: string;
  concert_date: Date;
  concert_end_date: Date; // 演唱会结束时间
  remark: string;
  concert_status?: number; // 0: 未开始 1：已过期 2、已取消
  review_status?: number; // 0: 未审核、 1：审核通过、2、审核失败
}

export interface EventPromotion {
  // lottery_start_date?: Date;
  lottery_end_date: Date;
  concert_img: string;
}

export interface EventTicket {
  max_quantity_per_wallet: number;
  num: number;
  price: number;
  ticket_id?: string;
  ticket_img: string;
  ticket_type?: string; // 门票种类唯一键，对应抵押品合约和抽选合约
  trade: boolean;
  type_name: string;
  create_at?: string;
}
export interface NFT {
  price: string;
  nftMetadata: {
    address: string;
    concertName: string;
    description: string;
    image: string;
    name: string;
  };
  id: string;
  owner: {
    id: string;
  };
}
export interface CreateLottery {
  createAtTimestamp: string;
  participants: any;
  ticketCount: string;
  price: string;
  remainingTicketCount: string;
  nftMetadata: {
    concertName: string;
  };
}

// 基础信息
export interface EventBasics0 {
  id: string;
  name: string;
  address: string;
  start_time: Date;
  end_time: Date;
  entry_time: Date;
  description: string;
  status: number;
}

// 抽奖信息
export interface EventPromotion0 {
  lottery_start_date: Date;
  lottery_end_date: Date;
  description: string;
  cover: string;
}

// 门票信息
export interface EventTicket0 {
  name: string;
  description: string;
  price: number;
  max_per_wallet: number;
  ticket_max_num: number;
  cover: string;
  allow_transfer: boolean;
}

export interface EventBasics {
  concert_id: string;
  concert_name: string;
  address: string;
  concert_date: Date;
  remark: string;
  concert_status?: number; // 0: 未开始 1：已过期 2、已取消
  review_status?: number; // 0: 未审核、 1：审核通过、2、审核失败
}

export interface EventPromotion {
  lottery_start_date: Date;
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

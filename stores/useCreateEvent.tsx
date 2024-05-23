import { EventBasics, EventPromotion, EventTicket } from '@/types';
import { create } from 'zustand';

interface StepData {
  [key: string]: any; // 可以根据你的表单数据需求自定义类型
}

// 新建、编辑、查看/只读、审核
export type EventMode = 'create' | 'edit' | 'readonly' | 'review';

interface FormStepsState {
  data: {
    step1: StepData;
    step2: StepData;
    step3: StepData;
  };
  currentStep: number;
  progress: number;
  mode: EventMode;
  updateMode: (mode: EventMode) => void;
  updateStep: (step: number, formData?: StepData) => void;
  updateFinalStep: (formData: StepData) => void;
  submitData: () => Promise<any>; // 假设后端响应可以是任何类型
  getCurrentFormName: () => string;
  goBack: () => void;
  initializeData: (id: string) => Promise<void>;
  reset: () => void;
}

const stepMap: { [key: number]: number } = {
  1: 33,
  2: 66,
  3: 100,
};

const formStateMap: { [key: number]: string } = {
  33: '基本信息',
  66: '促销信息',
  100: '门票信息',
};

// 创建 store
const useCreateEvent = create<FormStepsState>((set, get) => ({
  data: {
    step1: {},
    step2: {},
    step3: {},
  },
  currentStep: 1,
  progress: stepMap[1],
  mode: 'create',
  updateMode: (mode) => {
    // 如果 mode 为创建，那么 data 的值需要初始化
    if (mode === 'create') {
      set({
        data: {
          step1: {},
          step2: {},
          step3: {},
        },
        currentStep: 1,
        progress: stepMap[1],
      });
    }
    set({ mode });
  },
  updateStep: (step, formData) => {
    const { mode } = get();
    if (mode === 'create' || mode === 'edit') {
      set((state) => ({
        data: { ...state.data, [`step${step}`]: formData },
        currentStep: step + 1,
        progress: stepMap[step + 1] || state.progress,
      }));
    } else {
      set((state) => ({
        currentStep: step + 1,
        progress: stepMap[step + 1] || state.progress,
      }));
    }
  },
  updateFinalStep: (formData) => {
    const { mode } = get();
    if (mode === 'create' || mode === 'edit') {
      set((state) => ({
        data: { ...state.data, step3: formData },
      }));
    }
  },
  submitData: async () => {
    const { data } = get();
    const transformedData = transformData(data);
    console.log('Transformed data', transformedData);

    const response = await fetch(
      'https://www.biturd.com/api/v1/concert/commit',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  },
  getCurrentFormName: () => {
    const { progress } = get();
    return formStateMap[progress];
  },
  goBack: () => {
    set((state) => ({
      // 确保 currentStep 不会小于 1
      currentStep: Math.max(state.currentStep - 1, 1),
      progress: stepMap[Math.max(state.currentStep - 1, 1)],
    }));
  },
  reset: () => {
    set({
      data: { step1: {}, step2: {}, step3: {} },
      currentStep: 1,
      progress: stepMap[1],
    });
  },
  // 根据状态，初始化数据
  async initializeData(id: string) {
    const { mode } = get();
    if (mode === 'create') {
      set({
        data: { step1: {}, step2: {}, step3: {} },
        currentStep: 1,
        progress: stepMap[1],
      });
    } else {
      const data = await fetchEventData(id);
      console.log('初始化数据', data);
      set({
        data,
        currentStep: 1,
        progress: stepMap[1],
      });
    }
  },
}));

// 转换数据的函数
function transformData(data: any) {
  const step1 = data.step1 || {};
  const step2 = data.step2 || {};
  const step3 = data.step3 || {};

  const tickets = (step3.tickets || []).map((ticket: any) => ({
    max_quantity_per_wallet: parseInt(ticket.max_quantity_per_wallet, 10),
    num: parseInt(ticket.num, 10),
    price: String(ticket.price),
    // ticket_img: ticket.ticket_img || '', // todo 后面改
    ticket_img: '',
    trade: ticket.trade,
    type_name: ticket.type_name || '',
  }));

  return {
    address: step1.address || '',
    concert_date: step1.concert_date || '',
    // concert_img: step2.concert_img || '', // todo 后面改
    concert_img: '',
    concert_name: step1.concert_name || '',
    // concert_status: 0,
    lottery_end_date: step2.lottery_end_date || '',
    lottery_start_date: step2.lottery_start_date || '',
    remark: '',
    // review_status: 0,
    tickets: tickets,
  };
}

// 模拟后端提交表单函数
async function submitFormData(data: any): Promise<any> {
  const response = await fetch('https://www.biturd.com/api/v1/concert/commit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// 模拟后端获取表单数据函数
async function fetchEventData(id: string): Promise<FormStepsState['data']> {
  // 模拟的活动基础信息
  const event: EventBasics = {
    concert_id: id,
    concert_name: 'Example Event',
    address: '123 Main St, City, Country',
    concert_date: new Date('2024-06-01T10:00:00Z'),
    // start_time: new Date('2024-06-01T10:00:00Z'),
    // end_time: new Date('2024-06-01T18:00:00Z'),
    // entry_time: new Date('2024-06-01T09:00:00Z'),
    remark: 'This is an example event.',
    review_status: 1,
  };

  // 模拟的抽奖信息
  const promotion: EventPromotion = {
    lottery_start_date: new Date('2024-05-01T00:00:00Z'),
    lottery_end_date: new Date('2024-05-31T23:59:59Z'),
    concert_img: '',
  };

  // 需要把图片转换为 blob 格式
  const response = await fetch('https://picsum.photos/200/300');
  const blob = await response.blob();
  const response2 = await fetch('https://picsum.photos/300/200');
  const blob2 = await response2.blob();

  // 模拟的门票信息
  const ticket: EventTicket = {
    type_name: 'General Admission',
    price: 50,
    max_quantity_per_wallet: 4,
    num: 1000,
    ticket_img: 'https://picsum.photos/200/300',
    trade: true,
  };

  // 返回模拟的数据
  return {
    step1: event,
    step2: { ...promotion, cover: blob },
    step3: { ...ticket, cover: blob2 },
  };
}

export default useCreateEvent;

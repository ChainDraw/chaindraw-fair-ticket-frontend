import { EventBasics, EventPromotion, EventTicket } from '@/types';
import { create } from 'zustand';

interface StepData {
  [key: string]: any; // 可以根据你的表单数据需求自定义类型
}

type EventMode = 'create' | 'edit' | 'readonly';

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
  updateStep: (step: number, formData: StepData) => void;
  updateFinalStep: (formData: StepData) => void;
  submitData: () => Promise<any>; // 假设后端响应可以是任何类型
  getCurrentFormName: () => string;
  goBack: () => void;
  initializeForEdit: (id: string) => Promise<void>;
  initializeForView: (id: string) => Promise<void>;
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
    console.log('data', data);
    // 向后端发送数据
    // 这里我们只是模拟了一个 submitFormData 的函数调用
    const response = await submitFormData(data);

    // 将表单数据重置为初始状态
    // set({
    //   data: { step1: {}, step2: {}, step3: {} },
    //   currentStep: 1,
    //   progress: stepMap[1],
    // });
    return response;
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
  initializeForEdit: async (id: string) => {
    const eventData = await fetchEventData(id);
    set({
      data: eventData,
      mode: 'edit',
      currentStep: 1,
      progress: stepMap[1],
    });
  },
  initializeForView: async (id: string) => {
    const eventData = await fetchEventData(id);
    set({
      data: eventData,
      mode: 'readonly',
      currentStep: 1,
      progress: stepMap[1],
    });
  },
}));

// 模拟后端提交表单函数
async function submitFormData(data: FormStepsState['data']): Promise<any> {
  // 发送请求到后端并返回响应数据的逻辑
  // 这里为了演示，我们直接返回 data
  return data;
}

// 模拟后端获取表单数据函数
async function fetchEventData(id: string): Promise<FormStepsState['data']> {
  // 模拟的活动基础信息
  const event: EventBasics = {
    id,
    name: 'Example Event',
    address: '123 Main St, City, Country',
    start_time: new Date('2024-06-01T10:00:00Z'),
    end_time: new Date('2024-06-01T18:00:00Z'),
    entry_time: new Date('2024-06-01T09:00:00Z'),
    description: 'This is an example event.',
    status: 1,
  };

  // 模拟的抽奖信息
  const promotion: EventPromotion = {
    lottery_start_date: new Date('2024-05-01T00:00:00Z'),
    lottery_end_date: new Date('2024-05-31T23:59:59Z'),
    description: 'Participate in our lottery to win exciting prizes!',
    cover:
      'https://fastly.picsum.photos/id/234/200/300.jpg?hmac=KD9xFDCez7-lqgcMm-EEi7BtpClIdCzJS6YvFVyLiDs',
  };

  // 模拟的门票信息
  const ticket: EventTicket = {
    name: 'General Admission',
    description: 'Access to all areas of the event.',
    price: 50,
    max_per_wallet: 4,
    ticket_max_num: 1000,
    cover: 'https://picsum.photos/200/300',
    allow_transfer: true,
  };

  // 返回模拟的数据
  return {
    step1: event,
    step2: promotion,
    step3: ticket,
  };
}

export default useCreateEvent;

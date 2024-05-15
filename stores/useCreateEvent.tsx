import { create } from 'zustand';

interface StepData {
  [key: string]: any; // 可以根据你的表单数据需求自定义类型
}

interface FormStepsState {
  data: {
    step1: StepData;
    step2: StepData;
    step3: StepData;
  };
  currentStep: number;
  progress: number;
  updateStep: (step: number, formData: StepData) => void;
  updateFinalStep: (formData: StepData) => void;
  submitData: () => Promise<any>; // 假设后端响应可以是任何类型
  getCurrentFormName: () => string;
  goBack: () => void;
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
  updateStep: (step, formData) => {
    set((state) => ({
      data: { ...state.data, [`step${step}`]: formData },
      currentStep: step + 1,
      progress: stepMap[step + 1] || state.progress,
    }));
  },
  updateFinalStep: (formData) => {
    set((state) => ({
      data: { ...state.data, step3: formData },
    }));
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
}));

// 模拟后端提交表单函数
async function submitFormData(data: FormStepsState['data']): Promise<any> {
  // 发送请求到后端并返回响应数据的逻辑
  // 这里为了演示，我们直接返回 data
  return data;
}

export default useCreateEvent;

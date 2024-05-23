import toast from 'react-hot-toast';

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    let errorMessage = '';
    // 指定错误
    if (error.name === 'ContractFunctionExecutionError') {
      errorMessage = error.message.split('\n')[1];
    } else {
      // 其他错误
      errorMessage = error.message;
    }
    toast.error(errorMessage);
    console.error(errorMessage);
  } else if (typeof error === 'string') {
    toast.error(error);
    console.error(error);
  } else {
    const unknownErrorMessage =
      'An unknown error occurred. Please try again later.';
    toast.error(unknownErrorMessage);
    console.error(error);
  }
};

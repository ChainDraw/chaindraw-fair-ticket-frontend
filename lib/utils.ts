import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 可接受的图片类型
const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
// 可接受的文件大小
const MAX_FILE_SIZE = 1024 * 1024 * 5;

export { cn, ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE };

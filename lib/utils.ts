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

/**
 * 比较两个日期字符串
 * @param {string} dateStr1 第一个日期字符串
 * @param {string} dateStr2 第二个日期字符串
 * @return {number} 返回值为 -1 (dateStr1 < dateStr2), 0 (dateStr1 = dateStr2), 或 1 (dateStr1 > dateStr2)
 */
function compareDates(dateStr1: Date, dateStr2: Date) {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  if (date1 < date2) return -1;
  if (date1 > date2) return 1;
  return 0;
}

/**
 * 检查开始时间是否早于入场时间，并且入场时间是否早于结束时间
 * @param {string} startTime 开始时间字符串
 * @param {string} entryTime 入场时间字符串
 * @param {string} endTime 结束时间字符串
 * @return {boolean} 如果时间顺序正确则返回 true，否则返回 false
 */
function checkTimeOrder(startTime: Date, entryTime: Date, endTime: Date) {
  const start = new Date(startTime);
  const entry = new Date(entryTime);
  const end = new Date(endTime);

  return start < entry && entry < end;
}

export {
  cn,
  ACCEPTED_IMAGE_MIME_TYPES,
  MAX_FILE_SIZE,
  compareDates,
  checkTimeOrder,
};

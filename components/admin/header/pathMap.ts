export const map: { [key: string]: string } = {
  '/events': '活动列表',
  '/events/create': '新建活动',
  '/events/:id/edit': '编辑活动',
  '/events/:id/review': '审核活动',
  '/events/:id': '活动详情',
  '/settings': '主办方设置',
};

export const getHeaderTitle = (path: string): string => {
  for (const key in map) {
    const regexPath = key.replace(/:[^\/]+/g, '[^/]+'); // 替换占位符为正则表达式
    const regex = new RegExp(`^${regexPath}$`);
    if (regex.test(path)) {
      return map[key];
    }
  }
  return '欢迎 👏'; // 默认标题
};

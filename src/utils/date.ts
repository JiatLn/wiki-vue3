import dayjs from 'dayjs';

export const formatDate = (date: string, template: string = 'YYYY/MM/DD') => {
  return dayjs(date).format(template);
};

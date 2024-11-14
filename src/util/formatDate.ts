import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from "date-fns/locale";

export default function formatDate(dateString: string) {
  // UTC 시간을 한국 시간으로 올바르게 변환
  const date = new Date(parseISO(dateString).getTime() - (new Date().getTimezoneOffset() * 60000));
  return formatDistanceToNow(date, { addSuffix: true, locale: ko });
};
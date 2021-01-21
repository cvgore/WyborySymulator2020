import {DateTime} from "luxon";

export default function(isoDate) {
  return DateTime.fromISO(isoDate).toFormat('dd.LL.yyyy');
}

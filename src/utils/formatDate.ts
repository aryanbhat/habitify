export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function binarySearchDates(dates: string[], key: string) {
  let start = 0;
  let end = dates.length - 1;
  while (start < end) {
    const mid = start + Math.floor((end - start) / 2);
    if (dates[mid] === key) {
      return mid;
    } else if (dates[mid] < key) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}

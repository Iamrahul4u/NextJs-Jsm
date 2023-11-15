export function timeAgo(dateTimeString: Date): string {
  const now = new Date();
  const date = new Date(dateTimeString);

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  const weeks = Math.floor(days / 7);
  return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
}

export function convertDateFormat(inputDate: string): string {
  const date = new Date(inputDate);

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month: string = monthNames[date.getMonth()];
  const year: number = date.getFullYear();

  return `Joined ${month} ${year}`;
}

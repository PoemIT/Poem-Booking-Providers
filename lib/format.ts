export function formatCurrency(amount: number, currency: string = "XAF") {
  return `${amount.toLocaleString("en-US")} ${currency}`;
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatPercent(value: number) {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value}%`;
}
export function formatFullDate(date: Date = new Date()) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const avatarPalette = [
  "bg-violet-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-pink-500",
  "bg-amber-500",
  "bg-teal-500",
];

export function getAvatarColor(name: string) {
  const charSum = name
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return avatarPalette[charSum % avatarPalette.length];
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

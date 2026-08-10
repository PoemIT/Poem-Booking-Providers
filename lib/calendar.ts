// lib/calendar.ts
//
// Generates a proper Monday-first calendar grid for any month — figures
// out how many blank/grayed-out days from the previous and next month
// are needed to fill a complete grid of weeks, so the calendar always
// lines up correctly no matter what day of the week the month starts on.

export type CalendarCell = {
  date: number;
  isCurrentMonth: boolean;
};

export function generateCalendarGrid(
  year: number,
  monthIndex: number,
): CalendarCell[] {
  // monthIndex: 0 = January, 7 = August, etc. — matches JS's own Date rules.
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();

  // JS's getDay() is Sunday-first (0-6). This converts it to Monday-first
  // (0-6), since the design's calendar starts the week on Monday.
  const firstWeekday = (firstDayOfMonth.getDay() + 6) % 7;

  const cells: CalendarCell[] = [];

  // Leading grayed-out days, from the end of the previous month
  for (let i = firstWeekday; i > 0; i--) {
    cells.push({ date: daysInPrevMonth - i + 1, isCurrentMonth: false });
  }

  // The real days of this month
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ date: day, isCurrentMonth: true });
  }

  // Trailing grayed-out days, from the start of next month —
  // keeps adding until the grid is a full multiple of 7 (complete weeks)
  let nextMonthDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ date: nextMonthDay, isCurrentMonth: false });
    nextMonthDay++;
  }

  return cells;
}

export const monthNames = [
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

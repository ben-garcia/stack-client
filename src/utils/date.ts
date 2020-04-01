// helper functions to format ISO string to local time and day

const getDay = (day: number): string => {
  switch (day) {
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return 'Sunday';
  }
};

const getDate = (date: number): string => {
  switch (date) {
    case 1:
      return `${date}st`;
    case 2:
      return `${date}nd`;
    case 3:
      return `${date}rd`;
    default:
      return `${date}th`;
  }
};

const getMonth = (month: number): string => {
  switch (month) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    default:
      return 'December';
  }
};

const getCurrentYear = (): number => new Date().getFullYear();

const printFormattedDate = (ISOString: string): string => {
  const dateToFormat = new Date(ISOString);
  // if the current year is equal to the ISOString year
  // then format string like so: month date, year
  if (getCurrentYear() === dateToFormat.getFullYear()) {
    const dateInMilliseconds = Date.parse(ISOString);
    const currentDateInMilliseconds = Date.parse(new Date().toString());
    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    // for those messages that were created in the current date day month and year
    if (dayInMilliseconds > currentDateInMilliseconds - dateInMilliseconds) {
      return 'Today';
    }
    // messages created 1 day before
    if (
      dayInMilliseconds < currentDateInMilliseconds - dateInMilliseconds &&
      dayInMilliseconds * 2 > currentDateInMilliseconds - dateInMilliseconds
    ) {
      return 'Yesterday';
    }
    // otherwise: day, month date
    return `${getDay(dateToFormat.getDate())}, ${getMonth(
      dateToFormat.getMonth()
    )} ${getDate(dateToFormat.getDate())}`;
  }
  // format ISOString like so: month date, year
  return `${getMonth(dateToFormat.getMonth())} ${getDate(
    dateToFormat.getDate()
  )}, ${dateToFormat.getFullYear()}`;
};

export default printFormattedDate;

// helper functions to format ISO string to local time and day

const getDay = (day: number): string => {
  switch (day + 1) {
    case 1:
      return 'Sunday';
    case 2:
      return 'Monday';
    case 3:
      return 'Tuesday';
    case 4:
      return 'Wednesday';
    case 5:
      return 'Thursday';
    case 6:
      return 'Friday';
    default:
      return 'Saturday';
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
  switch (month + 1) {
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

const setupMap = (date: string): Map<number, number> => {
  const monthMaxDays = new Map<number, number>();
  monthMaxDays.set(1, 31);
  // check for leap year
  if (Number(date.split('/')[2]) / 4 === 0) {
    monthMaxDays.set(2, 29);
  } else {
    monthMaxDays.set(2, 28);
  }
  monthMaxDays.set(3, 31);
  monthMaxDays.set(4, 30);
  monthMaxDays.set(5, 31);
  monthMaxDays.set(6, 30);
  monthMaxDays.set(7, 31);
  monthMaxDays.set(8, 31);
  monthMaxDays.set(9, 30);
  monthMaxDays.set(10, 31);
  monthMaxDays.set(11, 30);
  monthMaxDays.set(12, 31);

  return monthMaxDays;
};

const isMessageFromYesterday = (
  today: string,
  dateInQuestion: string
): boolean => {
  const monthMaxDays = setupMap(today);
  const month = Number(dateInQuestion.split('/')[0]);
  const date = Number(dateInQuestion.split('/')[1]);
  const year = Number(dateInQuestion.split('/')[2]);
  const todayMonth = Number(today.split('/')[0]);
  const todayDate = Number(today.split('/')[1]);
  const todayYear = Number(today.split('/')[2]);
  let dateToCompare;
  let todayToCompare;

  // check that it isn't the 1st of the month
  if (date === 1) {
    todayToCompare = `${todayMonth}/${todayDate - 1}/${todayYear}`;
    if (todayToCompare === dateInQuestion) {
      return true;
    }
    // check that month isn't January and date is 1
  } else if (date === 1 && month !== 1) {
    const newDate = monthMaxDays.get(month - 1);
    dateToCompare = `${month - 1}/${newDate}/${year}`;
    todayToCompare = `${todayMonth}/${todayDate - 1}/${todayYear}`;
    if (dateToCompare === todayToCompare) {
      return true;
    }
  } else {
    dateToCompare = `${month}/${date}/${year}`;
    todayToCompare = `${todayMonth}/${todayDate - 1}/${todayYear}`;
    if (dateToCompare === todayToCompare) {
      return true;
    }
  }

  return false;
};

const getCurrentYear = (): number => new Date().getFullYear();

const printFormattedDate = (ISOString: string): string => {
  const dateToFormat = new Date(ISOString);
  // if the current year is equal to the ISOString year
  // then format string like so: month date, year
  if (getCurrentYear() === dateToFormat.getFullYear()) {
    const todaysDate = new Date().toLocaleDateString();
    const dateInQuestion = dateToFormat.toLocaleDateString();
    // for those messages that were created in the current day month and year
    if (todaysDate === dateInQuestion) {
      return 'Today';
    }
    if (isMessageFromYesterday(todaysDate, dateInQuestion)) {
      // messages created 1 day before
      return 'Yesterday';
    }
    // otherwise: day, month date
    return `${getDay(dateToFormat.getDay())}, ${getMonth(
      dateToFormat.getMonth()
    )} ${getDate(dateToFormat.getDate())}`;
  }
  // format ISOString like so: month date, year
  return `${getMonth(dateToFormat.getMonth())} ${getDate(
    dateToFormat.getDate()
  )}, ${dateToFormat.getFullYear()}`;
};

export default printFormattedDate;

export function generateDateList(startDate: string, endDate: string) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  let dateList = [];

  while (start <= end) {
    dateList.push({
      date: start.toISOString().split("T")[0], // Format as YYYY-MM-DD
      state: null,
      cycle_day: null,
      menstrual_flow: null,
      sex_and_sex_drive: null,
      mood: null,
      symptoms: null,
      vaginal_discharge: null,
      digestion_and_stool: null,
      pregnancy_test: null,
      other: null,
      physical_activity: null,
    });
    start.setDate(start.getDate() + 1); // Move to the next day
  }

  return dateList;
}

// // Example usage:
// console.log(generateDateList("2025-03-01", "2025-03-05"));

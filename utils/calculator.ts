export function getCyclePhase(
  lastPeriodDate: Date,
  cycleLength: number,
  periodLength: number,
  currentDate: Date,
): {
  top: string;
  bottom: string;
} {
  // Normalize dates (reset time to midnight)
  const normalizeDate = (date: Date) => new Date(date.setHours(0, 0, 0, 0));

  lastPeriodDate = normalizeDate(lastPeriodDate);
  currentDate = normalizeDate(currentDate);

  let cycleStart = new Date(lastPeriodDate);

  while (cycleStart <= currentDate) {
    let cycleEnd = new Date(cycleStart);
    cycleEnd.setDate(cycleStart.getDate() + cycleLength);

    let periodStart = new Date(cycleStart);
    let periodEnd = new Date(cycleStart);
    periodEnd.setDate(periodStart.getDate() + periodLength - 1);

    let nextPeriodStart = new Date(cycleStart);
    nextPeriodStart.setDate(cycleStart.getDate() + cycleLength);

    let ovulationDay = new Date(nextPeriodStart);
    ovulationDay.setDate(nextPeriodStart.getDate() - 14);

    let fertileStart = new Date(ovulationDay);
    fertileStart.setDate(ovulationDay.getDate() - 5);
    let fertileEnd = new Date(ovulationDay);

    // Check if current date falls in this cycle
    if (currentDate >= cycleStart && currentDate < cycleEnd) {
      // Check if it's during the period
      if (currentDate >= periodStart && currentDate <= periodEnd) {
        let periodDay =
          (currentDate.getTime() - periodStart.getTime()) /
            (1000 * 60 * 60 * 24) +
          1;

        return {
          top: "Period",
          bottom: `Day ${periodDay}`,
        };
      }

      // Check if it's ovulation day
      if (currentDate.getTime() === ovulationDay.getTime()) {
        return {
          top: "",
          bottom: `Ovulation day`,
        };
      }

      // Check if it's in the fertile window
      if (currentDate >= fertileStart && currentDate < ovulationDay) {
        let daysToOvulation =
          (ovulationDay.getTime() - currentDate.getTime()) /
          (1000 * 60 * 60 * 24);
        return {
          top: "Ovulation in",
          bottom: `${daysToOvulation} days`,
        };
      }

      // Check if it's a few days before the next period
      let daysToPeriod =
        (nextPeriodStart.getTime() - currentDate.getTime()) /
        (1000 * 60 * 60 * 24);
      if (currentDate > ovulationDay && daysToPeriod <= 5) {
        return {
          top: "Period in",
          bottom: `${daysToPeriod} days`,
        };
      }

      // return `Normal cycle day`;

      return {
        top: "",
        bottom: `Normal cycle day`,
      };
    }

    // Move to the next cycle
    cycleStart = nextPeriodStart;
  }
  return {
    top: "",
    bottom: `Date out of cycle range`,
  };
}

export function getInsightParams(
  lastPeriodDate: Date,
  cycleLength: number,
  periodLength: number,
  currentDate: Date,
): {
  fertileStart: string;
  fertileEnd: string;
  ovulationDay: string;
  nextPeriodStart: string;
} {
  // Normalize dates (reset time to midnight)
  const normalizeDate = (date: Date) => new Date(date.setHours(0, 0, 0, 0));

  lastPeriodDate = normalizeDate(lastPeriodDate);
  currentDate = normalizeDate(currentDate);

  let cycleStart = new Date(lastPeriodDate);
  let fertileStart;
  let fertileEnd;
  let ovulationDay;
  let nextPeriodStart;

  let index = 0;
  while (cycleStart <= currentDate) {
    index++;
    console.log(index);
    let cycleEnd = new Date(cycleStart);
    cycleEnd.setDate(cycleStart.getDate() + cycleLength);

    let periodStart = new Date(cycleStart);
    let periodEnd = new Date(cycleStart);
    periodEnd.setDate(periodStart.getDate() + periodLength - 1);

    nextPeriodStart = new Date(cycleStart);
    nextPeriodStart.setDate(cycleStart.getDate() + cycleLength);

    ovulationDay = new Date(nextPeriodStart);
    ovulationDay.setDate(nextPeriodStart.getDate() - 14);

    fertileStart = new Date(ovulationDay);
    fertileStart.setDate(ovulationDay.getDate() - 5);
    fertileEnd = new Date(ovulationDay);
  }
  return {
    fertileStart: formatDate(fertileStart),
    fertileEnd: formatDate(fertileEnd),
    ovulationDay: formatDate(ovulationDay),
    nextPeriodStart: formatDate(nextPeriodStart),
  };
}

function formatDate(date: Date | undefined): string {
  if (!date) return "Undefined Date";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

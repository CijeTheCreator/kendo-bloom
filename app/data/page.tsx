"use client";
import { useState, useEffect } from "react";
import { getCyclePhase } from "@/utils/calculator";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

type Selections = {
  selectedFeelings: string[];
  selectedFlow: string[];
  selectedSexOptions: string[];
  selectedMoods: string[];
  selectedSymptoms: string[];
};

export default function MyData() {
  const [populatedUserData, setPopulatedUserData] = useState<any[]>([]);

  useEffect(() => {
    const userData = generateDateList("2025-03-20", "2025-03-29");
    const lastPeriod = new Date("2020-01-01"); // January 1, 2020
    const cycleLength = 28;
    const periodLength = 5;

    const updatedData = userData.map((el) => {
      const dateInstance = new Date(el.date);
      const dateKey = `${dateInstance.getDate()} ${dateInstance.toLocaleString("default", { month: "long" })}`;
      const { top, bottom } = getCyclePhase(
        lastPeriod,
        cycleLength,
        periodLength,
        dateInstance,
      );
      el["cycle_day"] = `${top} ${bottom}`;

      if (typeof window !== "undefined") {
        const dayLog = localStorage.getItem(dateKey);
        console.log(dateKey);
        console.log(dayLog);
        if (dayLog) {
          const parsedData = JSON.parse(dayLog) as Selections;
          el["mood"] = parsedData.selectedMoods.join(", ");
          el["symptoms"] = parsedData.selectedSymptoms.join(", ");
          el["sex_options"] = parsedData.selectedSexOptions.join(", ");
          el["feelings"] = parsedData.selectedFeelings.join(", ");
          el["flow"] = parsedData.selectedFlow.join(", ");
        }
      }
      return el;
    });

    setPopulatedUserData(updatedData);
  }, []); // Run only once on mount

  return (
    <Grid data={populatedUserData}>
      <GridColumn field="date" title="Date" />
      <GridColumn field="cycle_day" title="Cycle Day" />
      <GridColumn field="feelings" title="Feelings" />
      <GridColumn field="flow" title="Menstrual Flow" />
      <GridColumn field="sex_options" title="Sex and Sex Drive" />
      <GridColumn field="mood" title="Mood" />
      <GridColumn field="symptoms" title="Symptoms" />
    </Grid>
  );
}

function generateDateList(startDate: string, endDate: string) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  let dateList = [];

  while (start <= end) {
    dateList.push({
      date: start.toISOString().split("T")[0], // Format as YYYY-MM-DD
      cycle_day: "",
      flow: "",
      feelings: "",
      sex_options: "",
      mood: "",
      symptoms: "",
    });
    start.setDate(start.getDate() + 1); // Move to the next day
  }

  return dateList;
}

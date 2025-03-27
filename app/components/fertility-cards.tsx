import { useState } from "react";
import { Card } from "@/components/ui/card";

import { Plus } from "lucide-react";
import { Window } from "@progress/kendo-react-dialogs";
import Logger from "./log";
import { getInsightParams } from "@/utils/calculator";

export default function FertilityTracker({
  date,
  top,
  bottom,
  setSelectedDate,
}: {
  date: Date;
  top: string;
  bottom: string;
  setSelectedDate: (date: Date) => void;
}) {
  const [symptomsLogVisible, setSymptomsLogVisible] = useState(false);
  const today = new Date();

  const lastPeriodISOString = localStorage.getItem("lastPeriod") as string;
  const lastPeriod = new Date(lastPeriodISOString);
  const cycleLength = parseInt(localStorage.getItem("cycleLength") as string);
  const periodLength = parseInt(localStorage.getItem("periodLength") as string);

  const { fertileStart, fertileEnd, nextPeriodStart, ovulationDay } =
    getInsightParams(lastPeriod, cycleLength, periodLength, today);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {symptomsLogVisible && (
        <Window
          title="Log Your Symptoms"
          onClose={() => setSymptomsLogVisible(false)}
          initialWidth={600}
          initialHeight={400}
        >
          <Logger
            date={date}
            top={top}
            bottom={bottom}
            setSelectedDate={setSelectedDate}
          />
        </Window>
      )}

      <Card className="p-6 flex flex-col justify-between  shadow-sm">
        <p className="text-black font-medium">Log your symptoms</p>
        <div className="flex justify-start mt-auto">
          <div className="w-10 h-10 rounded-full bg-pink-400 flex items-center justify-center">
            <Plus
              className="text-white cursor-pointer"
              onClick={() => setSymptomsLogVisible((value) => !value)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 flex flex-col justify-between  bg-pink-100 border-pink-200 shadow-sm">
        <p className="text-black font-medium">Today's change of pregnancy</p>
        <p className="text-pink-500 mt-auto">See update</p>
      </Card>
      {/* Fertile Window Card */}
      <div className=" rounded-lg p-6 shadow-md border">
        <div className="bg-pink-400 text-white py-3 px-4 rounded-lg inline-block mb-4">
          <span className="text-lg font-medium">
            {`${fertileStart} - ${fertileEnd}`}
          </span>
        </div>

        <h2 className="text-white text-xl font-semibold mb-3">
          Fertile Window
        </h2>

        <p className="">
          The fertile window is the time period in which a woman is most likely
          to conceive, typically occurring around the time of ovulation.
        </p>
      </div>

      {/* Ovulation Date Card */}
      <div className=" rounded-lg p-6 shadow-md border">
        <div className="bg-pink-400 text-white py-3 px-4 rounded-lg inline-block mb-4">
          <span className="text-lg font-medium">{ovulationDay}</span>
        </div>

        <h2 className="text-white text-xl font-semibold mb-3">
          Ovulation Date
        </h2>

        <p className="">
          Ovulation date is the day in a woman's menstrual cycle when an egg is
          released from the ovary and can potentially be fertilized.
        </p>
      </div>

      {/* Next Period Date Card */}
      <div className=" rounded-lg p-6 shadow-md border">
        <div className="bg-pink-400 text-white py-3 px-4 rounded-lg inline-block mb-4">
          <span className="text-lg font-medium">{nextPeriodStart}</span>
        </div>

        <h2 className="text-white text-xl font-semibold mb-3">
          Next Period Date
        </h2>

        <p className="">
          The Next Period Date is the date when a women's menstrual cycle is
          expected to begin again after the previous period.
        </p>
      </div>
    </div>
  );
}

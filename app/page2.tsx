"use client";
import { Button } from "@progress/kendo-react-buttons";
import { useState } from "react";
import DynamicBlob from "./components/dynamic-blob";
import { Calendar, Plus, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Window } from "@progress/kendo-react-dialogs";
import Logger from "./components/log";
import OvulationCalculator from "./components/edit-period-date";
import FertilityTracker from "./components/fertility-cards";

export default function Home() {
  const [currentDate] = useState(new Date());
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const dates = [14, 15, 16, 17, 18, 19];
  const currentDay = 18; // Hardcoded to match the design
  const [symptomsLogVisible, setSymptomsLogVisible] = useState(false);
  const [editPeriodDate, setEditPeriodDate] = useState(true);

  const month = currentDate.toLocaleString("default", { month: "long" });
  const formattedDate = `19 ${month.toLowerCase()}`;

  return (
    <div>
      {symptomsLogVisible && (
        <Window
          title="Log Your Symptoms"
          onClose={() => setSymptomsLogVisible(false)}
          initialWidth={600}
          initialHeight={400}
        >
          <Logger />
        </Window>
      )}

      {editPeriodDate && (
        <Window
          title="Edit your dates"
          onClose={() => setEditPeriodDate(false)}
          initialWidth={600}
          initialHeight={400}
        >
          <OvulationCalculator />
        </Window>
      )}

      <DynamicBlob />

      <div className="relative z-10">
        <header className="flex justify-center items-center p-4">
          <h2 className="text-black text-lg font-medium">{formattedDate}</h2>
        </header>

        <div className="px-4 mt-2">
          <div className="relative mb-6">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-1 shadow-sm hidden md:flex items-center justify-center"
              onClick={() => {
                const container = document.getElementById("calendar-scroll");
                if (container)
                  container.scrollBy({ left: -100, behavior: "smooth" });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-pink-500"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div
              id="calendar-scroll"
              className="flex overflow-x-auto scrollbar-hide py-2 px-6 md:px-10 -mx-6 md:-mx-10 snap-x"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex space-x-8 md:space-x-12 min-w-max px-6">
                {Array.from({ length: 14 }, (_, i) => {
                  const dayIndex = i % 7;
                  const dateNum = 14 + i;
                  const isCurrentDay = dateNum === currentDay;
                  const isNextDay = dateNum === currentDay + 1;

                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center snap-center"
                    >
                      <span className="text-xs text-gray-500 mb-2">
                        {days[dayIndex]}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isCurrentDay
                      ? "bg-pink-400 text-white"
                      : isNextDay
                        ? "border border-dashed border-pink-400"
                        : "text-black"
                  }`}
                      >
                        {dateNum}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-1 shadow-sm hidden md:flex items-center justify-center"
              onClick={() => {
                const container = document.getElementById("calendar-scroll");
                if (container)
                  container.scrollBy({ left: 100, behavior: "smooth" });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-pink-500"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="text-center mt-12 mb-4">
            <p className="text-black text-lg">Period</p>
            <h1 className="text-black text-4xl font-bold">Day 1</h1>
          </div>

          <div className="flex justify-center mb-8">
            <Button
              // variant="outline"
              className="bg-white text-pink-500 rounded-full px-6 py-2 font-medium cursor-pointer"
              onClick={() => setEditPeriodDate((value) => !value)}
            >
              Edit period dates
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-t-3xl pt-6 px-4 pb-20 min-h-screen">
          <h3 className="text-black font-medium text-lg mb-4">
            My daily insights - today
          </h3>

          <FertilityTracker/>

          <h3 className="text-black font-medium text-lg mb-4">During period</h3>

          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles, etc"
              className="bg-gray-100 w-full pl-10 pr-4 py-2 rounded-lg text-sm"
            />
          </div>

          <Card className="p-4 bg-purple-600 text-white rounded-lg mb-4">
            <h4 className="text-xl font-medium">Coping with cramps</h4>
          </Card>
        </div>
      </div>
    </div>
  );
}

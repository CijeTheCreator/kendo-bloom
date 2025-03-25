"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function OvulationCalculator() {
  const [selectedDate, setSelectedDate] = useState<number>(23);
  const [currentMonth, setCurrentMonth] = useState<string>("March 2025");
  const [cycleLength, setCycleLength] = useState<string>("28");

  // Calendar data for March 2025
  const daysInMonth = 31;
  const firstDayOfMonth = 6; // Saturday (0-indexed, where 0 is Sunday)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const handlePreviousMonth = () => {
    // In a real implementation, this would change the month
    console.log("Previous month");
  };

  const handleNextMonth = () => {
    // In a real implementation, this would change the month
    console.log("Next month");
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(day);
  };

  const handleReset = () => {
    setSelectedDate(23);
    setCycleLength("28");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-purple-500 text-xl font-medium mb-2">
          Ovulation Calculator
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Determine your ovulation cycle.
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Use this calculator to pinpoint your most fertile days by identifying
          when you are likely ovulating. Menstrual periods can vary from person
          to person and month to month, so this tool can help you better
          understand your own cycle.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Last Period Section */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Last period</h3>
            <p className="text-gray-600 text-sm">
              Choose the starting date of your most recent menstrual cycle.
            </p>
          </div>

          <div className="calendar">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">{currentMonth}</h4>
              <div className="flex">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePreviousMonth}
                  className="h-8 w-8"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextMonth}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              <div className="text-sm text-gray-500">S</div>
              <div className="text-sm text-gray-500">M</div>
              <div className="text-sm text-gray-500">T</div>
              <div className="text-sm text-gray-500">W</div>
              <div className="text-sm text-gray-500">T</div>
              <div className="text-sm text-gray-500">F</div>
              <div className="text-sm text-gray-500">S</div>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} className="h-8 w-full"></div>
              ))}

              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  className={`h-8 w-full rounded-full flex items-center justify-center text-sm
                    ${selectedDate === day ? "bg-teal-500 text-white" : "hover:bg-gray-100"}`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Cycle Length Section */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Cycle length</h3>
            <p className="text-gray-600 text-sm">
              Enter the number of days in your menstrual cycle.
            </p>
          </div>

          <div className="mb-6">
            <Input
              type="text"
              placeholder="ex. 28"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              className="mb-4"
            />

            <div>
              <p className="text-sm text-gray-500 mb-2">Quick selections</p>
              <div className="flex gap-2">
                {[27, 28, 29, 30].map((days) => (
                  <Button
                    key={days}
                    variant={
                      cycleLength === days.toString() ? "default" : "outline"
                    }
                    className={`px-4 ${cycleLength === days.toString() ? "bg-gray-900" : ""}`}
                    onClick={() => setCycleLength(days.toString())}
                  >
                    {days}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold">Start over</h3>
            <p className="text-gray-600 text-sm mb-4">
              Reset the form with ease and begin anew with just one simple
              click.
            </p>
            <Button
              variant="outline"
              onClick={handleReset}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 border-0"
            >
              Reset
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

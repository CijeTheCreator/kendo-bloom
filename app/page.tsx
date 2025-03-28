"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DynamicBlob from "./components/dynamic-blob";
import FertilityTracker from "./components/fertility-cards";
import { getCyclePhase } from "@/utils/calculator";
import { useRouter } from "next/navigation";

// Days of the week
const DAYS_OF_WEEK = ["M", "T", "W", "T", "F", "S", "S"];

export default function PeriodTracker() {
  // Reference to the scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // State for the current date and selected date
  const [today] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date(today));
  const [visibleDates, setVisibleDates] = useState<Date[]>([]);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 21 });

  useEffect(() => {
    const onboarded = localStorage.getItem("onboarded");
    if (!(onboarded == "true")) router.push("/onboarding");
  }, []);

  const onboarded = localStorage.getItem("onboarded");
  if (onboarded != "true") return <div>Loading</div>;

  const lastPeriodISOString = localStorage.getItem("lastPeriod") as string;
  const lastPeriod = new Date(lastPeriodISOString);
  const cycleLength = parseInt(localStorage.getItem("cycleLength") as string);
  const periodLength = parseInt(localStorage.getItem("periodLength") as string);

  const { top, bottom } = getCyclePhase(
    lastPeriod,
    cycleLength,
    periodLength,
    selectedDate,
  );

  // Format the selected date for display
  const formattedSelectedDate = `${selectedDate.getDate()} ${selectedDate.toLocaleString("default", { month: "long" })}`;

  // Generate dates for the calendar
  const generateDates = useCallback(
    (startOffset: number, count: number) => {
      const dates: Date[] = [];
      const startDate = new Date(today);
      startDate.setDate(startDate.getDate() + startOffset);

      for (let i = 0; i < count; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date);
      }

      return dates;
    },
    [today],
  );

  // Initialize visible dates
  useEffect(() => {
    const initialDates = generateDates(-10, 30); // Start 10 days before today, show 30 days
    setVisibleDates(initialDates);
  }, [generateDates]);

  // Handle scroll to load more dates
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const scrollEnd = scrollWidth - clientWidth;

    // If we're near the start, prepend more dates
    if (scrollLeft < 200 && visibleRange.start > -100) {
      const newStart = visibleRange.start - 10;
      const newDates = generateDates(newStart, 10);
      setVisibleDates((prev) => [...newDates, ...prev]);
      setVisibleRange((prev) => ({ start: newStart, end: prev.end }));

      // Maintain scroll position when adding to the beginning
      const currentScrollPos = scrollContainerRef.current.scrollLeft;
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = currentScrollPos + 400; // Approximate width of 10 date items
        }
      }, 0);
    }

    // If we're near the end, append more dates
    if (scrollLeft > scrollEnd - 200 && visibleRange.end < 100) {
      const newEnd = visibleRange.end + 10;
      const newDates = generateDates(visibleRange.end, 10);
      setVisibleDates((prev) => [...prev, ...newDates]);
      setVisibleRange((prev) => ({ start: prev.start, end: newEnd }));
    }
  }, [visibleRange, generateDates]);

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Scroll to today on initial load
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Find the index of today in the visible dates
      const todayIndex = visibleDates.findIndex(
        (date) =>
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear(),
      );

      if (todayIndex !== -1) {
        // Calculate position to scroll to (center today)
        const dateWidth = 80; // Approximate width of date item with spacing
        const containerWidth = scrollContainerRef.current.clientWidth;
        const scrollPosition =
          todayIndex * dateWidth - containerWidth / 2 + dateWidth / 2;

        scrollContainerRef.current.scrollLeft = Math.max(0, scrollPosition);
      }
    }
  }, [visibleDates, today]);

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  // Handle scroll buttons
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is tomorrow
  const isTomorrow = (date: Date) => {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()
    );
  };

  // Check if a date is selected
  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  if (!localStorage) {
    return <div>Loading</div>;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-pink-100">
      <DynamicBlob />

      <div className="relative z-10">
        <header className="flex justify-center items-center p-4">
          <h2 className="text-black text-lg font-bold">
            {formattedSelectedDate}
          </h2>
        </header>

        <div className="px-4 mt-2">
          <div className="relative mb-6">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 rounded-full p-1 shadow-sm hidden md:flex items-center justify-center"
              onClick={handleScrollLeft}
            >
              <ChevronLeft className="text-pink-500 h-5 w-5" />
            </button>

            <div
              id="calendar-scroll"
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-hide py-2 px-6 md:px-10 -mx-6 md:-mx-10 snap-x"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="flex space-x-8 md:space-x-12 min-w-max px-6">
                {visibleDates.map((date, index) => {
                  const dayOfWeek =
                    DAYS_OF_WEEK[date.getDay() === 0 ? 6 : date.getDay() - 1];
                  const dateNum = date.getDate();

                  return (
                    <div
                      key={`${date.toISOString()}-${index}`}
                      className="flex flex-col items-center snap-center"
                      onClick={() => handleDateSelect(date)}
                    >
                      <span className="text-xs text-gray-500 mb-2">
                        {dayOfWeek}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                          ${isToday(date) ? "bg-pink-400 text-white" : ""}
                          ${isTomorrow(date) ? "border border-dashed border-pink-400" : ""}
                          ${isSelected(date) && !isToday(date) ? "border-2 border-white shadow-lg" : ""}
                        `}
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
              onClick={handleScrollRight}
            >
              <ChevronRight className="text-pink-500 h-5 w-5" />
            </button>
          </div>

          <div className="text-center mt-12 mb-4">
            <p className="text-black text-lg">{top}</p>
            <h1 className="text-black text-4xl font-bold">{bottom}</h1>
          </div>

          <div className="flex justify-center mb-8">
            <Button
              variant="outline"
              className="bg-white text-pink-500 rounded-full px-6 py-2 font-medium"
            >
              Edit period dates
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-t-3xl pt-6 px-4 pb-20 min-h-screen">
          <h3 className="text-black font-medium text-lg mb-4">
            My daily insights - today
          </h3>

          <FertilityTracker
            date={selectedDate}
            top={top}
            bottom={bottom}
            setSelectedDate={setSelectedDate}
          />

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

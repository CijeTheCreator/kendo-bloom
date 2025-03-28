"use client";

import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Check, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { isToday, isTomorrow } from "@/utils/date_helpers";

export default function Logger({
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
  // const [activeTab, setActiveTab] = useState("today");
  const [searchTerm, setSearchTerm] = useState("");

  // State to track selected options
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [selectedFlow, setSelectedFlow] = useState<string[]>([]);
  const [selectedSexOptions, setSelectedSexOptions] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const formattedSelectedDate = `${date.getDate()} ${date.toLocaleString("default", { month: "long" })}`;

  const selections = useMemo(() => {
    return {
      selectedFeelings,
      selectedFlow,
      selectedSexOptions,
      selectedMoods,
      selectedSymptoms,
    };
  }, [
    selectedFeelings,
    selectedFlow,
    selectedSexOptions,
    selectedMoods,
    selectedSymptoms,
  ]);

  // Calculate total selections
  const totalSelections = useMemo(() => {
    return (
      selectedFeelings.length +
      selectedFlow.length +
      selectedSexOptions.length +
      selectedMoods.length +
      selectedSymptoms.length
    );
  }, [
    selectedFeelings,
    selectedFlow,
    selectedSexOptions,
    selectedMoods,
    selectedSymptoms,
  ]);

  // const normalizeDate = (date: Date) => new Date(date.setHours(0, 0, 0, 0));
  // Handle confirmation
  const handleConfirm = () => {
    // In a real app, this would save the selections to a database or state management
    localStorage.setItem(formattedSelectedDate, JSON.stringify(selections));
    alert(`Saved ${totalSelections} selections for today!`);
  };

  // Toggle selection handlers
  const toggleFeeling = (label: string) => {
    setSelectedFeelings((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const toggleFlow = (label: string) => {
    setSelectedFlow((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const toggleSexOption = (label: string) => {
    setSelectedSexOptions((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const toggleMood = (label: string) => {
    setSelectedMoods((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  const toggleSymptom = (label: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };

  // Define all options data
  const feelingOptions = [
    {
      emoji: "😌",
      label: "Calm",
      color: "bg-orange-100",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "🔋",
      label: "Fatigue",
      color: "bg-purple-100",
      borderColor: "border-purple-500",
      checkColor: "bg-purple-500",
    },
    {
      emoji: "⭕",
      label: "Cramps",
      color: "bg-pink-100",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      emoji: "🥥",
      label: "Acne",
      color: "bg-purple-50",
      borderColor: "border-purple-400",
      checkColor: "bg-purple-400",
    },
  ];

  const flowOptions = [
    {
      icon: "💧",
      label: "Light",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "💧💧",
      label: "Medium",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "💧💧💧",
      label: "Heavy",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "🩸",
      label: "Blood clots",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
  ];

  const sexOptions = [
    {
      icon: "🚫",
      label: "Didn't have sex",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "🛡️",
      label: "Protected sex",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "⚠️",
      label: "Unprotected sex",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "👄",
      label: "Oral sex",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "🐟",
      label: "Anal sex",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "✋",
      label: "Masturbation",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "👐",
      label: "Sensual touch",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "🧸",
      label: "Sex toys",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "💫",
      label: "Orgasm",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "📈",
      label: "High sex drive",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "⚖️",
      label: "Neutral sex drive",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "📉",
      label: "Low sex drive",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
  ];

  const moodOptions = [
    {
      emoji: "😌",
      label: "Calm",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "😊",
      label: "Happy",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "⚡",
      label: "Energetic",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "😜",
      label: "Frisky",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "🤔",
      label: "Mood swings",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "😠",
      label: "Irritated",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "😢",
      label: "Sad",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "😰",
      label: "Anxious",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "😞",
      label: "Depressed",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "😔",
      label: "Feeling guilty",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "🤯",
      label: "Obsessive thoughts",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "😴",
      label: "Low energy",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "😐",
      label: "Apathetic",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "🤨",
      label: "Confused",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
    {
      emoji: "😣",
      label: "Very self-critical",
      borderColor: "border-orange-500",
      checkColor: "bg-orange-500",
    },
  ];

  const symptomOptions = [
    {
      icon: "👍",
      label: "Everything is fine",
      color: "bg-purple-100",
      borderColor: "border-purple-500",
      checkColor: "bg-purple-500",
    },
    {
      icon: "⭕",
      label: "Cramps",
      color: "bg-pink-100",
      borderColor: "border-pink-500",
      checkColor: "bg-pink-500",
    },
    {
      icon: "🤒",
      label: "Fever",
      color: "bg-red-100",
      borderColor: "border-red-500",
      checkColor: "bg-red-500",
    },
    {
      icon: "🤢",
      label: "Nausea",
      color: "bg-green-100",
      borderColor: "border-green-500",
      checkColor: "bg-green-500",
    },
    {
      icon: "🤕",
      label: "Headache",
      color: "bg-blue-100",
      borderColor: "border-blue-500",
      checkColor: "bg-blue-500",
    },
    {
      icon: "😴",
      label: "Fatigue",
      color: "bg-purple-100",
      borderColor: "border-purple-500",
      checkColor: "bg-purple-500",
    },
  ];

  // Filter options based on search term
  const filteredFeelingOptions = useMemo(
    () =>
      feelingOptions.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );

  const filteredFlowOptions = useMemo(
    () =>
      flowOptions.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );

  const filteredSexOptions = useMemo(
    () =>
      sexOptions.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );

  const filteredMoodOptions = useMemo(
    () =>
      moodOptions.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );

  const filteredSymptomOptions = useMemo(
    () =>
      symptomOptions.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm],
  );

  // Check if any section has matching results
  const hasResults = useMemo(() => {
    return (
      filteredFeelingOptions.length > 0 ||
      filteredFlowOptions.length > 0 ||
      filteredSexOptions.length > 0 ||
      filteredMoodOptions.length > 0 ||
      filteredSymptomOptions.length > 0
    );
  }, [
    filteredFeelingOptions,
    filteredFlowOptions,
    filteredSexOptions,
    filteredMoodOptions,
    filteredSymptomOptions,
  ]);

  return (
    <div className="flex justify-center min-h-screen  pb-24">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl  min-h-screen md:my-8 md:min-h-0 md:rounded-xl md:shadow-lg overflow-hidden relative">
        {/* App header */}
        <div className="bg-pink-50 p-4 rounded-b-3xl shadow-sm">
          <div className="flex justify-between items-center">
            <button className="p-2">
              <ChevronLeft
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  const previousDate = new Date(date);
                  previousDate.setDate(previousDate.getDate() - 1);
                  setSelectedDate(previousDate);
                }}
              />
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold">
                {isToday(date)
                  ? "Today"
                  : isTomorrow(date)
                    ? "Tomorrow"
                    : formattedSelectedDate}
              </h1>
              <p className="text-sm text-gray-500">{`${top} ${bottom}`}</p>
            </div>
            <button className="p-2">
              <ChevronRight
                className="w-6 h-6 text-gray-700 cursor-pointer"
                onClick={() => {
                  const nextDate = new Date(date);
                  nextDate.setDate(nextDate.getDate() + 1);
                  setSelectedDate(nextDate);
                }}
              />
            </button>
          </div>

          {/* Search bar */}
          <div className="mt-4 relative">
            <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent w-full outline-none text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-4 space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          {/* No results message */}
          {searchTerm && !hasResults && (
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-500">No matching options found</p>
            </div>
          )}

          {/* Feeling section */}
          {(!searchTerm || filteredFeelingOptions.length > 0) && (
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h2 className="text-lg font-bold mb-4">
                What are you feeling today?
              </h2>
              <div className="grid grid-cols-4 gap-2">
                {filteredFeelingOptions.map((option, index) => (
                  <FeelingOption
                    key={index}
                    emoji={option.emoji}
                    label={option.label}
                    color={option.color}
                    borderColor={option.borderColor}
                    checkColor={option.checkColor}
                    isSelected={selectedFeelings.includes(option.label)}
                    onClick={() => toggleFeeling(option.label)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Categories section */}
          {(!searchTerm || filteredFlowOptions.length > 0) && (
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-xl font-bold">Categories</h2>
                <button className="text-pink-500 font-medium">Edit</button>
              </div>

              {/* Menstrual flow */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-1">Menstrual flow</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Estimate your average daily flow
                </p>
                <div className="flex flex-wrap gap-2">
                  {filteredFlowOptions.map((option, index) => (
                    <FlowOption
                      key={index}
                      icon={option.icon}
                      label={option.label}
                      borderColor={option.borderColor}
                      checkColor={option.checkColor}
                      isSelected={selectedFlow.includes(option.label)}
                      onClick={() => toggleFlow(option.label)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sex and sex drive */}
          {(!searchTerm || filteredSexOptions.length > 0) && (
            <div className="bg-white p-4 rounded-xl shadow-sm md:col-span-2">
              <h3 className="text-lg font-bold mb-3">Sex and sex drive</h3>
              <div className="flex flex-wrap gap-2">
                {filteredSexOptions.map((option, index) => (
                  <SexOption
                    key={index}
                    icon={option.icon}
                    label={option.label}
                    borderColor={option.borderColor}
                    checkColor={option.checkColor}
                    isSelected={selectedSexOptions.includes(option.label)}
                    onClick={() => toggleSexOption(option.label)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Mood section */}
          {(!searchTerm || filteredMoodOptions.length > 0) && (
            <div className="bg-white p-4 rounded-xl shadow-sm md:col-span-2">
              <h3 className="text-lg font-bold mb-3">Mood</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {filteredMoodOptions.map((option, index) => (
                  <MoodOption
                    key={index}
                    emoji={option.emoji}
                    label={option.label}
                    borderColor={option.borderColor}
                    checkColor={option.checkColor}
                    isSelected={selectedMoods.includes(option.label)}
                    onClick={() => toggleMood(option.label)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Symptoms section */}
          {(!searchTerm || filteredSymptomOptions.length > 0) && (
            <div className="bg-white p-4 rounded-xl shadow-sm md:col-span-2">
              <h3 className="text-lg font-bold mb-3">Symptoms</h3>
              <div className="flex flex-wrap gap-2">
                {filteredSymptomOptions.map((option, index) => (
                  <SymptomOption
                    key={index}
                    icon={option.icon}
                    label={option.label}
                    color={option.color}
                    borderColor={option.borderColor}
                    checkColor={option.checkColor}
                    isSelected={selectedSymptoms.includes(option.label)}
                    onClick={() => toggleSymptom(option.label)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm button */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 bg-white border-t border-gray-200 ">
          <button
            onClick={handleConfirm}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium shadow-md transition-all",
              totalSelections > 0
                ? "bg-pink-500 hover:bg-pink-600"
                : "bg-gray-400",
            )}
            disabled={totalSelections === 0}
          >
            <Save className="w-5 h-5" />
            Save {totalSelections > 0 && `(${totalSelections})`}
          </button>
        </div>
      </div>
    </div>
  );
}

function FeelingOption({
  emoji,
  label,
  color,
  borderColor,
  checkColor,
  isSelected,
  onClick,
}: {
  emoji: string;
  label: string;
  color: string;
  borderColor: string;
  checkColor: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-1 relative",
          color,
          isSelected && `border-2 ${borderColor}`,
        )}
      >
        <span className="text-2xl">{emoji}</span>
        {isSelected && (
          <div
            className={cn(
              "absolute -bottom-1 -right-1 rounded-full p-0.5",
              checkColor,
            )}
          >
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
}

function FlowOption({
  icon,
  label,
  borderColor,
  checkColor,
  isSelected,
  onClick,
}: {
  icon: string;
  label: string;
  borderColor: string;
  checkColor: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "bg-pink-100 text-pink-900 px-4 py-2 rounded-full flex items-center gap-2 relative",
        isSelected && `border-2 ${borderColor}`,
      )}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{label}</span>
      {isSelected && (
        <div
          className={cn(
            "absolute -bottom-1 -right-1 rounded-full p-0.5",
            checkColor,
          )}
        >
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </button>
  );
}

function SexOption({
  icon,
  label,
  borderColor,
  checkColor,
  isSelected,
  onClick,
}: {
  icon: string;
  label: string;
  borderColor: string;
  checkColor: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "bg-pink-100 text-pink-900 px-4 py-2 rounded-full flex items-center gap-2 relative",
        isSelected && `border-2 ${borderColor}`,
      )}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{label}</span>
      {isSelected && (
        <div
          className={cn(
            "absolute -bottom-1 -right-1 rounded-full p-0.5",
            checkColor,
          )}
        >
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </button>
  );
}

function MoodOption({
  emoji,
  label,
  borderColor,
  checkColor,
  isSelected,
  onClick,
}: {
  emoji: string;
  label: string;
  borderColor: string;
  checkColor: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "bg-orange-100 text-orange-900 px-3 py-2 rounded-full flex items-center gap-2 relative",
        isSelected && `border-2 ${borderColor}`,
      )}
      onClick={onClick}
    >
      <span className="text-xl">{emoji}</span>
      <span className="text-sm">{label}</span>
      {isSelected && (
        <div
          className={cn(
            "absolute -bottom-1 -right-1 rounded-full p-0.5",
            checkColor,
          )}
        >
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </button>
  );
}

function SymptomOption({
  icon,
  label,
  color,
  borderColor,
  checkColor,
  isSelected,
  onClick,
}: {
  icon: string;
  label: string;
  color: string;
  borderColor: string;
  checkColor: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-full flex items-center gap-2 relative",
        color,
        isSelected && `border-2 ${borderColor}`,
      )}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{label}</span>
      {isSelected && (
        <div
          className={cn(
            "absolute -bottom-1 -right-1 rounded-full p-0.5",
            checkColor,
          )}
        >
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </button>
  );
}

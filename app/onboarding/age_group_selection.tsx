"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AgeGroupSelection() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleNext = () => {
    // In a real app, this would navigate to the next question
    console.log("Selected age group:", selectedAge);
    alert("Moving to question 2/3");
  };

  return (
    <div className="flex flex-col items-center h-screen bg-white">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl px-6 py-8 flex flex-col h-full">
        {/* Progress bar */}
        <div className="w-full mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-gray-500">1 of 3</span>
            <span className="text-xs text-gray-500">Onboarding</span>
          </div>
          <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
            <div className="bg-black h-full w-1/3" />
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <span className="text-3xl font-cursive font-bold">Flo</span>
            <Image
              src="/images/droplet.png"
              alt="Flo logo"
              width={24}
              height={24}
              className="ml-1"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          What's your age group?
        </h1>

        {/* Age group grid - centered on larger screens */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 flex-1 mb-4 md:w-4/5 lg:w-3/4 mx-auto">
          <AgeGroupCard
            age="18-25"
            imageSrc="/placeholder.svg?height=120&width=120"
            bgColor="bg-pink-500"
            isSelected={selectedAge === "18-25"}
            onClick={() => setSelectedAge("18-25")}
          />
          <AgeGroupCard
            age="26-35"
            imageSrc="/placeholder.svg?height=120&width=120"
            bgColor="bg-purple-300"
            isSelected={selectedAge === "26-35"}
            onClick={() => setSelectedAge("26-35")}
          />
          <AgeGroupCard
            age="36-44"
            imageSrc="/placeholder.svg?height=120&width=120"
            bgColor="bg-teal-200"
            isSelected={selectedAge === "36-44"}
            onClick={() => setSelectedAge("36-44")}
          />
          <AgeGroupCard
            age="45+"
            imageSrc="/placeholder.svg?height=120&width=120"
            bgColor="bg-purple-500"
            isSelected={selectedAge === "45+"}
            onClick={() => setSelectedAge("45+")}
          />
        </div>

        {/* Under 18 option */}
        <div className="text-center mb-6">
          <button
            className={`text-gray-800 hover:underline ${selectedAge === "Under 18" ? "font-bold" : ""}`}
            onClick={() => setSelectedAge("Under 18")}
          >
            Under 18
          </button>
        </div>

        {/* Next button - centered and with max-width on larger screens */}
        <div className="mt-auto pt-4 md:w-2/3 lg:w-1/2 mx-auto">
          <Button
            className="w-full py-6 text-lg rounded-xl bg-black hover:bg-gray-800 text-white"
            onClick={handleNext}
            disabled={!selectedAge}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

interface AgeGroupCardProps {
  age: string;
  imageSrc: string;
  bgColor: string;
  isSelected?: boolean;
  onClick: () => void;
}

function AgeGroupCard({
  age,
  imageSrc,
  bgColor,
  isSelected,
  onClick,
}: AgeGroupCardProps) {
  return (
    <button
      onClick={onClick}
      className={`block w-full ${isSelected ? "ring-2 ring-black" : ""} rounded-lg overflow-hidden`}
    >
      <div className="flex flex-col overflow-hidden rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors h-full">
        <div className="bg-black flex-1 flex justify-center">
          <div
            className={`w-full aspect-square relative flex items-center justify-center ${bgColor}`}
          >
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={`Age group ${age}`}
              width={120}
              height={120}
              className="mix-blend-multiply md:scale-125 lg:scale-150"
            />
          </div>
        </div>
        <div className="p-3 md:p-4 text-center font-medium md:text-lg">
          {age}
        </div>
      </div>
    </button>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useRouter } from "next/navigation";

// Define the user type and onboarding steps
type UserType = "unknown" | "woman" | "man";
type OnboardingStep =
  | "initial"
  | "age"
  | "period-date"
  | "cycle-length"
  | "period-duration"
  | "partner-code"
  | "processing"
  | "welcome";

export default function OnboardingFlow() {
  // State management
  const router = useRouter();
  useEffect(() => {
    const onboarded = localStorage.getItem("onboarded") == "true";
    if (onboarded) router.push("/");
  });
  const [userType, setUserType] = useState<UserType>("unknown");
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("initial");
  const [progress, setProgress] = useState(0);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | undefined>(
    undefined,
  );
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodDuration, setPeriodDuration] = useState<number>(5);
  const [partnerCode, setPartnerCode] = useState<string>("");
  const [, setShowWelcome] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Update progress based on current step
  useEffect(() => {
    if (userType === "woman") {
      switch (currentStep) {
        case "initial":
          setProgress(0);
          break;
        case "age":
          setProgress(25);
          break;
        case "period-date":
          setProgress(50);
          break;
        case "cycle-length":
          setProgress(75);
          break;
        case "period-duration":
          setProgress(100);
          break;
        case "welcome":
          setProgress(100);
          break;
      }
    } else if (userType === "man") {
      switch (currentStep) {
        case "initial":
          setProgress(0);
          break;
        case "partner-code":
          setProgress(50);
          break;
        case "processing":
          setProgress(100);
          break;
        case "welcome":
          setProgress(100);
          break;
      }
    }
  }, [currentStep, userType]);

  // Handle next button click
  const handleNext = () => {
    if (currentStep === "initial") {
      if (userType === "woman") {
        setCurrentStep("age");
      } else if (userType === "man") {
        setCurrentStep("partner-code");
      }
    } else if (currentStep === "age" && userType === "woman") {
      setCurrentStep("period-date");
    } else if (currentStep === "period-date" && userType === "woman") {
      setCurrentStep("cycle-length");
    } else if (currentStep === "cycle-length" && userType === "woman") {
      setCurrentStep("period-duration");
    } else if (currentStep === "period-duration" && userType === "woman") {
      //Wonam
      localStorage.setItem("lastPeriod", lastPeriodDate?.toISOString() || "");
      localStorage.setItem("cycleLength", `${cycleLength}`);
      localStorage.setItem("periodLength", `${periodDuration}`);
      localStorage.setItem("onboarded", "true");
      router.push("/");
      showWelcomeScreen();
    } else if (currentStep === "partner-code" && userType === "man") {
      //Man
      setCurrentStep("processing");
      // Simulate processing
      setTimeout(() => {
        showWelcomeScreen();
      }, 2000);
    }
  };

  // Show welcome screen and fade out
  const showWelcomeScreen = () => {
    setCurrentStep("welcome");
    setShowWelcome(true);

    // Fade out after showing welcome
    setTimeout(() => {
      setFadeOut(true);
    }, 3000);
  };

  // Check if next button should be disabled
  const isNextDisabled = () => {
    if (currentStep === "initial") return userType === "unknown";
    if (currentStep === "age") return !selectedAge;
    if (currentStep === "period-date") return !lastPeriodDate;
    if (currentStep === "partner-code") return partnerCode.length < 6;
    return false;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col items-center h-screen bg-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl px-6 py-8 flex flex-col h-full">
          {/* Progress bar */}
          <div className="w-full mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-xs text-gray-500">
                {userType === "woman"
                  ? `${currentStep === "initial" ? "1" : currentStep === "age" ? "1" : currentStep === "period-date" ? "2" : currentStep === "cycle-length" ? "3" : "4"} of 4`
                  : `${currentStep === "initial" ? "1" : "2"} of 2`}
              </span>
              <span className="text-xs text-gray-500">Onboarding</span>
            </div>
            <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
              <motion.div
                className="bg-black h-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Content area - conditionally render based on step */}
          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {/* Initial Step - Ask if user has partner code */}
              {currentStep === "initial" && (
                <motion.div
                  key="initial"
                  className="flex flex-col items-center justify-center flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                    Do you have a partner code?
                  </h1>
                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3 lg:w-1/2">
                    <Button
                      className={`py-6 text-lg rounded-xl ${userType === "man" ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
                      onClick={() => setUserType("man")}
                    >
                      Yes
                    </Button>
                    <Button
                      className={`py-6 text-lg rounded-xl ${userType === "woman" ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
                      onClick={() => setUserType("woman")}
                    >
                      No
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Age Step */}
              {currentStep === "age" && (
                <motion.div
                  key="age"
                  className="flex-1 flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                    What&apos;s your age group?
                  </h1>

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

                  <div className="text-center mb-6">
                    <button
                      className={`text-gray-800 hover:underline ${selectedAge === "Under 18" ? "font-bold" : ""}`}
                      onClick={() => setSelectedAge("Under 18")}
                    >
                      Under 18
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Period Date Step */}
              {currentStep === "period-date" && (
                <motion.div
                  key="period-date"
                  className="flex-1 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                    When was your last period?
                  </h1>

                  <div className="w-full max-w-md">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal py-6 text-lg",
                            !lastPeriodDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {lastPeriodDate ? (
                            format(lastPeriodDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={lastPeriodDate}
                          onSelect={setLastPeriodDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </motion.div>
              )}

              {/* Cycle Length Step */}
              {currentStep === "cycle-length" && (
                <motion.div
                  key="cycle-length"
                  className="flex-1 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                    How long is your cycle?
                  </h1>

                  <div className="w-full max-w-md flex flex-col items-center">
                    <div className="flex items-center justify-center w-full mb-6">
                      <Button
                        variant="outline"
                        className="h-12 w-12 rounded-full text-xl"
                        onClick={() =>
                          setCycleLength((prev) => Math.max(21, prev - 1))
                        }
                      >
                        -
                      </Button>
                      <div className="mx-8 text-4xl font-bold">
                        {cycleLength}
                      </div>
                      <Button
                        variant="outline"
                        className="h-12 w-12 rounded-full text-xl"
                        onClick={() =>
                          setCycleLength((prev) => Math.min(35, prev + 1))
                        }
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-center text-gray-500 mb-4">
                      Average cycle is 28 days
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Period Duration Step */}
              {currentStep === "period-duration" && (
                <motion.div
                  key="period-duration"
                  className="flex-1 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                    How many days does your period usually last?
                  </h1>

                  <div className="w-full max-w-md flex flex-col items-center">
                    <div className="flex items-center justify-center w-full mb-6">
                      <Button
                        variant="outline"
                        className="h-12 w-12 rounded-full text-xl"
                        onClick={() =>
                          setPeriodDuration((prev) => Math.max(2, prev - 1))
                        }
                      >
                        -
                      </Button>
                      <div className="mx-8 text-4xl font-bold">
                        {periodDuration}
                      </div>
                      <Button
                        variant="outline"
                        className="h-12 w-12 rounded-full text-xl"
                        onClick={() =>
                          setPeriodDuration((prev) => Math.min(10, prev + 1))
                        }
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-center text-gray-500 mb-4">
                      Average period lasts 3-7 days
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Partner Code Step */}
              {currentStep === "partner-code" && (
                <motion.div
                  key="partner-code"
                  className="flex-1 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                    Enter your partner code
                  </h1>

                  <div className="w-full max-w-md">
                    <Input
                      className="text-center text-xl py-6"
                      placeholder="Enter 6-digit code"
                      value={partnerCode}
                      onChange={(e) => setPartnerCode(e.target.value)}
                      maxLength={6}
                    />
                  </div>
                </motion.div>
              )}

              {/* Processing Step */}
              {currentStep === "processing" && (
                <motion.div
                  key="processing"
                  className="flex-1 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Loader2 className="h-16 w-16 animate-spin text-black mb-4" />
                  <h2 className="text-xl font-medium">
                    Connecting with partner...
                  </h2>
                </motion.div>
              )}

              {/* Welcome Step */}
              {currentStep === "welcome" && (
                <motion.div
                  key="welcome"
                  className="flex-1 flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                      Welcome to Bloom
                    </h1>
                    <p className="text-xl text-center text-gray-600">
                      Your journey begins now
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Next button - only show if not on welcome or processing screen */}
          {currentStep !== "welcome" && currentStep !== "processing" && (
            <div className="mt-auto pt-4 md:w-2/3 lg:w-1/2 mx-auto">
              <Button
                className="w-full py-6 text-lg rounded-xl bg-black hover:bg-gray-800 text-white"
                onClick={handleNext}
                disabled={isNextDisabled()}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
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

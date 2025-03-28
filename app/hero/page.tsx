import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function BloomHero() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-pink-500"
          >
            <path d="M12 2a9.96 9.96 0 0 0 7.5 3 10 10 0 0 1-7.5 13 10 10 0 0 1-7.5-13A9.96 9.96 0 0 0 12 2Z" />
            <path d="M12 8c2.1 0 4 .8 5.4 2.1" />
          </svg>
          <span className="text-2xl font-bold text-pink-600">Bloom</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-800 leading-tight">
              Empowering women through better health tracking
            </h1>
            <p className="text-lg text-pink-700 md:pr-12">
              Track your cycle, understand your body, and make informed health
              decisions with a clean, ad-free experience designed with your
              privacy in mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 text-lg rounded-full">
                Get Started
              </Button>
              <Button
                variant="outline"
                className="border-pink-200 text-pink-700 hover:bg-pink-100 px-8 py-6 text-lg rounded-full"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/80 to-pink-400/80 rounded-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="https://img.freepik.com/free-photo/women-s-health-women-s-healthcare-concept-with-uterus_185193-110010.jpg"
                alt="Bloom app interface"
                width={400}
                height={500}
                className="rounded-xl shadow-lg max-w-[80%] border-4 border-white"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-100 rounded-full opacity-70"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-100 rounded-full opacity-70"></div>
          </div>
        </div>

        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pink-800 mb-4">
              Why Choose Bloom?
            </h2>
            <p className="text-pink-700 max-w-2xl mx-auto">
              We&apos;re committed to providing accurate, accessible
              reproductive health information for all women.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-pink-100">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-pink-500"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">
                Privacy-Focused
              </h3>
              <p className="text-pink-700">
                Your health data stays private. No ads, no data selling, just
                the tools you need.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-pink-100">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-pink-500"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">
                Accessible Information
              </h3>
              <p className="text-pink-700">
                Clear, accurate health information designed for all women,
                regardless of background.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-pink-100">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-pink-500"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pink-800 mb-2">
                Science-Backed
              </h3>
              <p className="text-pink-700">
                All information is medically reviewed and based on the latest
                research.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

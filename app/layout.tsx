"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@progress/kendo-theme-default/dist/all.css";

import Link from "next/link";
import { Tooltip } from "@progress/kendo-react-tooltip";

import { Button } from "@progress/kendo-react-buttons";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col bg-gray-100 relative">
          <AppBar className="sticky top-0 z-20" themeColor="light">
            <AppBarSection>
              <Link href="/" className="flex items-center group">
                <span className="flex items-center text-xl font-semibold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent group-hover:from-pink-700 group-hover:to-pink-900 transition-all duration-200">
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
                    className="text-pink-500 gap-2"
                  >
                    <path d="M12 2a9.96 9.96 0 0 0 7.5 3 10 10 0 0 1-7.5 13 10 10 0 0 1-7.5-13A9.96 9.96 0 0 0 12 2Z" />
                    <path d="M12 8c2.1 0 4 .8 5.4 2.1" />
                  </svg>
                  Bloom
                </span>
              </Link>
              <Tooltip
                anchorElement="target"
                position="bottom"
                content={() => document.title}
              ></Tooltip>
            </AppBarSection>

            <AppBarSpacer />

            <AppBarSection>
              {/* Help and AI controls in the top AppBar */}
              <Tooltip
                anchorElement="target"
                position="bottom"
                content={() => "View help documentation"}
              >
                <Link href={"/data"}>
                  <Button
                    themeColor="base"
                    onClick={() => console.log("")}
                    icon="question-circle"
                    className="k-button-md mr-2"
                    title="Show Help"
                  >
                    My Data
                  </Button>
                </Link>
              </Tooltip>

              <Tooltip
                anchorElement="target"
                position="bottom"
                content={() =>
                  "Hide AI Assistant sidebar (⌘A on Mac, Ctrl+A on Windows/Linux)"
                }
              >
                <Link href={"/bloom-ai"}>
                  <Button
                    themeColor="base"
                    onClick={() => console.log("")}
                    icon={"collapse"}
                    className="k-button-md mr-3"
                    title={"Show AI Assistant (⌘A)"}
                  >
                    <p>Bloom AI</p>
                  </Button>
                </Link>
              </Tooltip>

              <Tooltip
                anchorElement="target"
                position="bottom"
                content={() => "View help documentation"}
              >
                <Link href={"/partner"}>
                  <Button
                    themeColor="base"
                    onClick={() => console.log("")}
                    icon="question-circle"
                    className="k-button-md mr-2"
                    title="Show Help"
                  >
                    Partner
                  </Button>
                </Link>
              </Tooltip>
              {/* <UserProfile /> */}
            </AppBarSection>
          </AppBar>
          {children}
        </div>
      </body>
    </html>
  );
}

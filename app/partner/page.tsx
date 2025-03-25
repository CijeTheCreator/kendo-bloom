"use client";

import { Button } from "@progress/kendo-react-buttons";

export default function PartnerPairingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 max-w-md mx-auto">
      <div className="w-full space-y-6 text-center">
        <h2 className="text-xl font-medium text-gray-900">Partner</h2>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF9E80] via-[#FF4081] to-[#9C27B0] text-transparent bg-clip-text">
          Flo for Partners
        </h1>

        <div className="space-y-4 mt-8">
          <h3 className="text-2xl font-bold text-gray-900">
            Share your pairing code
          </h3>

          <p className="text-gray-600 text-lg">
            Your partner will receive a link to download the Flo app. He'll then
            use the code to pair your profiles.
          </p>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 mt-6">
          <p className="text-4xl font-bold text-gray-900">B9DUN3</p>
        </div>

        <Button className="w-full py-6 text-xl rounded-full bg-[#FF5A79] hover:bg-[#FF4067] mt-6">
          Send pairing code
        </Button>

        <p className="text-gray-600 mt-4">
          Your personal data is important. Only share it with a trusted,
          responsible partner.
        </p>

        <button className="text-gray-500 mt-16">Cancel invite</button>
      </div>
    </div>
  );
}

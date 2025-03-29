"use client";
import React, { useState } from "react";
import { QRCode } from "@/components/ui/qr-code";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const QRGeneratorPage = () => {
  const [url, setUrl] = useState("https://docs.google.com/forms/d/e/1FAIpQLScw3spz_Z48Pm6icmXdid5ougRYNaoM_1WRTKN2Vu2AHsSK-g/viewform?usp=dialog");
  const [size, setSize] = useState(200);
  const [gradient, setGradient] = useState(true);
  const [gradientColors, setGradientColors] = useState(
    "from-purple-500 to-pink-500"
  );

  // Predefined gradient options
  const gradientOptions = [
    { name: "Purple to Pink", value: "from-purple-500 to-pink-500" },
    { name: "Blue to Indigo", value: "from-blue-500 to-indigo-700" },
    { name: "Green to Teal", value: "from-green-500 to-teal-500" },
    { name: "Yellow to Orange", value: "from-yellow-500 to-orange-500" },
    { name: "Red to Pink", value: "from-red-500 to-pink-500" },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Google Form QR Code Generator
        </h1>
        <p className="text-gray-500 mb-8">
          Generate a QR code that links to your Google Form
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* QR Code Preview */}
          <div className="flex justify-center items-center">
            <QRCode
              value={url}
              size={size}
              title="Your Google Form QR Code"
              gradient={gradient}
              gradientColors={gradientColors}
            />
          </div>

          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Customize Your QR Code</CardTitle>
              <CardDescription>
                Adjust the settings to create your perfect QR code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Google Form URL
                </label>
                <Input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter Google Form link"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size: {size}px
                </label>
                <input
                  type="range"
                  min="100"
                  max="300"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="gradient-toggle"
                  checked={gradient}
                  onChange={(e) => setGradient(e.target.checked)}
                  className="mr-2"
                />
                <label
                  htmlFor="gradient-toggle"
                  className="text-sm font-medium text-gray-700"
                >
                  Use Gradient Background
                </label>
              </div>

              {gradient && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gradient Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {gradientOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setGradientColors(option.value)}
                        className={`p-2 rounded-md text-xs text-white bg-gradient-to-br ${option.value} ${
                          gradientColors === option.value
                            ? "ring-2 ring-offset-2 ring-purple-500"
                            : ""
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => {
                  alert("QR Code generated! Download feature coming soon.");
                }}
              >
                Download QR Code
              </Button>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default QRGeneratorPage;

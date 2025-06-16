// app/faq/page.tsx or components/FAQ.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react"; // or use Heroicons if preferred
import Navbar from "@/components/Navbar/Navbar";
import NavSecond from "@/components/Navbar/NavSecond";

const faqs = [
  {
    question: "What is this platform about?",
    answer:
      "Our platform provides comprehensive market analysis tools for crypto, stocks, and commodities.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We use top-tier encryption and follow strict data protection policies to keep your information safe.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel anytime from your account settings without any additional charges.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Absolutely! We offer a 7-day free trial with access to all premium features.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach our support team through the Help Center or by emailing support@example.com.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />
      <NavSecond />
      <div className="mt-12 w-full  pt-12 text-white">
        <div
          className=" px-8 relative flex flex-col items-center justify-center h-[90vh]    bg-cover bg-center w-full "
          style={{
            backgroundImage: "url('/assets/faq-bg.jpg')", // Replace with your image path
          }}
        >
          <div className="absolute inset-0 bg-black opacity-80 z-10"></div>

          <h1 className="text-3xl font-bold text-center mb-1 z-20">FAQ</h1>
          <p className="text-center z-20">Home - Faqs</p>
        </div>
        <div className="flex flex-col items-center w-full ">
          {/* <h1 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h1> */}
          <div className="space-y-4 w-8/12 py-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer"
              >
                <button
                  className="flex items-center justify-between w-full px-4 py-3 text-left bg-white hover:bg-gray-50 transition"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-4 text-gray-700 text-sm bg-gray-50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

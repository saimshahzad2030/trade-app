"use client";
import React from "react";
import { Check, Crown } from "lucide-react";

const plans = [
  {
    title: "Basic",
    price: "$0",
    benefits: ["Access to free content", "Community support", "Limited tools"],
    icon: null,
    featured: false,
  },
  {
    title: "Silver",
    price: "$4.99/mo",
    benefits: ["Everything in Basic", "Basic analytics", "Priority support"],
    icon: null,
    featured: false,
  },
  {
    title: "Pro",
    price: "$9.99/mo",
    benefits: [
      "Everything in Intermediate",
      "Advanced analytics",
      "Priority support",
    ],
    icon: null,
    featured: false,
  },
  {
    title: "Premium",
    price: "$19.99/mo",
    benefits: [
      "Everything in Pro",
      "Exclusive content",
      "One-on-one support",
      "Early access to new features",
    ],
    icon: <Crown className="w-6 h-6 text-yellow-500" />,
    featured: true,
  },
];
const PremiumContent = () => {
  return (
    <div className="py-12 px-4  w-full  ">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">
        Choose Your Plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={`rounded-2xl p-6 shadow-lg    bg-[#09090f] text-white flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                {plan.icon}
                <h3 className="text-xl font-semibold">{plan.title}</h3>
              </div>
              <p className="text-2xl font-bold mb-4">{plan.price}</p>
              <ul className="space-y-2">
                {plan.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="text-gray-600 flex items-start gap-2"
                  >
                    <Check className="w-4 h-4 text-green-500 mt-1" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <button className="cursor-pointer mt-6 bg-none border border-[var(--variant-4)]  text-[var(--variant-4)] py-2 rounded-xl hover:bg-[var(--variant-4)] hover:text-white transition-all duration-500">
              {plan.title == "Basic"
                ? "Already Selected"
                : plan.featured
                ? "Go Premium"
                : "Select Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumContent;

"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 10000,
    suffix: "k+",
    label: "Healthy Clients",
  },
  {
    value: 95,
    suffix: "%",
    label: "Successful Rate",
  },
  {
    value: 50,
    suffix: "+",
    label: "Expert Consultants",
  },
  {
    value: 7,
    suffix: "+",
    label: "Healthcare Awards",
  },
];

const Counter = ({ end, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!start) return;

    let startValue = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      startValue += increment;

      if (startValue >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(startValue));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [start, end]);

  return (
    <h3
      ref={ref}
      className="text-4xl sm:text-5xl font-bold tracking-tight"
    >
      {suffix === "k+"
        ? `${Math.floor(count / 1000)}k+`
        : `${count}${suffix}`}
    </h3>
  );
};

const StatsSection = () => {
  return (
    <div className="w-full bg-emerald-900 text-white py-12 px-6 sm:px-12 lg:px-16 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto">

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center divide-x divide-emerald-800/60">

          {stats.map((stat, index) => (
            <div
              key={index}
              className={`space-y-2 ${index !== 0 ? "pl-4" : ""}`}
            >
              <Counter end={stat.value} suffix={stat.suffix} />

              <p className="text-xs sm:text-sm font-medium text-emerald-200/80 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-[11px] text-emerald-300/60 mt-8 font-medium tracking-wide">
          Based on real clinical outcomes across verified partner hospital
          networks and diagnostics.
        </p>
      </div>
    </div>
  );
};

export default StatsSection;
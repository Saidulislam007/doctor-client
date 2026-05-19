"use client";

import { useState, useEffect, useRef } from "react";

export default function AnimatedRating({ targetValue }) {
  const [currentValue, setCurrentValue] = useState(0.0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        // ইউজার স্ক্রল করে সেকশনে আসলে এবং আগে অ্যানিমেশন না হয়ে থাকলে
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startTime = null;
          const duration = 1500; // ১.৫ সেকেন্ড করলে অ্যানিমেশনটি আরও নিখুঁতভাবে চোখে পড়বে
          const startValue = 0.0;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Smooth Ease-Out Cubic Formula
            const easeOutCubic = 1 - Math.pow(1 - percentage, 3);
            const nextValue = startValue + (targetValue - startValue) * easeOutCubic;

            setCurrentValue(nextValue);

            if (percentage < 1) {
              requestAnimationFrame(animate);
            } else {
              setCurrentValue(targetValue); // শেষ মূহূর্তে নিখুঁত টার্গেট ভ্যালু সেট নিশ্চিত করা
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { 
        threshold: 0.01, // এলিমেন্টের মাত্র ১% স্ক্রিনে দেখা গেলেই যেন অ্যানিমেশন শুরু হয়
        rootMargin: "0px 0px -50px 0px" // স্ক্রিনের নিচ থেকে ৫০ পিক্সেল ওপরে আসলেই ট্রিগার হবে
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetValue]);

  return (
    // ফিক্সড: inline-block ব্যবহার করায় ব্রাউজার এখন পারফেক্টলি এলিমেন্ট ডিটেক্ট করতে পারবে
    // এবং কাঁপাকাঁপি বন্ধ করতে ও ক্ল্যাশ এড়াতে transition ক্লাসগুলো সরিয়ে নেওয়া হয়েছে
    <span 
      ref={elementRef} 
      className="inline-block tabular-nums min-w-[24px] text-left"
    >
      {currentValue.toFixed(1)}
    </span>
  );
}
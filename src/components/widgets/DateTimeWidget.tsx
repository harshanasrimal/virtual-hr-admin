import { CalenderIcon } from "../../icons";
import { useEffect, useState } from "react";

export default function DateTimeWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-between w-full">
          {/* Icon and Date */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <CalenderIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-800 dark:text-white/90">
                {formattedDate}
              </div>
              <div className="text-sm text-gray-500 dark:text-white/70">
                {formattedTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

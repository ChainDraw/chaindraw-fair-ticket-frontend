import { getCountdown } from "@/utils/common";
import React, { useState, useEffect } from "react";

const CountdownComponent = ({ targetTime }: { targetTime: number }) => {
  const [countdown, setCountdown] = useState(() => getCountdown(targetTime));

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdown = getCountdown(targetTime);
      if (newCountdown) {
        setCountdown(newCountdown);
      } else {
        clearInterval(interval);
        setCountdown(undefined);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);
  return (
    <div>
      {countdown ? (
        <div>
          <p>Deadline:</p>
          <p>{`Days: ${countdown[0]}, Hours: ${countdown[1]}, Minutes: ${countdown[2]}, Seconds: ${countdown[3]}`}</p>
        </div>
      ) : (
        <p className="md:text-2xl italic text-red-500">
          The draw has ended <br />
          Lottery is being drawn...
        </p>
      )}
    </div>
  );
};
export default CountdownComponent;

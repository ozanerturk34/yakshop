"use client";
import { useState } from "react";

export const TimeMachine = ({
  day,
  increment,
  decrement,
}: {
  day: number;
  increment: () => void;
  decrement: () => void;
}) => {
  return (
    <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
      <div className="group time-machine-block" onClick={increment}>
        <h2 className={"time-machine-title"}>
          Go back in time <span className="time-machine-icon">&lt;-</span>
        </h2>
        <p className={"time-machine-text"}>
          Yak&apos;s are far more advance than human. they got the time machine
        </p>
      </div>
      <div className="group time-machine-block">
        <h2 className={"time-machine-title"}>
          Day <span className="time-machine-icon">{day}</span>
        </h2>
        <p className={"time-machine-text"}>
          Did you know a yak year is 100 days?
        </p>
      </div>

      <div className="group time-machine-block" onClick={decrement}>
        <h2 className={"time-machine-title"}>
          Back to the Future <span className="time-machine-icon">-&gt;</span>
        </h2>
        <p className={"time-machine-text"}>Order something for future you!</p>
      </div>
    </div>
  );
};

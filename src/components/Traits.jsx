import React from "react";

export default function Traits({ trait, value, total }) {
  // const calcPercentage = Math.round((value * 100) / 10000);
  const calcPercentage = (value * 100) / 10000;
  // const calcPercentage = ((value * 100) / total).toFixed(2);

  // console.log(value);

  return (
    <div className="flex justify-between">
      <div className="flex- text-start "> {trait}</div>
      <div className="flex- text-start "> {calcPercentage}%</div>
    </div>
  );
}

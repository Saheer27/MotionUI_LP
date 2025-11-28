"use client";

import Image from "next/image";
import { cubesData } from "../utils/cubeData";

const faceList = ["front", "back", "right", "left", "top", "bottom"];

export default function Cubes() {
  return (
    <div className="absolute inset-0 w-screen h-screen [perspective:10000px]">
      {Object.keys(cubesData).map((cubeClass, cubeIndex) => (
        <div
          key={cubeClass}
          className={`cube ${cubeClass} absolute [transform-style:preserve-3d]`}
          style={{
            width: "150px",
            height: "150px",
            // shrink for mobile dynamically
          }}
        >
          {faceList.map((face, faceIndex) => {
            const imgNumber = cubeIndex * 6 + faceIndex + 1;
            const imgSrc = `/assets/img${imgNumber}.jpg`;

            // compute face size dynamically for mobile
            const faceSize = {
              base: 100, // mobile default
              sm: 120,   // small screen
              md: 150,   // medium+
            };

            return (
              <div
                key={face}
                className={`${face} absolute`}
                style={{
                  width: `${faceSize.md}px`,
                  height: `${faceSize.md}px`,
                }}
              >
                <Image
                  src={imgSrc}
                  alt={`${cubeClass}-${face}`}
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

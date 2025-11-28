"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Logo from "./components/Logo";
import Cubes from "./components/Cubes";
import { cubesData } from "./utils/cubeData";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const stickyRef = useRef(null);
  const logoRef = useRef(null);
  const cubesRef = useRef(null);
  const header1Ref = useRef(null);
  const header2Ref = useRef(null);

  useEffect(() => {
    // Prevent flicker on first paint
    document.body.classList.add("loading");

    // Allow GSAP time to set initial style
    setTimeout(() => {
      document.body.classList.remove("loading");
    }, 80);
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    gsap.to(".cube", {
      opacity: 1,
      duration: 0.6,
      ease: "power1.out",
    });

    const stickyHeight = window.innerHeight * 4;

    const interpolate = (start, end, progress) => {
      return start + (end - start) * progress;
    };

    ScrollTrigger.create({
      trigger: stickyRef.current,
      start: "top top",
      end: `+=${stickyHeight}px`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        // Logo blur and fade
        const initialProgress = Math.min(self.progress * 20, 1);
        logoRef.current.style.filter = `blur(${interpolate(
          0,
          20,
          initialProgress
        )}px)`;
        const logoOpacityProgress =
          self.progress >= 0.02 ? Math.min((self.progress - 0.02) * 100, 1) : 0;
        logoRef.current.style.opacity = 1 - logoOpacityProgress;

        // Cubes fade in
        const cubesOpacityProgress =
          self.progress > 0.01 ? Math.min((self.progress - 0.01) * 100, 1) : 0;
        cubesRef.current.style.opacity = cubesOpacityProgress;

        // Header 1 out, Header 2 in
        const header1Progress = Math.min(self.progress * 2.5, 1);
        header1Ref.current.style.transform = `scale(${interpolate(
          1,
          1.5,
          header1Progress
        )})`;

        header1Ref.current.style.filter = `blur(${interpolate(
          0,
          20,
          header1Progress
        )}px)`;
        header1Ref.current.style.opacity = 1 - header1Progress;

        const header2StartProgress = (self.progress - 0.4) * 10;
        const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
        const header2scale = interpolate(0.75, 1, header2Progress);
        const header2Blur = interpolate(10, 0, header2Progress);

        header2Ref.current.style.transform = `scale(${header2scale})`;
        header2Ref.current.style.filter = `blur(${header2Blur}px)`;
        header2Ref.current.style.opacity = header2Progress;

        // Cubes animation
        const firstPhaseProgress = Math.min(self.progress * 2, 1);
        const secondPhaseProgress =
          self.progress >= 0.5 ? (self.progress - 0.5) * 2 : 0;

        Object.entries(cubesData).forEach(([cubeClass, data]) => {
          const cube = document.querySelector(`.${cubeClass}`);
          if (!cube) return;

          const { initial, final } = data;
          const currentTop = interpolate(
            initial.top,
            final.top,
            firstPhaseProgress
          );
          const currentLeft = interpolate(
            initial.left,
            final.left,
            firstPhaseProgress
          );
          const currentRotateX = interpolate(
            initial.rotateX,
            final.rotateX,
            firstPhaseProgress
          );
          const currentRotateY = interpolate(
            initial.rotateY,
            final.rotateY,
            firstPhaseProgress
          );
          const currentRotateZ = interpolate(
            initial.rotateZ,
            final.rotateZ,
            firstPhaseProgress
          );
          const currentZ = interpolate(initial.z, final.z, firstPhaseProgress);

          let additionalRotation = 0;
          if (cubeClass === "cube-2") {
            additionalRotation = interpolate(0, 180, secondPhaseProgress);
          } else if (cubeClass === "cube-4") {
            additionalRotation = interpolate(0, -180, secondPhaseProgress);
          }

          cube.style.top = `${currentTop}%`;
          cube.style.left = `${currentLeft}%`;
          cube.style.transform = `translate3d(-50%, -50%, ${currentZ}px) rotateX(${currentRotateX}deg) rotateY(${
            currentRotateY + additionalRotation
          }deg) rotateZ(${currentRotateZ}deg)`;
        });
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main
      className="w-screen min-h-screen"
      style={{ fontFamily: "Notch Grotesk" }}
    >
      <section
        ref={stickyRef}
        className="relative w-screen h-screen overflow-hidden bg-[#331707] text-[#ffe9d9]"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div ref={logoRef} className="inline-block">
            <Logo />
          </div>
        </div>

        <div ref={cubesRef}>
          <Cubes />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[90%] sm:w-[80%] md:w-[60%]">
          <div ref={header1Ref} className="inline-block">
            <h1 className="text-[#FFE9D9] font-serif font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-snug sm:leading-snug md:leading-snug lg:leading-[64px] mt-5">
              The first media company crafted for the digital first generation.
            </h1>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[90%] sm:w-[70%] md:w-[32%]">
          <div ref={header2Ref} className="inline-block opacity-0">
            <h2 className="mb-2 font-semibold text-xl sm:text-2xl md:text-2xl lg:text-2xl">
              Where innovation meets precision.
            </h2>
            <p className="text-base sm:text-lg md:text-lg lg:text-lg font-light leading-6 sm:leading-6 md:leading-6 lg:leading-[24px]">
              Symphonia unites visionary thinkers, creative architects, and
              analytical experts, collaborating seamlessly to transform
              challenges into opportunities. Together, we deliver tailored
              solutions that drive impact and inspire growth.
            </p>
          </div>
        </div>
      </section>
      <section className="about flex justify-center items-center text-center bg-[#cdb9ab] text-[#331707] h-screen w-screen">
        <h2 className="text-2xl font-bold">Your next section goes here.</h2>
      </section>
    </main>
  );
}

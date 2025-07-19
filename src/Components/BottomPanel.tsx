
import { useState } from "react";
import "../Styles/BottomPanel.css";
import CustomButton from "./CustomButton";
import { HeroUIProvider, Slider } from "@heroui/react";

import {
  ArrowClockwise,
  SkipForward,
  SkipBack,
  Play,
  Pause
} from "@phosphor-icons/react";



export default function BottomPanel() {
  let [step, setStep] = useState(0);
  let [totalSteps] = useState(20);

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
    // Add logic to actually start/stop something here
  };

  return (
    <div className="flex flex-row gap-[10%] items-center justify-evenly h-full w-full">
      <div className="flex-row align-middle justify-center flex gap-2">
        <CustomButton >
          <ArrowClockwise size={25} weight="bold" className="" />
        </CustomButton>
        <CustomButton  >
          <SkipBack size={25} weight="bold" className="" />
        </CustomButton>
        {/* <CustomButton >
          <Play size={25} weight="bold" className="" />
        </CustomButton>
        <CustomButton >
          <Pause size={25} weight="bold" className="" />
        </CustomButton> */}
        <CustomButton onClick={togglePlay}>
        {isPlaying ? (
          <Pause size={25} weight="bold" />
        ) : (
          <Play size={25} weight="bold" />
        )}

      </CustomButton>
        <CustomButton >
          <SkipForward size={25} weight="bold" className="" />
        </CustomButton>
      </div>
      <div className=" justify-center items-center content-start w-[40%] pb-6">
        <HeroUIProvider className="">
          <Slider
            className="w-full"
            color="foreground"
            defaultValue={0}
            label="Step"
            getValue={(step) => `${step} of ${totalSteps} Steps`}
            onChange={(value: number | number[]) => {
              setStep(Array.isArray(value) ? value[0] : value);
            }}
            name="slider"
            maxValue={20}
            minValue={0}
            showSteps={true}
            size="md"
            step={1}
          />
        </HeroUIProvider>
      </div>

      <div className="justify-center items-center content-start w-[15%] pb-4">
        <HeroUIProvider className="">
          <Slider
            className="max-w-md"
            color="foreground"
            defaultValue={0}
            fillOffset={0}
            formatOptions={{ style: "unit", unit: "percent" }}
            label="Speed"
            maxValue={2}
            minValue={-2}
            showSteps={false}
            size="sm"
            step={0.25}
          />
        </HeroUIProvider>
      </div>
    </div>
  );
}

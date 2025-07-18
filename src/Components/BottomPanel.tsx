
import { useState } from "react";
import "../Styles/BottomPanel.css";
import CustomButton from "./CustomButton";
import { HeroUIProvider, Button, Slider } from "@heroui/react";

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

  return (
    <div className="flex flex-row gap-[10%] items-center justify-evenly h-full w-full">
      <div className="flex-row align-middle justify-center flex gap-2">
        <CustomButton >
          <ArrowClockwise size={25} weight="bold" className="" />
        </CustomButton>
        <CustomButton  >
          <SkipBack size={25} weight="bold" className="" />
        </CustomButton>
        <CustomButton >
          <Play size={25} weight="bold" className="" />
        </CustomButton>
        <CustomButton >
          <Pause size={25} weight="bold" className="" />
        </CustomButton>
        <CustomButton >
          <SkipForward size={25} weight="bold" className="" />
        </CustomButton>
      </div>
      <div className="w-[40%]">
        <HeroUIProvider className="">
          <Slider
            className="w-full"
            color="foreground"
            defaultValue={0}
            label="s"
            getValue={(step) => `${step} of ${totalSteps} Donuts`}
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

      <div className="w-[15%]">
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


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

interface BottomPanelProps {
  currentStep?: number;
  totalSteps?: number;
  isPlaying?: boolean;
  onStepChange?: (step: number) => void;
  onPlayPause?: (isPlaying: boolean) => void;
  onReset?: () => void;
  onStepForward?: () => void;
  onStepBackward?: () => void;
  onSpeedChange?: (speed: number) => void;
}

export default function BottomPanel({ 
  currentStep = 0,
  totalSteps = 20,
  isPlaying = false,
  onStepChange,
  onPlayPause,
  onReset,
  onStepForward,
  onStepBackward,
  onSpeedChange
}: BottomPanelProps) {
  const [animationSpeed, setAnimationSpeed] = useState(1.0);

  const togglePlay = () => {
    const newPlayingState = !isPlaying;
    if (onPlayPause) {
      onPlayPause(newPlayingState);
    }
  };

  const handleStepChange = (value: number | number[]) => {
    const step = Array.isArray(value) ? value[0] : value;
    if (onStepChange) {
      onStepChange(step);
    }
  };

  const handleSpeedChange = (value: number | number[]) => {
    const speed = Array.isArray(value) ? value[0] : value;
    setAnimationSpeed(speed);
    if (onSpeedChange) {
      onSpeedChange(speed);
    }
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  const handleStepForward = () => {
    if (onStepForward) {
      onStepForward();
    }
  };

  const handleStepBackward = () => {
    if (onStepBackward) {
      onStepBackward();
    }
  };

  return (
    <div className="flex flex-row gap-[10%] items-center justify-evenly h-full w-full">
      {/* Control Buttons */}
      <div className="flex-row align-middle justify-center flex gap-2">
        <CustomButton onClick={handleReset} title="Reset Animation">
          <ArrowClockwise size={25} weight="bold" />
        </CustomButton>
        <CustomButton onClick={handleStepBackward} title="Previous Step">
          <SkipBack size={25} weight="bold" />
        </CustomButton>
        <CustomButton onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? (
            <Pause size={25} weight="bold" />
          ) : (
            <Play size={25} weight="bold" />
          )}
        </CustomButton>
        <CustomButton onClick={handleStepForward} title="Next Step">
          <SkipForward size={25} weight="bold" />
        </CustomButton>
      </div>

      {/* Step Control Slider */}
      <div className="justify-center items-center content-start w-[40%] pb-6">
        <HeroUIProvider>
          <Slider
            className="w-full"
            color="foreground"
            value={currentStep}
            label="Step"
            getValue={(step) => `${step} of ${totalSteps} Steps`}
            onChange={handleStepChange}
            name="stepSlider"
            maxValue={Math.max(totalSteps - 1, 0)}
            minValue={0}
            showSteps={true}
            size="md"
            step={1}
            isDisabled={totalSteps === 0}
          />
        </HeroUIProvider>
      </div>

      {/* Speed Control Slider */}
      <div className="justify-center items-center content-start w-[15%] pb-4">
        <HeroUIProvider>
          <Slider
            className="max-w-md"
            color="foreground"
            value={animationSpeed}
            fillOffset={0}
            formatOptions={{ style: "decimal", minimumFractionDigits: 1, maximumFractionDigits: 1 }}
            label="Speed"
            getValue={(speed) => `${speed}x`}
            onChange={handleSpeedChange}
            maxValue={3}
            minValue={0.25}
            showSteps={false}
            size="sm"
            step={0.25}
          />
        </HeroUIProvider>
      </div>
    </div>
  );
}

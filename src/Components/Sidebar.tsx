import React from "react";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { HeroUIProvider, Slider } from "@heroui/react";
import {
  Faders,
  Sidebar as Settings,

} from "@phosphor-icons/react";

import CustomButton from "./CustomButton";

export const FadersIcon = () => (
  <Faders size={40} />
);

export const SettingsIcon = () => (
  <Settings size={40} />
);

export default function Sidebar() {

  return (
    <div className="flex justify-center w-full h-full">
      <HeroUIProvider className="flex justify-evenly w-full h-full pt-3">
        <Tabs fullWidth size="lg" aria-label="Options" color="default" variant="underlined" className="flex ">
          <Tab
            key="modules"
            title={
              <div className="flex items-center space-x-2 w-full h-full">
                <SettingsIcon />
              </div>
            }
          />
          <Tab
            key="operations"
            title={
              <div className="flex items-center space-x-2 w-full h-full">
                <FadersIcon />
              </div>
            }
          />
        </Tabs>
      </HeroUIProvider>
    </div>

  );
}
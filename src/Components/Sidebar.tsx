import React from "react";
import { useState, } from "react";
import { Tabs, Tab, Card, CardBody, Listbox, ListboxItem, } from "@heroui/react";
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

  const [selectedTab, setSelectedTab] = useState("modules");

  return (
    <div className="flex flex-col justify-center w-full">
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
      <HeroUIProvider className=" mt-3">
        <Listbox isVirtualized virtualization={{
          maxListboxHeight: 640,
          itemHeight: 40,
        }}>
          <ListboxItem >Option 1</ListboxItem>
          <ListboxItem >Option 2</ListboxItem>
          <ListboxItem >Option 3</ListboxItem>
        </Listbox>
      </HeroUIProvider>
    </div>

  );
}
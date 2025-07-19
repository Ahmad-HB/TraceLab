import { Link } from 'react-router-dom'
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import React, { useState } from "react";
import { HeroUIProvider } from "@heroui/react";

import {
  Database,
  Cpu,
  Circuitry,
  Binary
} from "@phosphor-icons/react";




export const DatabaseIcon = () => {
  return (
    <Database size={30} />
  );
};

export const CpuIcon = () => {
  return (
    <Cpu size={30} />
  );
};

export const CircuitryIcon = () => {
  return (
    <Circuitry size={30} />
  );
};

export const BinaryIcon = () => {
  return (
    <Binary size={30} />
  );
};



export default function TopControls() {
  const [selected, setSelected] = React.useState("photos");


  return (
    <div className="flex justify-center items-center w-full h-full">
      <HeroUIProvider>
        <Tabs fullWidth aria-label="Options" variant="bordered" selectedKey={selected} onSelectionChange={(key) => setSelected(String(key))}>
          <Tab key="Data-Structures" title={
            <div className="flex items-center space-x-2 w-full h-full">
              <DatabaseIcon />
              <span>Data Structures</span>
            </div>
          } />
          <Tab key="OS-Algorithms" title={
            <div className="flex items-center space-x-2 w-full h-full">
              <CpuIcon />
              <span>OS Algorithms</span>
            </div>
          } />
          <Tab key="Logic Gates" title={
            <div className="flex items-center space-x-2 w-full h-full">
              <CircuitryIcon />
              <span>Logic Gates</span>
            </div>
          } />
          <Tab key="Numbering-System" title={
            <div className="flex items-center space-x-2 w-full h-full">
              <BinaryIcon />
              <span>Numbering system</span>
            </div>
          } />

        </Tabs>
      </HeroUIProvider>
    </div>
  )
}
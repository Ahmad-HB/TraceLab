// import React from "react";
// import { useState, } from "react";
// import { Tabs, Tab, Card, CardBody, Listbox, ListboxItem, } from "@heroui/react";
// import { HeroUIProvider, Slider } from "@heroui/react";
// import {
//   Faders,
//   Sidebar as Settings,

// } from "@phosphor-icons/react";

// import CustomButton from "./CustomButton";

// export const FadersIcon = () => (
//   <Faders size={40} />
// );

// export const SettingsIcon = () => (
//   <Settings size={40} />
// );

// export default function Sidebar() {

//   const [selectedTab, setSelectedTab] = useState("modules");

//   return (
//     <div className="flex flex-col justify-center w-full">
//       <HeroUIProvider className="flex justify-evenly w-full h-full pt-3">
//         <Tabs fullWidth size="lg" aria-label="Options" color="default" variant="underlined" className="flex ">
//           <Tab
//             key="modules"
//             title={
//               <div className="flex items-center space-x-2 w-full h-full">
//                 <SettingsIcon />
//               </div>
//             }

//           />
//           <Tab
//             key="operations"
//             title={
//               <div className="flex items-center space-x-2 w-full h-full">
//                 <FadersIcon />
//               </div>
//             }
//           />
//         </Tabs>
//       </HeroUIProvider>
//       <HeroUIProvider className=" mt-3">
//         <Listbox isVirtualized virtualization={{
//           maxListboxHeight: 640,
//           itemHeight: 40,
//         }}>
//           <ListboxItem >Option 1</ListboxItem>
//           <ListboxItem >Option 2</ListboxItem>
//           <ListboxItem >Option 3</ListboxItem>
//         </Listbox>
//       </HeroUIProvider>
//     </div>

//   );
// }

import React from "react";
import { Tabs, Tab, Listbox, ListboxItem } from "@heroui/react";
import { HeroUIProvider } from "@heroui/react";
import {
  Faders,
  Sidebar as Settings,
  Stack,
  Queue,
  Tree,
  Graph,
  ListDashes
} from "@phosphor-icons/react";

interface SidebarProps {
  selectedTopTab: string;
  onModuleSelect: (moduleKey: string) => void;
}

export const FadersIcon = () => (
  <Faders size={40} />
);

export const SettingsIcon = () => (
  <Settings size={40} />
);

// DSA Module configurations
const dsaModules = [
  {
    key: "stack",
    label: "Stack Visualizer",
    icon: <Stack size={20} />,
    description: "Last In First Out (LIFO) data structure"
  },
  {
    key: "queue",
    label: "Queue Visualizer",
    icon: <Queue size={20} />,
    description: "First In First Out (FIFO) data structure"
  },
  {
    key: "linkedlist",
    label: "Linked List Visualizer",
    icon: <ListDashes size={20} />,
    description: "Dynamic linear data structure"
  },
  {
    key: "tree",
    label: "Tree Visualizer",
    icon: <Tree size={20} />,
    description: "Hierarchical data structure"
  },
  {
    key: "graph",
    label: "Graph Visualizer",
    icon: <Graph size={20} />,
    description: "Network of connected nodes"
  },
  {
    key: "array",
    label: "Array Visualizer",
    icon: <ListDashes size={20} />,
    description: "Contiguous memory data structure"
  }
];

export default function Sidebar({ selectedTopTab, onModuleSelect }: SidebarProps) {
  const [selectedSidebarTab, setSelectedSidebarTab] = React.useState("modules");

  const renderModulesContent = () => {
    if (selectedTopTab === "Data-Structures") {
      return (
        <div className="w-full px-2 mt-4">
          <Listbox
            aria-label="DSA Modules"
            onAction={(key) => onModuleSelect(String(key))}
            className="w-full"
          >
            {dsaModules.map((module) => (
              <ListboxItem
                key={module.key}
                textValue={module.label}
                className="mb-2"
              >
                <div className="flex items-start gap-3 p-2">
                  <div className="flex-shrink-0 mt-1">
                    {module.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{module.label}</span>
                    <span className="text-xs text-gray-500 mt-1">
                      {module.description}
                    </span>
                  </div>
                </div>
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      );
    }

    // For other top tabs, show placeholder or different modules
    return (
      <div className="w-full px-4 mt-4">
        <p className="text-sm text-gray-500 text-center">
          Select a category from the top menu to see available modules
        </p>
      </div>
    );
  };

  const renderOperationsContent = () => {
    if (selectedTopTab === "Data-Structures") {
      return (
        <HeroUIProvider className="">
          <Listbox>
            <ListboxItem textValue="Push/Pop" onClick={() => console.log("Push/Pop selected")}>
              <div className="flex items-center gap-2">
                <Stack size={20} />
                <span>Push/Pop</span>
              </div>
            </ListboxItem>
            <ListboxItem textValue="Enqueue/Dequeue" onClick={() => console.log("Enqueue/Dequeue selected")}>
              <div className="flex items-center gap-2">
                <Queue size={20} />
                <span>Enqueue/Dequeue</span>
              </div>
            </ListboxItem>
            <ListboxItem textValue="Insert/Delete" onClick={() => console.log("Insert/Delete selected")}>
              <div className="flex items-center gap-2">
                <ListDashes size={20} />
                <span>Insert/Delete</span>
              </div>
            </ListboxItem>
            <ListboxItem textValue="Search/Traverse" onClick={() => console.log("Search/Traverse selected")}>
              <div className="flex items-center gap-2">
                <Tree size={20} />
                <span>Search/Traverse</span>
              </div>
            </ListboxItem>
            <ListboxItem textValue="Sort/Filter" onClick={() => console.log("Sort/Filter selected")}>
              <div className="flex items-center gap-2">
                <Faders size={20} />
                <span>Sort/Filter</span>
              </div>
            </ListboxItem>
          </Listbox>
          </HeroUIProvider>

      );
  }

  return (
    <div className="w-full px-4 mt-4">
      <p className="text-sm text-gray-500 text-center">
        Operations will appear based on selected category
      </p>
    </div>
  );
};

return (
  <div className="flex flex-col w-full h-full">
    <HeroUIProvider className="flex flex-col w-full h-full pt-3">
      <Tabs
        fullWidth
        size="lg"
        aria-label="Sidebar Options"
        color="default"
        variant="underlined"
        selectedKey={selectedSidebarTab}
        onSelectionChange={(key) => setSelectedSidebarTab(String(key))}
        className="flex-shrink-0"
      >
        <Tab
          key="modules"
          title={
            <div className="flex items-center justify-center w-full h-full">
              <SettingsIcon />
            </div>
          }
        >
          <div className="flex-1 overflow-y-auto">
            {renderModulesContent()}
          </div>
        </Tab>
        <Tab
          key="operations"
          title={
            <div className="flex items-center justify-center w-full h-full">
              <FadersIcon />
            </div>
          }
        >
          <div className="flex-1 overflow-y-auto">
            {renderOperationsContent()}
          </div>
        </Tab>
      </Tabs>
    </HeroUIProvider>
  </div>
);
}
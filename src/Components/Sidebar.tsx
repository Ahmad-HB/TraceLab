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
  ListDashes,
  Plus,
  Minus,
  MagnifyingGlass,
  ArrowsClockwise,
  SortAscending,
  SortDescending,
  ArrowCounterClockwise
} from "@phosphor-icons/react";

interface SidebarProps {
  selectedTopTab: string;
  selectedModule: string | null;
  selectedAction: string | null;
  onModuleSelect: (moduleKey: string) => void;
  onActionSelect: (actionKey: string) => void;
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

// DSA Actions configurations for each module
const dsaActions = {
  stack: [
    { key: "push", label: "Push", icon: <Plus size={16} />, description: "Add element to top" },
    { key: "pop", label: "Pop", icon: <Minus size={16} />, description: "Remove element from top" },
    { key: "peek", label: "Peek", icon: <MagnifyingGlass size={16} />, description: "View top element" },
    { key: "clear", label: "Clear", icon: <ArrowCounterClockwise size={16} />, description: "Empty the stack" }
  ],
  queue: [
    { key: "enqueue", label: "Enqueue", icon: <Plus size={16} />, description: "Add element to rear" },
    { key: "dequeue", label: "Dequeue", icon: <Minus size={16} />, description: "Remove element from front" },
    { key: "front", label: "Front", icon: <MagnifyingGlass size={16} />, description: "View front element" },
    { key: "clear", label: "Clear", icon: <ArrowCounterClockwise size={16} />, description: "Empty the queue" }
  ],
  linkedlist: [
    { key: "insert_head", label: "Insert at Head", icon: <Plus size={16} />, description: "Add element at beginning" },
    { key: "insert_tail", label: "Insert at Tail", icon: <Plus size={16} />, description: "Add element at end" },
    { key: "delete", label: "Delete", icon: <Minus size={16} />, description: "Remove element" },
    { key: "search", label: "Search", icon: <MagnifyingGlass size={16} />, description: "Find element" },
    { key: "traverse", label: "Traverse", icon: <ArrowsClockwise size={16} />, description: "Visit all elements" }
  ],
  tree: [
    { key: "insert", label: "Insert", icon: <Plus size={16} />, description: "Add node to tree" },
    { key: "delete", label: "Delete", icon: <Minus size={16} />, description: "Remove node from tree" },
    { key: "search", label: "Search", icon: <MagnifyingGlass size={16} />, description: "Find node in tree" },
    { key: "inorder", label: "Inorder", icon: <ArrowsClockwise size={16} />, description: "Inorder traversal" },
    { key: "preorder", label: "Preorder", icon: <ArrowsClockwise size={16} />, description: "Preorder traversal" },
    { key: "postorder", label: "Postorder", icon: <ArrowsClockwise size={16} />, description: "Postorder traversal" }
  ],
  graph: [
    { key: "add_vertex", label: "Add Vertex", icon: <Plus size={16} />, description: "Add node to graph" },
    { key: "add_edge", label: "Add Edge", icon: <Plus size={16} />, description: "Connect two vertices" },
    { key: "remove_vertex", label: "Remove Vertex", icon: <Minus size={16} />, description: "Remove node from graph" },
    { key: "remove_edge", label: "Remove Edge", icon: <Minus size={16} />, description: "Disconnect vertices" },
    { key: "bfs", label: "BFS", icon: <ArrowsClockwise size={16} />, description: "Breadth-first search" },
    { key: "dfs", label: "DFS", icon: <ArrowsClockwise size={16} />, description: "Depth-first search" },
    { key: "shortest_path", label: "Shortest Path", icon: <ArrowsClockwise size={16} />, description: "Find shortest path" }
  ],
  array: [
    { key: "insert", label: "Insert", icon: <Plus size={16} />, description: "Add element at index" },
    { key: "delete", label: "Delete", icon: <Minus size={16} />, description: "Remove element at index" },
    { key: "search", label: "Search", icon: <MagnifyingGlass size={16} />, description: "Find element" },
    { key: "sort_asc", label: "Sort Ascending", icon: <SortAscending size={16} />, description: "Sort in ascending order" },
    { key: "sort_desc", label: "Sort Descending", icon: <SortDescending size={16} />, description: "Sort in descending order" },
    { key: "reverse", label: "Reverse", icon: <ArrowsClockwise size={16} />, description: "Reverse array order" }
  ]
};

export default function Sidebar({ selectedTopTab, selectedModule, selectedAction, onModuleSelect, onActionSelect }: SidebarProps) {
  const [selectedSidebarTab, setSelectedSidebarTab] = React.useState("modules");

  const renderModulesContent = () => {
    if (selectedTopTab === "Data-Structures") {
      return (
        <div className="w-full px-2 mt-4">
          <Listbox
            aria-label="DSA Modules"
            onAction={(key) => onModuleSelect(String(key))}
            className="w-full"
            selectedKeys={selectedModule ? [selectedModule] : []}
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
      if (!selectedModule) {
        return (
          <div className="w-full px-4 mt-4">
            <p className="text-sm text-gray-500 text-center">
              Select a data structure from the modules tab to see available operations
            </p>
          </div>
        );
      }

      const actions = dsaActions[selectedModule as keyof typeof dsaActions] || [];
      
      return (
        <div className="w-full px-2 mt-4">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              {dsaModules.find(m => m.key === selectedModule)?.label} Operations
            </h3>
          </div>
          <Listbox
            aria-label="DSA Operations"
            onAction={(key) => onActionSelect(String(key))}
            className="w-full"
            selectedKeys={selectedAction ? [selectedAction] : []}
          >
            {actions.map((action) => (
              <ListboxItem
                key={action.key}
                textValue={action.label}
                className="mb-2"
              >
                <div className="flex items-start gap-3 p-2">
                  <div className="flex-shrink-0 mt-1">
                    {action.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{action.label}</span>
                    <span className="text-xs text-gray-500 mt-1">
                      {action.description}
                    </span>
                  </div>
                </div>
              </ListboxItem>
            ))}
          </Listbox>
        </div>
      );
    }

    // For other top tabs, show placeholder
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
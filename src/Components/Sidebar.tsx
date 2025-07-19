import React from "react";
import {Tabs, Tab, Card, CardBody} from "@heroui/react";
import { HeroUIProvider, Slider } from "@heroui/react";
import {
  Faders,
  Sidebar as Settings,

} from "@phosphor-icons/react";

import CustomButton from "./CustomButton";

export default function Sidebar() {


  let tabs = [
    {
      id: "photos",
      label: "Photos",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "music",
      label: "Music",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      id: "videos",
      label: "Videos",
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  return (
    <div className="w-full">
      {/* <button className="flex items-center gap-3 px-3 py-1 border 
        border-gray-200 rounded-r-lg bg-white
        hover:shadow-sm active:shadow-inner
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-gray-300 mt-3">
       <Settings size={40} />
      </button>

      <button className="flex items-center gap-3 px-3 py-1 border 
        border-gray-200 rounded-r-lg bg-white
        hover:shadow-sm active:shadow-inner
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-gray-300 mt-3">
        <Faders size={40} />
      </button> */}
      <HeroUIProvider className="w-full">
        <Tabs aria-label="Dynamic tabs" items={tabs}>
         {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card>
              <CardBody>{item.content}</CardBody>
            </Card>
          </Tab>
        )}
        </Tabs>
      </HeroUIProvider>
    </div>

  );
}

//===========//===========//===========//===========//===========//===========

// import React from 'react';
// import {
//   List as MenuIcon,
//   Faders as SettingsIcon,
//   TreeStructure,
//   Function,
//   Database,
//   Network
// } from "@phosphor-icons/react";
// import CustomButton from "./CustomButton";

// export default function Sidebar() {
//   return (
//     <div className="sidebar w-64 bg-white border-r border-gray-200 h-full p-4">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-bold">TraceLab</h2>
//         <div className="flex gap-1">
//           <CustomButton className="sidebar-button p-2">
//             <MenuIcon size={20} />
//           </CustomButton>
//           <CustomButton className="sidebar-button p-2">
//             <SettingsIcon size={20} />
//           </CustomButton>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="space-y-2">
//         <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left">
//           <TreeStructure size={18} className="text-gray-500" />
//           <span className="text-sm">Data Structures</span>
//         </button>
//         <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left">
//           <Function size={18} className="text-gray-500" />
//           <span className="text-sm">Algorithms</span>
//         </button>
//         <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left">
//           <Database size={18} className="text-gray-500" />
//           <span className="text-sm">Databases</span>
//         </button>
//         <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-left">
//           <Network size={18} className="text-gray-500" />
//           <span className="text-sm">Networks</span>
//         </button>
//       </nav>
//     </div>
//   );
// }


//===========//===========//===========//===========//===========//===========

// import React, { useState } from 'react';
// import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from "@heroui/drawer";
// import {
//   List as MenuIcon,
//   Faders as SettingsIcon,
//   TreeStructure,
//   Function,
//   Database,
//   Network,
//   MathOperations,
//   Student
// } from "@phosphor-icons/react";
// import CustomButton from "./CustomButton";

// interface SidebarProps {
//   activeModule?: string;
//   onModuleChange?: (module: string) => void;
// }

// const educationalModules = [
//   { id: 'data-structures', name: 'Data Structures', icon: TreeStructure },
//   { id: 'algorithms', name: 'Algorithms', icon: Function },
//   { id: 'databases', name: 'Databases', icon: Database },
//   { id: 'networks', name: 'Networks', icon: Network },
//   { id: 'mathematics', name: 'Mathematics', icon: MathOperations },
// ];

// export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);

//   const handleModuleClick = (moduleId: string) => {
//     onModuleChange?.(moduleId);
//     setIsDrawerOpen(false);
//   };

//   return (
//     <>
//       {/* Mobile Toggle Buttons */}
//       <div className="md:hidden flex items-center gap-2 p-2">
//         <CustomButton 
//           className="sidebar-button"
//           onClick={() => setIsDrawerOpen(true)}
//         >
//           <MenuIcon size={24} />
//         </CustomButton>
//         <CustomButton 
//           className="sidebar-button"
//           onClick={() => setShowSettings(true)}
//         >
//           <SettingsIcon size={24} />
//         </CustomButton>
//       </div>

//       {/* Desktop Sidebar */}
//       <div className="hidden md:block w-64 bg-white border-r border-gray-200 h-full">
//         <div className="p-4">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center gap-2">
//               <Student size={24} className="text-blue-600" weight="bold" />
//               <h2 className="text-lg font-bold text-gray-800">TraceLab</h2>
//             </div>
//             <CustomButton 
//               className="sidebar-button p-1"
//               onClick={() => setShowSettings(!showSettings)}
//             >
//               <SettingsIcon size={20} />
//             </CustomButton>
//           </div>

//           {/* Navigation */}
//           <nav className="space-y-1">
//             <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
//               Learning Modules
//             </h3>
            
//             {educationalModules.map((module) => {
//               const IconComponent = module.icon;
//               const isActive = activeModule === module.id;
              
//               return (
//                 <button
//                   key={module.id}
//                   onClick={() => handleModuleClick(module.id)}
//                   className={`
//                     w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors
//                     ${isActive 
//                       ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
//                       : 'hover:bg-gray-50 text-gray-700'
//                     }
//                   `}
//                 >
//                   <IconComponent 
//                     size={18} 
//                     weight={isActive ? "bold" : "regular"}
//                     className={isActive ? 'text-blue-600' : 'text-gray-500'}
//                   />
//                   <span className="text-sm font-medium">{module.name}</span>
//                 </button>
//               );
//             })}
//           </nav>

//           {/* Settings Panel */}
//           {showSettings && (
//             <div className="mt-6 p-3 bg-gray-50 rounded-lg">
//               <h4 className="text-sm font-medium text-gray-700 mb-2">Settings</h4>
//               <div className="space-y-2">
//                 <label className="flex items-center text-xs">
//                   <input type="checkbox" className="mr-2" />
//                   Dark Mode
//                 </label>
//                 <label className="flex items-center text-xs">
//                   <input type="checkbox" className="mr-2" />
//                   Auto-save Progress
//                 </label>
//                 <label className="flex items-center text-xs">
//                   <input type="checkbox" className="mr-2" />
//                   Show Hints
//                 </label>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile Drawer */}
//       <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} placement="left">
//         <DrawerContent>
//           <DrawerHeader className="flex flex-col gap-1">
//             <h2 className="text-xl font-bold text-gray-800">TraceLab</h2>
//             <p className="text-sm text-gray-600">Educational CS Platform</p>
//           </DrawerHeader>
          
//           <DrawerBody>
//             <nav className="space-y-2">
//               {educationalModules.map((module) => {
//                 const IconComponent = module.icon;
//                 const isActive = activeModule === module.id;
                
//                 return (
//                   <button
//                     key={module.id}
//                     onClick={() => handleModuleClick(module.id)}
//                     className={`
//                       w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors
//                       ${isActive 
//                         ? 'bg-blue-50 text-blue-700' 
//                         : 'hover:bg-gray-50 text-gray-700'
//                       }
//                     `}
//                   >
//                     <IconComponent 
//                       size={20} 
//                       weight={isActive ? "bold" : "regular"}
//                       className={isActive ? 'text-blue-600' : 'text-gray-500'}
//                     />
//                     <span className="font-medium">{module.name}</span>
//                   </button>
//                 );
//               })}
//             </nav>
//           </DrawerBody>
          
//           <DrawerFooter>
//             <div className="text-xs text-gray-500">
//               <p>TraceLab v1.0.0</p>
//               <p>React + TypeScript + npm</p>
//             </div>
//           </DrawerFooter>
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// }

//===========//===========//===========//===========//===========//===========

// import React from "react";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerBody,
//   DrawerFooter,
//   Button,
//   useDisclosure,
// } from "@heroui/react";

// type DrawerPlacement = "left" | "right" | "top" | "bottom";

// export default function App() {
//   const {isOpen, onOpen, onOpenChange} = useDisclosure();
//   const [placement, setPlacement] = React.useState<DrawerPlacement>("left");

//   const handleOpen = () => {
//     onOpen();
//   };

//   return (
//     <>
//       <div className="flex flex-wrap gap-3">
//           <Button key={placement} className="capitalize" onPress={() => handleOpen()}>
//             Open 
//           </Button>
//       </div>
//       <Drawer isOpen={isOpen} placement={"left"} onOpenChange={onOpenChange} backdrop="transparent" size="sm">
//         <DrawerContent>
//           {(onClose) => (
//             <>
//               <DrawerHeader className="flex flex-col gap-1">Drawer Title</DrawerHeader>
//               <DrawerBody>
//                 <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
//                   risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
//                   quam.
//                 </p>
//                 <p>
//                   Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
//                   adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
//                   officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
//                 </p>
//               </DrawerBody>
//               <DrawerFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" onPress={onClose}>
//                   Action
//                 </Button>
//               </DrawerFooter>
//             </>
//           )}
//         </DrawerContent>
//       </Drawer>
//     </>
//   );
// }


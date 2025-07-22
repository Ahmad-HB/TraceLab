

// export default function MainView() {
//   return (
//     <div className="main-view">
//     </div>
//   )
// }




import React from 'react';
// Import all DSA modules
import StackVisualizer from '../modules/DSA/StackVisualizer';
import ArrayVisualizer from '../modules/DSA/ArrayVisualizer';
import { LinkedListVisualizer } from '../modules/DSA/LinkedListVisualizer';
import {QueueVisualizer} from '../modules/DSA/QueueVisualizer';
import {TreeVisualizer} from '../modules/DSA/TreeVisualizer';
import {GraphVisualizer} from '../modules/DSA/GraphVisualizer';

// Import other modules as needed
import SchedulingSimulator from '../modules/OS/SchedulingSimulator';
import BinaryConverter from '../modules/NumberSyS/BinaryConverter';
import GateSimulator from '../modules/LogicGates/GateSimulator';

interface MainViewProps {
  selectedModule: string | null;
}

export default function MainView({ selectedModule }: MainViewProps) {
  const renderModule = () => {
    if (!selectedModule) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Welcome to CS Learning Platform
            </h2>
            <p className="text-gray-500">
              Select a module from the sidebar to get started with interactive learning
            </p>
          </div>
        </div>
      );
    }

    // DSA Modules
    switch (selectedModule) {
      case 'stack':
        return <StackVisualizer />;
      case 'queue':
        return <QueueVisualizer />;
      case 'array':
        return <ArrayVisualizer />;
      case 'linkedlist':
        return <LinkedListVisualizer />;
      case 'tree':
        return <TreeVisualizer />;
      case 'graph':
        return <GraphVisualizer />;
      
      // OS Modules
      case 'scheduling':
        return <SchedulingSimulator />;
      
      // Number System Modules
      case 'binary':
        return <BinaryConverter />;
      
      // Logic Gates Modules
      case 'gates':
        return <GateSimulator />;
      
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                Module Under Development
              </h3>
              <p className="text-gray-500">
                The {selectedModule} module is coming soon!
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="main-view w-full h-full p-4">
      {renderModule()}
    </div>
  );
}
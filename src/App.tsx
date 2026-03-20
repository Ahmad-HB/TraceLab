// // import { BrowserRouter } from 'react-router-dom';
// import Sidebar from './Components/Sidebar';
// import TopControls from './Components/TopControls';
// import MainView from './Components/MainView';
// import BottomPanel from './Components/BottomPanel';
// // import AppRoutes from './Routes/AppRoutes';
// import './index.css';

// function App() {
//   return (
//     <div className="flex flex-col h-[100%] w-[100%]">
//       <div className="h-[10%] ">
//         <TopControls />
//       </div>
//       <div className="flex flex-row flex-grow gap-1 items-center justify-start h-[80%] w-full">
//       <div className="w-[15%] h-[93%] border-[#969696] border-t-2 border-r-2 border-b-2 border-l-0 rounded-r-lg mr-1.5">
//         <Sidebar />
//       </div>
//       <div className="w-[84%] h-[93%] border-[#969696] border-10 border-dashed rounded-lg">
//         <MainView />
//         <div className="content-section">

//         </div>
//       </div>
//       </div>
//       <div className="flex h-[10%] justify-center items-center border-[#969696] border-t-2 border-r-0 border-b-0 border-l-0">
//         <BottomPanel />
//       </div>
//     </div>
//   );
// }

// export default App;





// import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Components/Sidebar';
import TopControls from './Components/TopControls';
import MainView from './Components/MainView';
import BottomPanel from './Components/BottomPanel';
// import AppRoutes from './Routes/AppRoutes';
import './index.css';

function App() {
  const [selectedTopTab, setSelectedTopTab] = useState("Data-Structures");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  
  // Animation control state
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1.0);

  const handleTopTabChange = (tabKey: string) => {
    setSelectedTopTab(tabKey);
    setSelectedModule(null); // Reset selected module when changing top tab
    setSelectedAction(null); // Reset selected action when changing top tab
    resetAnimation();
  };

  const handleModuleSelect = (moduleKey: string) => {
    setSelectedModule(moduleKey);
    setSelectedAction(null); // Reset selected action when changing module
    resetAnimation();
    console.log(`Selected module: ${moduleKey}`);
  };

  const handleActionSelect = (actionKey: string) => {
    setSelectedAction(actionKey);
    setCurrentStep(0); // Reset to first step when new action starts
    console.log(`Selected action: ${actionKey} for module: ${selectedModule}`);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    console.log(`Step changed to: ${step}`);
  };

  const handleTotalStepsChange = (total: number) => {
    setTotalSteps(total);
    console.log(`Total steps changed to: ${total}`);
  };

  const handlePlayPause = (playing: boolean) => {
    setIsPlaying(playing);
    console.log(`Animation ${playing ? 'playing' : 'paused'}`);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setSelectedAction(null);
    console.log('Animation reset');
  };

  const handleStepForward = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setAnimationSpeed(speed);
    console.log(`Animation speed changed to: ${speed}x`);
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setTotalSteps(0);
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col h-[100%] w-[100%]">
      <div className="h-[10%]">
        <TopControls 
          selectedTab={selectedTopTab}
          onTabChange={handleTopTabChange}
        />
      </div>
      <div className="flex flex-row flex-grow gap-1 items-center justify-evenly h-[80%] w-full">
        <div className="w-[15%] h-[93%] border-[#969696] border-t-2 border-r-2 border-b-2 border-l-0 rounded-r-lg">
          <Sidebar 
            selectedTopTab={selectedTopTab}
            selectedModule={selectedModule}
            selectedAction={selectedAction}
            onModuleSelect={handleModuleSelect}
            onActionSelect={handleActionSelect}
          />
        </div>
        <div className="w-[85%] h-[93%] border-[#969696] border-10 border-dashed rounded-lg">
          <MainView 
            selectedModule={selectedModule}
            selectedAction={selectedAction}
            currentStep={currentStep}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            animationSpeed={animationSpeed}
            onStepChange={handleStepChange}
            onTotalStepsChange={handleTotalStepsChange}
            onPlayPause={handlePlayPause}
            onReset={handleReset}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onSpeedChange={handleSpeedChange}
          />
          <div className="content-section"></div>
        </div>
      </div>
      <div className="flex h-[10%] justify-center items-center border-[#969696] border-t-2 border-r-0 border-b-0 border-l-0">
        <BottomPanel 
          currentStep={currentStep}
          totalSteps={totalSteps}
          isPlaying={isPlaying}
          onStepChange={handleStepChange}
          onPlayPause={handlePlayPause}
          onReset={handleReset}
          onStepForward={handleStepForward}
          onStepBackward={handleStepBackward}
          onSpeedChange={handleSpeedChange}
        />
      </div>
    </div>
  );
}

export default App;
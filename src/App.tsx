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

  const handleTopTabChange = (tabKey: string) => {
    setSelectedTopTab(tabKey);
    setSelectedModule(null); // Reset selected module when changing top tab
  };

  const handleModuleSelect = (moduleKey: string) => {
    setSelectedModule(moduleKey);
    console.log(`Selected module: ${moduleKey}`);
    // Here you can add logic to load the selected module in MainView
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
            onModuleSelect={handleModuleSelect}
          />
        </div>
        <div className="w-[85%] h-[93%] border-[#969696] border-10 border-dashed rounded-lg">
          <MainView selectedModule={selectedModule} />
          <div className="content-section"></div>
        </div>
      </div>
      <div className="flex h-[10%] justify-center items-center border-[#969696] border-t-2 border-r-0 border-b-0 border-l-0">
        <BottomPanel />
      </div>
    </div>
  );
}

export default App;
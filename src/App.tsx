// import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import TopControls from './Components/TopControls';
import MainView from './Components/MainView';
import BottomPanel from './Components/BottomPanel';
// import AppRoutes from './Routes/AppRoutes';
import './index.css';

function App() {
  return (
    <div className="flex flex-col h-[100%] w-[100%]">
      <div className="h-[10%] ">
        <TopControls />
      </div>
      <div className="flex flex-row flex-grow gap-1">
      <div className="w-[15%] border-[#969696] border-2 rounded-r-lg">
        <Sidebar />
      </div>
      <div className="w-[85%] border-[#969696] border-10 border-dashed rounded-lg ">
        <MainView />
        <div className="content-section">

        </div>
      </div>
      </div>
      <div className="flex h-[10%] justify-center items-center">
        <BottomPanel />
      </div>
    </div>
  );
}

export default App;


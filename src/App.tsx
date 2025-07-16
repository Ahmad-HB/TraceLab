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
      <div className="h-[10%] border-black-50 border-2">
        <TopControls />
      </div>
      <div className="flex flex-row flex-grow">
      <div className="w-[20%] border-black-50 border-2">
        <Sidebar />
      </div>
      <div className="w-[80%] border-black-50 border-2">
        <MainView />
        <div className="content-section">

        </div>
      </div>
      </div>
      <div className="flex h-[10%] justify-center items-center border-black-50 border-2">
        <BottomPanel />
      </div>
    </div>
  );
}

export default App;


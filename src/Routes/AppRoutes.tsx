import { Routes, Route } from 'react-router-dom'
import StackVisualizer from '../modules/DSA/StackVisualizer'
import SchedulingSimulator from '../modules/OS/SchedulingSimulator'
import BinaryConverter from '../modules/NumberSyS/BinaryConverter'
import GateSimulator from '../modules/LogicGates/GateSimulator'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/dsa/stack" element={<StackVisualizer />} />
      <Route path="/os/scheduling" element={<SchedulingSimulator />} />
      <Route path="/binary/converter" element={<BinaryConverter />} />
      <Route path="/logic/gates" element={<GateSimulator />} />
    </Routes>
  )
}

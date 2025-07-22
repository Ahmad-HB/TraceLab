export const QueueVisualizer: React.FC = () => {
  return (
    <div className="queue-visualizer p-6">
      <h2 className="text-2xl font-bold mb-4">Queue Visualizer</h2>
      <p className="text-gray-600 mb-4">First In First Out (FIFO) data structure visualization</p>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm text-gray-500">Queue operations (enqueue, dequeue) will be implemented here</p>
      </div>
    </div>
  );
};
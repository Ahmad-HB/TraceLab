import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  NodeTypes,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface QueueNode extends Node {
  data: {
    value: number;
    isFront: boolean;
    isRear: boolean;
  };
}

const QueueVisualizer: React.FC = () => {
  const [queue, setQueue] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  // Convert queue to React Flow nodes
  const nodes: QueueNode[] = useMemo(() => {
    return queue.map((value, index) => ({
      id: `queue-${index}`,
      type: 'queueNode',
      position: { x: 100 + (index * 100), y: 300 },
      data: {
        value,
        isFront: index === 0,
        isRear: index === queue.length - 1,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    }));
  }, [queue]);

  const edges: Edge[] = useMemo(() => {
    const newEdges: Edge[] = [];
    for (let i = 0; i < queue.length - 1; i++) {
      newEdges.push({
        id: `edge-${i}`,
        source: `queue-${i}`,
        target: `queue-${i + 1}`,
        type: 'straight',
        animated: false,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
      });
    }
    return newEdges;
  }, [queue]);

  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);

  // Update nodes when queue changes
  React.useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  const enqueue = useCallback(() => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      setQueue(prev => [...prev, value]);
      setInputValue('');
    }
  }, [inputValue]);

  const dequeue = useCallback(() => {
    if (queue.length > 0) {
      setQueue(prev => prev.slice(1));
    }
  }, [queue.length]);

  const front = useCallback(() => {
    if (queue.length > 0) {
      alert(`Front element: ${queue[0]}`);
    } else {
      alert('Queue is empty');
    }
  }, [queue]);

  const clear = useCallback(() => {
    setQueue([]);
  }, []);

  // Custom node component for queue elements
  const QueueNodeComponent = ({ data }: { data: { value: number; isFront: boolean; isRear: boolean } }) => (
    <div className={`px-4 py-2 rounded-lg border-2 min-w-[80px] text-center ${
      data.isFront 
        ? 'bg-green-500 text-white border-green-600 shadow-lg' 
        : data.isRear
        ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
        : 'bg-gray-100 text-gray-800 border-gray-300'
    }`}>
      <div className="font-bold text-lg">{data.value}</div>
      {data.isFront && <div className="text-xs mt-1">FRONT</div>}
      {data.isRear && <div className="text-xs mt-1">REAR</div>}
    </div>
  );

  const nodeTypes: NodeTypes = {
    queueNode: QueueNodeComponent,
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Controls */}
      <div className="bg-gray-50 p-4 border-b">
        <h2 className="text-2xl font-bold mb-4">Queue Visualizer</h2>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="px-3 py-2 border rounded-lg"
              onKeyPress={(e) => e.key === 'Enter' && enqueue()}
            />
            <button
              onClick={enqueue}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Enqueue
            </button>
          </div>
          <button
            onClick={dequeue}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Dequeue
          </button>
          <button
            onClick={front}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Front
          </button>
          <button
            onClick={clear}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Clear
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Queue size: {queue.length} | {queue.length > 0 ? `Front: ${queue[0]}, Rear: ${queue[queue.length - 1]}` : 'Empty'}
        </div>
      </div>

      {/* Visualization */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodesState}
          edges={edgesState}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default QueueVisualizer;
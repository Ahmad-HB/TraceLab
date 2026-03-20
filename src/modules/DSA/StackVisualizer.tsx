import React, { useState, useMemo, useEffect } from 'react';
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

interface StackNode extends Node {
  data: {
    value: number;
    isTop: boolean;
    isHighlighted: boolean;
  };
}

interface StackVisualizerProps {
  selectedAction: string | null;
  currentStep?: number;
  totalSteps?: number;
  isPlaying?: boolean;
  animationSpeed?: number;
  onStepChange?: (step: number) => void;
  onTotalStepsChange?: (total: number) => void;
  onPlayPause?: (isPlaying: boolean) => void;
  onReset?: () => void;
  onStepForward?: () => void;
  onStepBackward?: () => void;
  onSpeedChange?: (speed: number) => void;
}

const StackVisualizer: React.FC<StackVisualizerProps> = ({ 
  selectedAction, 
  currentStep = 0,
  isPlaying = false,
  animationSpeed = 1.0,
  onStepChange, 
  onTotalStepsChange,
  onStepForward
}) => {
  const [stack, setStack] = useState<number[]>([]);
  const [animationSteps, setAnimationSteps] = useState<any[]>([]);
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);

  // Convert stack to React Flow nodes
  const nodes: StackNode[] = useMemo(() => {
    return stack.map((value, index) => ({
      id: `stack-${index}`,
      type: 'stackNode',
      position: { x: 300, y: 400 - (index * 80) },
      data: {
        value,
        isTop: index === stack.length - 1,
        isHighlighted: highlightedNode === `stack-${index}`,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      draggable: false, // Disable dragging
    }));
  }, [stack, highlightedNode]);

  const edges: Edge[] = useMemo(() => {
    const newEdges: Edge[] = [];
    for (let i = 0; i < stack.length - 1; i++) {
      newEdges.push({
        id: `edge-${i}`,
        source: `stack-${i + 1}`,
        target: `stack-${i}`,
        type: 'straight',
        animated: false,
        style: { stroke: '#3b82f6', strokeWidth: 2 },
      });
    }
    return newEdges;
  }, [stack]);

  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);

  // Update nodes when stack changes
  useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  // Update total steps when animation steps change
  useEffect(() => {
    if (onTotalStepsChange) {
      onTotalStepsChange(animationSteps.length);
    }
  }, [animationSteps.length, onTotalStepsChange]);

  // No need for internal step sync since we use external currentStep directly

  // Handle action from sidebar
  useEffect(() => {
    if (!selectedAction) return;

    switch (selectedAction) {
      case 'push':
        handlePush();
        break;
      case 'pop':
        handlePop();
        break;
      case 'peek':
        handlePeek();
        break;
      case 'clear':
        handleClear();
        break;
    }
  }, [selectedAction]);

  const createAnimationSteps = (operation: string, value?: number) => {
    const steps = [];
    
    switch (operation) {
      case 'push':
        steps.push({
          type: 'highlight',
          message: `Preparing to push ${value} onto the stack`,
          highlight: null,
        });
        steps.push({
          type: 'add',
          message: `Pushing ${value} onto the top of the stack`,
          value,
          highlight: `stack-${stack.length}`,
        });
        steps.push({
          type: 'complete',
          message: `${value} has been pushed onto the stack`,
          highlight: null,
        });
        break;
        
      case 'pop':
        if (stack.length === 0) {
          steps.push({
            type: 'error',
            message: 'Cannot pop from empty stack',
            highlight: null,
          });
        } else {
          const topValue = stack[stack.length - 1];
          steps.push({
            type: 'highlight',
            message: `Highlighting top element: ${topValue}`,
            highlight: `stack-${stack.length - 1}`,
          });
          steps.push({
            type: 'remove',
            message: `Popping ${topValue} from the stack`,
            value: topValue,
            highlight: null,
          });
          steps.push({
            type: 'complete',
            message: `${topValue} has been popped from the stack`,
            highlight: null,
          });
        }
        break;
        
      case 'peek':
        if (stack.length === 0) {
          steps.push({
            type: 'error',
            message: 'Cannot peek at empty stack',
            highlight: null,
          });
        } else {
          const topValue = stack[stack.length - 1];
          steps.push({
            type: 'highlight',
            message: `Peeking at top element: ${topValue}`,
            highlight: `stack-${stack.length - 1}`,
          });
          steps.push({
            type: 'complete',
            message: `Top element is: ${topValue}`,
            highlight: null,
          });
        }
        break;
        
      case 'clear':
        if (stack.length === 0) {
          steps.push({
            type: 'message',
            message: 'Stack is already empty',
            highlight: null,
          });
        } else {
          steps.push({
            type: 'highlight',
            message: 'Highlighting all elements to be removed',
            highlight: 'all',
          });
          steps.push({
            type: 'clear',
            message: 'Clearing the entire stack',
            highlight: null,
          });
          steps.push({
            type: 'complete',
            message: 'Stack has been cleared',
            highlight: null,
          });
        }
        break;
    }
    
    return steps;
  };

  const handlePush = () => {
    const value = Math.floor(Math.random() * 100) + 1; // Random value for demo
    const steps = createAnimationSteps('push', value);
    setAnimationSteps(steps);
    if (onStepChange) onStepChange(0);
  };

  const handlePop = () => {
    const steps = createAnimationSteps('pop');
    setAnimationSteps(steps);
    if (onStepChange) onStepChange(0);
  };

  const handlePeek = () => {
    const steps = createAnimationSteps('peek');
    setAnimationSteps(steps);
    if (onStepChange) onStepChange(0);
  };

  const handleClear = () => {
    const steps = createAnimationSteps('clear');
    setAnimationSteps(steps);
    if (onStepChange) onStepChange(0);
  };

  // Execute current step based on external control
  useEffect(() => {
    if (currentStep >= animationSteps.length || animationSteps.length === 0) {
      return;
    }

    const step = animationSteps[currentStep];
    
    // Set highlight
    if (step.highlight === 'all') {
      setHighlightedNode('all');
    } else {
      setHighlightedNode(step.highlight);
    }

    // Execute step action
    switch (step.type) {
      case 'add':
        setStack(prev => [...prev, step.value]);
        break;
      case 'remove':
        setStack(prev => prev.slice(0, -1));
        break;
      case 'clear':
        setStack([]);
        break;
    }

    // Auto-advance if playing
    if (isPlaying && currentStep < animationSteps.length - 1) {
      const delay = Math.max(500, 2000 / animationSpeed); // Speed affects delay
      const timer = setTimeout(() => {
        if (onStepForward) {
          onStepForward();
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep, animationSteps, isPlaying, animationSpeed, onStepForward]);

  // Custom node component for stack elements
  const StackNodeComponent = ({ data }: { data: { value: number; isTop: boolean; isHighlighted: boolean } }) => (
    <div className={`px-4 py-2 rounded-lg border-2 min-w-[80px] text-center transition-all duration-500 ${
      data.isHighlighted 
        ? 'bg-yellow-400 text-black border-yellow-500 shadow-xl scale-110' 
        : data.isTop 
        ? 'bg-blue-500 text-white border-blue-600 shadow-lg' 
        : 'bg-gray-100 text-gray-800 border-gray-300'
    }`}>
      <div className="font-bold text-lg">{data.value}</div>
      {data.isTop && <div className="text-xs mt-1">TOP</div>}
    </div>
  );

  const nodeTypes: NodeTypes = {
    stackNode: StackNodeComponent,
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Status Display */}
      <div className="bg-gray-50 p-4 border-b">
        <h2 className="text-2xl font-bold mb-2">Stack Visualizer</h2>
        {animationSteps.length > 0 && currentStep < animationSteps.length && (
          <div className="text-sm text-gray-600 mb-2">
            Step {currentStep + 1} of {animationSteps.length}: {animationSteps[currentStep].message}
          </div>
        )}
        <div className="text-sm text-gray-600">
          Stack size: {stack.length} | {stack.length > 0 ? `Top: ${stack[stack.length - 1]}` : 'Empty'}
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
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default StackVisualizer;
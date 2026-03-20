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

interface ListNode {
  id: string;
  value: number;
  next: ListNode | null;
}

interface LinkedListNode extends Node {
  data: {
    value: number;
    isHead: boolean;
    isTail: boolean;
  };
}

const LinkedListVisualizer: React.FC = () => {
  const [linkedList, setLinkedList] = useState<ListNode | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [insertPosition, setInsertPosition] = useState<'head' | 'tail'>('head');

  // Convert linked list to React Flow nodes
  const { nodes, edges } = useMemo(() => {
    const flowNodes: LinkedListNode[] = [];
    const flowEdges: Edge[] = [];
    
    let current = linkedList;
    let index = 0;
    const nodePositions: { [key: string]: { x: number; y: number } } = {};

    // First pass: collect all nodes and calculate positions
    while (current) {
      nodePositions[current.id] = {
        x: 100 + (index * 150),
        y: 300,
      };
      current = current.next;
      index++;
    }

    // Second pass: create nodes and edges
    current = linkedList;
    index = 0;
    while (current) {
      flowNodes.push({
        id: current.id,
        type: 'listNode',
        position: nodePositions[current.id],
        data: {
          value: current.value,
          isHead: index === 0,
          isTail: current.next === null,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      });

      if (current.next) {
        flowEdges.push({
          id: `edge-${current.id}`,
          source: current.id,
          target: current.next.id,
          type: 'straight',
          animated: false,
          style: { stroke: '#3b82f6', strokeWidth: 2 },
        });
      }

      current = current.next;
      index++;
    }

    return { nodes: flowNodes, edges: flowEdges };
  }, [linkedList]);

  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);

  // Update nodes when linked list changes
  React.useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

  const insertAtHead = useCallback((value: number) => {
    const newNode: ListNode = {
      id: `node-${Date.now()}`,
      value,
      next: linkedList,
    };
    setLinkedList(newNode);
  }, [linkedList]);

  const insertAtTail = useCallback((value: number) => {
    const newNode: ListNode = {
      id: `node-${Date.now()}`,
      value,
      next: null,
    };

    if (!linkedList) {
      setLinkedList(newNode);
      return;
    }

    let current = linkedList;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
    setLinkedList({ ...linkedList });
  }, [linkedList]);

  const deleteNode = useCallback((value: number) => {
    if (!linkedList) return;

    if (linkedList.value === value) {
      setLinkedList(linkedList.next);
      return;
    }

    let current = linkedList;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      setLinkedList({ ...linkedList });
    }
  }, [linkedList]);

  const search = useCallback((value: number) => {
    let current = linkedList;
    let index = 0;
    while (current) {
      if (current.value === value) {
        alert(`Found ${value} at position ${index}`);
        return;
      }
      current = current.next;
      index++;
    }
    alert(`${value} not found in the list`);
  }, [linkedList]);

  const traverse = useCallback(() => {
    const values: number[] = [];
    let current = linkedList;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    alert(`Traversal: ${values.join(' -> ')}`);
  }, [linkedList]);

  const clear = useCallback(() => {
    setLinkedList(null);
  }, []);

  const handleInsert = useCallback(() => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      if (insertPosition === 'head') {
        insertAtHead(value);
      } else {
        insertAtTail(value);
      }
      setInputValue('');
    }
  }, [inputValue, insertPosition, insertAtHead, insertAtTail]);

  const handleDelete = useCallback(() => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      deleteNode(value);
      setInputValue('');
    }
  }, [inputValue, deleteNode]);

  const handleSearch = useCallback(() => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      search(value);
    }
  }, [inputValue, search]);

  // Custom node component for linked list elements
  const ListNodeComponent = ({ data }: { data: { value: number; isHead: boolean; isTail: boolean } }) => (
    <div className="relative">
      <div className={`px-4 py-2 rounded-lg border-2 min-w-[80px] text-center ${
        data.isHead 
          ? 'bg-green-500 text-white border-green-600 shadow-lg' 
          : data.isTail
          ? 'bg-blue-500 text-white border-blue-600 shadow-lg'
          : 'bg-gray-100 text-gray-800 border-gray-300'
      }`}>
        <div className="font-bold text-lg">{data.value}</div>
        {data.isHead && <div className="text-xs mt-1">HEAD</div>}
        {data.isTail && <div className="text-xs mt-1">TAIL</div>}
      </div>
      {!data.isTail && (
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
      )}
    </div>
  );

  const nodeTypes: NodeTypes = {
    listNode: ListNodeComponent,
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Controls */}
      <div className="bg-gray-50 p-4 border-b">
        <h2 className="text-2xl font-bold mb-4">Linked List Visualizer</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="px-3 py-2 border rounded-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
            />
            <select
              value={insertPosition}
              onChange={(e) => setInsertPosition(e.target.value as 'head' | 'tail')}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="head">Head</option>
              <option value="tail">Tail</option>
            </select>
            <button
              onClick={handleInsert}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Insert
            </button>
          </div>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
          <button
            onClick={traverse}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Traverse
          </button>
          <button
            onClick={clear}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Clear
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          List size: {nodes.length} | {nodes.length > 0 ? `Head: ${nodes[0]?.data.value}, Tail: ${nodes[nodes.length - 1]?.data.value}` : 'Empty'}
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

export default LinkedListVisualizer;
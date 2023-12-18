import React, { useCallback, useState, useEffect, useMemo} from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, ReactFlowProvider, Background, BackgroundVariant} from 'reactflow';
import { Handle, Position } from 'reactflow';
import {cardServicesStyles} from "/src/constants";
import TriggerNode from "./graph/TriggerNode.jsx";
import AddNode from "./graph/AddNode.jsx";
import ActionNode from "./graph/ActionNode.jsx";
import CustomEdge from "./graph/CustomEdge.jsx";
import AddModal from "./graph/AddModal.jsx";
import SideBarSettings from "./SideBarSettings.jsx";

import 'reactflow/dist/base.css';
import {useWorkflowContext} from "../context/workflowContext.jsx";

function getNodeTriggerFromData(serviceName, serviceTrigger) {
    const bgColor = cardServicesStyles[serviceName].backgroundColor || cardServicesStyles["default"].backgroundColor;
    const logo = cardServicesStyles[serviceName].iconPath || cardServicesStyles["default"].iconPath;

    return {
        id: '0',
        type: 'trigger',
        data: { serviceName: serviceName, serviceTrigger: serviceTrigger, color: bgColor, logo: logo, id: '0' },
        position: { x: 0, y: 50 },
    }
}

const edgeTypes = {
    default: CustomEdge,
}

const initNodes = [
    {
        id: '-1',
        type: 'add',
        data : {},
        position: { x: 50, y: 400 },
    },
];



const initEdges = [
    {
        id: 'e1-2',
        source: '0',
        target: '-1',
    }
];

const proOptions = { hideAttribution: true };



const GraphEditor = ({startingTrigger, workflowId, workflowName, workflowDescription}) => {

    const initialTriggerNode = [getNodeTriggerFromData(startingTrigger.serviceName, startingTrigger.description)];
    const initialNodes = [...initialTriggerNode, ...initNodes];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    const { isAddModalOpen, toggleAddModal, isSidebarSettingsOpen, toggleSidebarSettings, workflow, setWorkflow, } = useWorkflowContext();
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [startClosing, setStartClosing] = useState(false);

    useEffect(() => {
        const triggerNodeData = getNodeTriggerFromData(startingTrigger.serviceName, startingTrigger.description);

        const triggerNodeDataForWorkflow = {
            id: triggerNodeData.id,
            type: triggerNodeData.type,
            type_action: startingTrigger.description,
            service: startingTrigger.serviceName,
        };

        setWorkflow(prevWorkflow => {
            const exists = prevWorkflow.some(node => node.id === triggerNodeData.id);
            if (!exists) {
                return [...prevWorkflow, triggerNodeDataForWorkflow];
            }
            return prevWorkflow;
        });
    }, []);

    const onNodeDoubleClick = (event, node) => {
        setSelectedNode(node);
        setSelectedNodeId(node.id);
        toggleSidebarSettings();
    };

    const updateNodePosition = (nodeId, newPosition) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === nodeId) {
                    return { ...node, position: { ...newPosition } };
                }
                return node;
            })
        );
    };

    useEffect(() => {
        if (selectedNodeId) {
            const updatedNode = nodes.find((n) => n.id === selectedNodeId);
            setSelectedNode(updatedNode);
        }
    }, [nodes, selectedNodeId]);

    const onCanvasClick = () => {
        if (isSidebarSettingsOpen) {
            setStartClosing(true);
        }
    };



    const handleNewAction = (service) => {
        const addNodeIndex = nodes.findIndex(node => node.id === '-1');
        const addNode = nodes[addNodeIndex];
        const newPosition = addNode.position;

        const newNodeId = `${nodes.length + 1}`;
        const newNode = {
            id: newNodeId,
            type: 'action',
            data: {
                serviceName: service.serviceName,
                serviceAction: service.description,
                color: cardServicesStyles[service.serviceName]?.backgroundColor || cardServicesStyles["default"].backgroundColor,
                logo: cardServicesStyles[service.serviceName]?.iconPath || cardServicesStyles["default"].iconPath,
                id: newNodeId,
            },
            position: newPosition
        };

        const newNodeDataForWorkflow = {
            id: newNodeId,
            type: 'action',
            type_action: service.description,
            service: service.serviceName,
            conditions: [],
            params: {},
            next_id: null,
        }

        setWorkflow(prevWorkflow => {
            const exists = prevWorkflow.some(node => node.id === newNodeId);
            if (!exists) {
                return [...prevWorkflow, newNodeDataForWorkflow];
            }
            return prevWorkflow;
        });

        const updatedEdges = edges.map(edge => {
            if (edge.target === '-1') {
                return { ...edge, target: newNodeId };
            }
            return edge;
        });

        const newEdge = {
            id: `e${newNodeId}-1`,
            source: newNodeId,
            target: '-1'
        };

        const updatedAddNode = {
            ...addNode,
            position: { x: addNode.position.x, y: addNode.position.y + 400 }
        };

        let updatedNodes = [...nodes];
        updatedNodes[addNodeIndex] = updatedAddNode;
        updatedNodes = updatedNodes.concat(newNode);

        setNodes(updatedNodes);
        setEdges([...updatedEdges, newEdge]);

        toggleAddModal();
    };


    const TriggerNodeComponent = ({ data, id }) => (
        <TriggerNode data={data} nodeId={id} />
    );

    const ActionNodeComponent = ({ data, id }) => (
        <ActionNode data={data} nodeId={id} />
    );

    const nodeTypes = useMemo(() => ({
        trigger: TriggerNode,
        add: (nodeProps) => <AddNode {...nodeProps} onAddClick={toggleAddModal} />,
        action: ActionNode,
    }), []);

    useEffect(() => {
        if (isAddModalOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isAddModalOpen]);

    return (
        <div className="w-full h-[94vh]">
            <div className={` w-full h-[94vh] relative ${isAddModalOpen ? 'blur-sm' : ''}`}>
            <ReactFlowProvider>
            <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    fitView
                    proOptions={proOptions}
                    onNodeDoubleClick={onNodeDoubleClick}
                    onPaneClick={onCanvasClick}
            >
                <Background
                    id="1"
                    gap={50}
                    color={"#9A77EC"}
                    variant={BackgroundVariant.Dots}
                />
                <Controls className="bg-white fill-dark-purple"/>
                </ReactFlow>
            </ReactFlowProvider>
            </div>
            {isAddModalOpen && (
                <AddModal onSelect={handleNewAction} onClose={toggleAddModal} />
            )}
            {isSidebarSettingsOpen && selectedNode && (
                <SideBarSettings
                    node={selectedNode}
                    onClose={() => {
                        setStartClosing(false);
                        toggleSidebarSettings();
                    }}
                    updateNodePosition={updateNodePosition} //
                    startClosing={startClosing}
                />
            )}
        </div>
    );
}

export default GraphEditor;
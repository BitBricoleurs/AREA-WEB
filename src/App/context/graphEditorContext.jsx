import React, { useContext, useState, createContext } from 'react';
import {useEdgesState, useNodesState} from "reactflow";
import {cardServicesStyles} from "../../constants/index.js";
import {initEdges, initNodes} from "/src/constants/InitGraph.jsx";
import {useWorkflowContext} from "./workflowContext.jsx";

const GraphEditorContext = createContext();

export const GraphEditorContextProvider = React.memo(({ children, startingTrigger}) => {

    const {addWorkflowNode, toggleAddModal} = useWorkflowContext()

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

    function handleSetSelectedTrigger(startingTrigger, setWorkflow) {


        const triggerNodeData = getNodeTriggerFromData(startingTrigger.serviceName, startingTrigger.description);

        const triggerNodeDataForWorkflow = {
            id: triggerNodeData.id,
            type: triggerNodeData.type,
            type_action: startingTrigger.description,
            service: startingTrigger.serviceName,
            next_id: null,
            conditions: [],
            params: [],
        };


        setWorkflow(prevWorkflow => {
            const exists = prevWorkflow.some(node => node.id === triggerNodeData.id);
            if (!exists) {
                return [...prevWorkflow, triggerNodeDataForWorkflow];
            }
            return prevWorkflow;
        });
    }


    const initialTriggerNode = [getNodeTriggerFromData(startingTrigger.serviceName, startingTrigger.description)];
    const initialNodes = [...initialTriggerNode, ...initNodes];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
    const [clickedNode, setClickedNode] = useState(null);

    const addNode = (newNode) => {
        setNodes((prevNodes) => [...prevNodes, newNode]);
    };

    const addEdge = (newEdge) => {
        setEdges((prevEdges) => {
            if (!Array.isArray(prevEdges)) {
                newEdge.id = `e-${newEdge.source}-${newEdge.target}`;
                return [newEdge];
            }

            const newEdgeId = `e-${newEdge.source}-${newEdge.sourceHandle}-${newEdge.target}-${newEdge.targetHandle}`;
            newEdge.id = newEdgeId;
            newEdge.type = newEdge.sourceHandle;

            const edgeExists = prevEdges.some(edge => edge.id === newEdgeId);


            return edgeExists ? prevEdges : [...prevEdges, newEdge];
        });
    };

    const replaceNode = (clickedNode, newNode) => {
        setNodes((prevNodes) => {
            const nodeIndex = prevNodes.findIndex(node => node.id === clickedNode.id);
            if (nodeIndex === -1) return prevNodes;

            const updatedNewNode = { ...newNode, clickedNode };

            return [
                ...prevNodes.slice(0, nodeIndex),
                updatedNewNode,
                ...prevNodes.slice(nodeIndex + 1)
            ];
        });

        setEdges((prevEdges) => {
            return prevEdges.map(edge => {
                if (edge.source === clickedNode.id) {
                    return { ...edge, source: newNode.id };
                } else if (edge.target === clickedNode.id) {
                    return { ...edge, target: newNode.id };
                }
                return edge;
            });
        });
    };

    const addNodeAddAtHandle = (sourceNode, sourceHandleId, callNumber = 1, newX = 0) => {
        const minNegativeId = Math.min(...nodes.map(node => parseInt(node.id)).filter(id => id < 0), -1);
        const newNodeId = `${minNegativeId - callNumber}`;

        const newPosition = {
            x: sourceNode.position.x + newX,
            y: sourceNode.position.y + 400
        };

        const newNode = {
            id: newNodeId,
            type: 'add',
            data: {},
            position: newPosition
        };

        addNode(newNode);

        const newEdge = {
            id: `e-${sourceNode.id}-${sourceHandleId}-${newNodeId}`,
            source: sourceNode.id,
            sourceHandle: sourceHandleId,
            target: newNodeId,
        };

        addEdge(newEdge);
    };




    const handleNewAction = (service, clickedNode) => {
        const newPosition = {x : clickedNode.xPos, y: clickedNode.yPos}


        const newNodeId = `${nodes.length}`;
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
                next_id: null,
                params: [],
                conditions: [],
           }

        replaceNode(clickedNode, newNode);
        addWorkflowNode(newNodeDataForWorkflow);
        addNodeAddAtHandle(newNode, null)

        toggleAddModal();
    };

    const handleNewCondition = (service, clickedNode) => {

        const newPosition = {x : clickedNode.xPos, y: clickedNode.yPos}
        const newNodeId = `${nodes.length}`;

        const newNode = {
            id: newNodeId,
            type: 'condition',
            data: {
                serviceName: service.serviceName,
                serviceAction: service.description,
                color: cardServicesStyles[service.serviceName]?.backgroundColor || cardServicesStyles["default"].backgroundColor,
                logo: cardServicesStyles[service.serviceName]?.iconPath || cardServicesStyles["default"].iconPath,
                id: newNodeId,
            },
            position: newPosition
        };

        const conditionNodeDataForWorkflow = {
            id: newNodeId,
            type: 'condition',
            type_action: 'Condition',
            service: 'System',
            next_id_src_success: null,
            next_id_src_fail: null,
        };

        replaceNode(clickedNode, newNode);
        addWorkflowNode(conditionNodeDataForWorkflow);
        addNodeAddAtHandle(newNode, "true", 1)
        addNodeAddAtHandle(newNode, "false", 2, 150)
        toggleAddModal();
    }

    return (
        <GraphEditorContext.Provider value={{ nodes, setNodes, edges, setEdges, addNode, addEdge, onNodesChange, onEdgesChange, getNodeTriggerFromData, handleSetSelectedTrigger, replaceNode, clickedNode, setClickedNode, handleNewAction, handleNewCondition}}>
            {children}
        </GraphEditorContext.Provider>
    );
});

export const useGraphEditorContext = () => {
    const context = useContext(GraphEditorContext);
    if (context === undefined) {
        throw new Error("useGraphEditorContext doit être utilisé au sein d'un GraphEditorContextProvider");
    }
    return context;
};

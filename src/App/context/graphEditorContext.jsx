import React, { useContext, useState, createContext } from 'react';
import {useEdgesState, useNodesState} from "reactflow";
import {cardServicesStyles} from "../../constants/index.js";
import {initEdges, initNodes} from "/src/constants/InitGraph.jsx";
import {useWorkflowContext} from "./workflowContext.jsx";
import {data} from "autoprefixer";

const GraphEditorContext = createContext();

export const GraphEditorContextProvider = React.memo(({ children, startingTrigger}) => {

    const {addWorkflowNode, toggleAddModal, isLoaded, workflow} = useWorkflowContext()

    const convertWorkflowToNodes = (workflowData) => {

        let nodes = [];

        workflowData.forEach((node) => {
            let nodeData;
            if (node.type === 'trigger') {
                nodeData = { serviceTrigger: node.type_trigger };
            } else if (node.type === 'action') {
                nodeData = { serviceAction: node.type_action };
            }

            const newNode = {
                id: node.id.toString(),
                type: node.type,
                data: {
                    ...nodeData,
                    serviceName: node.service,
                    color: cardServicesStyles[node.service]?.backgroundColor || cardServicesStyles["default"].backgroundColor,
                    logo: cardServicesStyles[node.service]?.iconPath || cardServicesStyles["default"].iconPath,
                    id: node.id.toString(),
                },
                position: { x: 0, y: 50 },
            };
            nodes.push(newNode);
        });
        console.log("nodes toNodes: ", nodes)
        return nodes;
    };

    const convertWorkflowToEdges = (workflowData) => {
        let edges = [];

        workflowData.forEach((node) => {
            if (node.type === 'condition') {
                if (node.next_id_src_success !== null && node.next_id_src_success !== undefined && node.next_id_src_success !== -1) {
                    edges.push({
                        id: `e-${node.id}-true-${node.next_id_src_success}`,
                        source: node.id.toString(),
                        sourceHandle: 'true',
                        target: node.next_id_src_success.toString(),
                        type : 'true'
                    });
                }
                if (node.next_id_src_fail !== null && node.next_id_src_fail !== undefined && node.next_id_src_fail !== -1) {
                    edges.push({
                        id: `e-${node.id}-false-${node.next_id_src_fail}`,
                        source: node.id.toString(),
                        sourceHandle: 'false',
                        target: node.next_id_src_fail.toString(),
                        type : 'false'
                    });
                }
            } else {
                if (node.next_id !== null && node.next_id !== undefined && node.next_id !== -1) {
                    edges.push({
                        id: `e-${node.id}-default-${node.next_id}`,
                        source: node.id.toString(),
                        sourceHandle: null,
                        target: node.next_id.toString(),
                    });
                }
            }
        });

        return edges;
    };





    let initialNodes = [];
    let initialEdges = [];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [clickedNode, setClickedNode] = useState(null);

    console.log("nodes: ", nodes)
    console.log("edges: ", edges)
    const addAddNodeToWorkflow = (nodes) => {
            workflow.forEach(node => {
            if (node.next_id == -1) {
                const sourceNode = nodes.find(n => n.id == node.id);
                console.log("sourceNode: ", sourceNode)
                console.log("nodes: ", nodes)
                console.log("node id: ", node.id)
                if (sourceNode) {
                    console.log("sourceNode: ", sourceNode)
                    addNodeAddAtHandle(sourceNode, null);
                }
            }
        });
    };

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
            const nodeIndex = prevNodes.findIndex(node => node.id == clickedNode.id);
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
                if (edge.source == clickedNode.id) {
                    return { ...edge, source: newNode.id };
                } else if (edge.target == clickedNode.id) {
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


        const newNodeId = `${workflow.length}`;
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
        const newNodeId = `${workflow.length}`;

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
            type_condition: '',
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
        <GraphEditorContext.Provider value={{ nodes, setNodes, edges, setEdges, addNode, addEdge, onNodesChange, onEdgesChange, replaceNode, clickedNode, setClickedNode, handleNewAction, handleNewCondition, convertWorkflowToNodes, convertWorkflowToEdges, addAddNodeToWorkflow}}>
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

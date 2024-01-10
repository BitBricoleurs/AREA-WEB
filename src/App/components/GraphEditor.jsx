import React, { useCallback, useState, useEffect, useMemo, useRef} from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    applyNodeChanges,
    Controls,
    ReactFlowProvider,
    Background,
    BackgroundVariant,
    updateEdge
} from 'reactflow';

import { Handle, Position } from 'reactflow';
import { cardServicesStyles } from '../../constants/index';
import TriggerNode from "./graph/TriggerNode.jsx";
import AddNode from "./graph/AddNode.jsx";
import ActionNode from "./graph/ActionNode.jsx";
import {CustomEdge, CustomEdgeFalse, CustomEdgeTrue} from "./graph/CustomEdge.jsx";
import AddModal from "./graph/AddModal.jsx";
import ConditionNode from "./graph/ConditionNode.jsx";
import SideBarSettings from "./SideBarSettings.jsx";
import InteractBurger from "./graph/InteractBurger.jsx";
import GenerateGraph from "./graph/GenerateGraph.jsx";

import useGraphEditorHandlers from './graph/useGraphEditorHandlers';

import 'reactflow/dist/base.css';
import {useWorkflowContext} from "../context/workflowContext.jsx";
import {useGraphEditorContext} from "../context/graphEditorContext.jsx";

const edgeTypes = {
    default: CustomEdge,
    true: CustomEdgeTrue,
    false : CustomEdgeFalse
}


const proOptions = { hideAttribution: true };

const GraphEditor = ({startingTrigger, workflowId}) => {

    const { nodes, setNodes, edges, setEdges, addEdge, onEdgesChange, handleNewAction, handleNewCondition, setClickedNode, clickedNode} = useGraphEditorContext();


    const onConnect = (params) => {
        addEdge(params);
    };


    const { isAddModalOpen, toggleAddModal, isSidebarSettingsOpen, toggleSidebarSettings, workflow, setWorkflow, updateWorkflowNode, isBurgerOpen, setBurgerOpen} = useWorkflowContext();
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [startClosing, setStartClosing] = useState(false);

    const { modifiedOnNodesChange, handleEdges } = useGraphEditorHandlers();
    const { loadWorkflow, setLoadingState, loadingState } = useWorkflowContext();
    const { convertWorkflowToNodes, convertWorkflowToEdges, addAddNodeToWorkflow } = useGraphEditorContext();


    useEffect(() => {
        setLoadingState("fetching");
        loadWorkflow(workflowId).then(() => {
            setLoadingState("done");
        }).catch(error => {
            console.error("Erreur lors du chargement:", error);
            setLoadingState("none");
        });
    }, [workflowId]);

    useEffect(() => {
        if (loadingState === "done") {
            const newNodes = convertWorkflowToNodes(workflow);
            setNodes(newNodes);
            setEdges(convertWorkflowToEdges(workflow));
            addAddNodeToWorkflow(newNodes);
        }
    }, [loadingState]);

    useEffect(() => {
        console.log("edges: ", edges)
        if (workflow.length === 0 || edges === 0) {
            return;
        }
        const updatedWorkflow = handleEdges(workflow, edges)
        setWorkflow(updatedWorkflow);
    } , [edges]);

    const onNodeDoubleClick = (event, node) => {
        setSelectedNode(node);
        setSelectedNodeId(node.id);
        toggleSidebarSettings();
    };

    const updateNodePosition = (nodeId, newPosition) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id == nodeId) {
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
    }, [selectedNodeId]);

    const onCanvasClick = () => {
        if (isSidebarSettingsOpen) {
            setStartClosing(true);
        }
        if (isBurgerOpen) {
            setBurgerOpen(false);
        }
    };

    const nodeTypes = useMemo(() => ({
        trigger: TriggerNode,
        add: (nodeProps) => <AddNode {...nodeProps} onAddClick={() => {
            toggleAddModal();
            console.log("nodeProps: ", nodeProps)
            setClickedNode(nodeProps);
        }} />,
        action: ActionNode,
        condition: ConditionNode,
    }), []);

    useEffect(() => {
        console.log("useEffect modal:", isAddModalOpen);
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
                <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={modifiedOnNodesChange}
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
                    <InteractBurger/>
                    <GenerateGraph/>
                    </ReactFlow>
                </div>
                {isAddModalOpen && (
                    <AddModal onSelectAction={handleNewAction} onSelectCondition={handleNewCondition} onClose={toggleAddModal} clickedNode={clickedNode} />
                )}
                {isSidebarSettingsOpen && selectedNode && (
                    <SideBarSettings
                        node={selectedNode}
                        onClose={() => {
                            setStartClosing(false);
                            toggleSidebarSettings();
                        }}
                        updateNodePosition={updateNodePosition}
                        startClosing={startClosing}
                    />
                )}
            </div>
    );
}

export default GraphEditor;
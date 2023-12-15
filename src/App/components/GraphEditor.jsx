import React, { useCallback, useState} from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, ReactFlowProvider, Background, BackgroundVariant} from 'reactflow';
import { Handle, Position } from 'reactflow';
import {cardServicesStyles} from "/src/constants";
import TriggerNode from "./graph/TriggerNode.jsx";
import AddNode from "./graph/AddNode.jsx";
import ActionNode from "./graph/ActionNode.jsx";
import CustomEdge from "./graph/CustomEdge.jsx";

import 'reactflow/dist/base.css';

function getNodeTriggerFromData(serviceName, serviceTrigger) {
    const bgColor = cardServicesStyles[serviceName].backgroundColor || cardServicesStyles["default"].backgroundColor;
    const logo = cardServicesStyles[serviceName].iconPath || cardServicesStyles["default"].iconPath;

    return {
        id: '0',
        type: 'trigger',
        data: { serviceName: serviceName, serviceTrigger: serviceTrigger, color: bgColor, logo: logo },
        position: { x: 0, y: 50 },
    }
}



const nodeTypes = {
    trigger: TriggerNode,
    add: (nodeProps) => <AddNode {...nodeProps} onAddClick={() => {console.log("ez")}} />,
    action: ActionNode,
};

const edgeTypes = {
    default: CustomEdge,
}

const initNodes = [
    {
        id: '4',
        type: 'add',
        data : {},
        position: { x: 50, y: 400 },
    },
    {
        id: '5',
        type: 'action',
        data: { serviceName: "Outlook", serviceAction: "Email", color: cardServicesStyles["Outlook"].backgroundColor, logo: cardServicesStyles["Outlook"].iconPath },
        position: { x: 0, y: 50 },
    }
];



const initEdges = [
    {
        id: 'e1-2',
        source: '0',
        target: '4',
    }
];

const proOptions = { hideAttribution: true };


const GraphEditor = ({startingTrigger, workflowId, workflowName, workflowDescription}) => {

    const initialTriggerNode = [getNodeTriggerFromData(startingTrigger.serviceName, startingTrigger.description)];
    const initialNodes = [...initialTriggerNode, ...initNodes];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    const [isAddModalOpen, setAddModalOpen] = useState(false);



    return (
        <div className="w-full h-[94vh]">
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
    );
}

export default GraphEditor;
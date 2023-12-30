import { useCallback } from 'react';
import { applyNodeChanges } from 'reactflow';
import { useGraphEditorContext } from '/src/App/context/graphEditorContext';
import {useWorkflowContext} from "/src/App/context/workflowContext.jsx";

const useGraphEditorHandlers = () => {
    const { nodes, setNodes, edges, setEdges } = useGraphEditorContext();
    const { workflow, setWorkflow } = useWorkflowContext();
    const { variables, setVariables } = useWorkflowContext();
    console.log("variables: ", variables)
    console.log("workflow: ", workflow)

    const handleDeleteNode = useCallback((changes) => {
        const invinsibleNodeTypes = ['trigger', 'add'];

        return changes.filter((change) => {
            if (change.type === 'remove') {
                const nodeToRemove = nodes.find(node => node.id == change.id);
                if (invinsibleNodeTypes.includes(nodeToRemove?.type)) {
                    return false;
                }
                const updatedVariables = variables.filter(variable => variable.refers !== change.id);
                setVariables(updatedVariables);
            }
            return true;
        });
    }, [nodes]);

    const modifiedOnNodesChange = useCallback((changes) => {
        const filteredChanges = handleDeleteNode(changes);
        setNodes((nds) => applyNodeChanges(filteredChanges, nds));
    }, [handleDeleteNode, setNodes]);


    const handleEdges = (workflow, edges) => {
        return workflow.map(node => {
            if (node.type === 'condition') {
                console.log("Find condition node: ", node)
                const trueEdge = edges.find(edge => edge.source === node.id && edge.sourceHandle === 'true');
                const falseEdge = edges.find(edge => edge.source === node.id && edge.sourceHandle === 'false');
                return {
                    ...node,
                    next_id_src_success: (trueEdge && parseInt(trueEdge.target) >= 0) ? trueEdge.target : null,
                    next_id_src_fail: (falseEdge && parseInt(falseEdge.target) >= 0) ? falseEdge.target : null,
                };
            } else {
                const connectedEdge = edges.find(edge => edge.source === node.id);
                return {
                    ...node,
                    next_id: (connectedEdge && parseInt(connectedEdge.target) >= 0) ? connectedEdge.target : null,
                };
            }
        });
    };


    return { modifiedOnNodesChange, handleEdges };
};

export default useGraphEditorHandlers;

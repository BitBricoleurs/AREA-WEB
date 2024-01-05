import React from 'react';
import { useContext, useState, createContext } from "react";
import {useGraphEditorContext} from "./graphEditorContext.jsx";

const WorkflowContext = createContext();

export const WorkflowContextProvider = ({children }) => {
    const [trigger, setTrigger] = useState({});
    const [workflow, setWorkflow] = useState([]);
    const [variables, setVariables] = useState([]);
    const [workflowId, setWorkflowId] = useState('');
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isSidebarSettingsOpen, setSidebarSettingsOpen] = useState(false);
    const [isBurgerOpen, setBurgerOpen] = useState(false);
    const [workflowName, setWorkflowName] = useState('');
    const [workflowDescription, setWorkflowDescription] = useState('');
    const [loadingState, setLoadingState] = useState("none");


    const toggleAddModal = () => {
        setAddModalOpen(!isAddModalOpen);
    };

    const toggleSidebarSettings = () => {
        setSidebarSettingsOpen(!isSidebarSettingsOpen);
    };

    const updateNodeInWorkflow = (nodeId, newNodeData) => {
        setWorkflow((prevWorkflow) => {
            return prevWorkflow.map(node =>
                node.id == nodeId ? { ...node, ...newNodeData } : node
            );
        });
    };

    function addTriggerIntoWorkflow(selectedTrigger) {

        const triggerNodeDataForWorkflow = {
            id: 0,
            type: 'trigger',
            type_action: selectedTrigger.description,
            service: selectedTrigger.serviceName,
            next_id: null,
            conditions: [],
            params: [],
        };

        setWorkflow(prevWorkflow => {
                return [...prevWorkflow, triggerNodeDataForWorkflow];
        });
        return [triggerNodeDataForWorkflow];
    }

    const createWorkflow = async (selectedTrigger) => {
        const tmpWorkflow = addTriggerIntoWorkflow(selectedTrigger);
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}create-workflow`, {
            method: 'POST',
            headers: {
                'ngrok-skip-browser-warning': true,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            },
            body: JSON.stringify({
                'name_workflow': workflowName,
                'description': workflowDescription,
                'workflow': tmpWorkflow,
                'variables': []
            }),
        });
        console.log("Sent workflow: ", tmpWorkflow)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWorkflowId(data.workflow_id);
        setWorkflow(tmpWorkflow);
        return data;
    }

    const createSendableWorkflow = () => {
        const modifiedWorkflow = workflow.map(node => {
            if (node.type === 'trigger' && node.type_trigger) {
                return {
                    ...node,
                    type_action: node.type_trigger,
                    type_trigger: undefined
                };
            }
            return node;
        });

        return modifiedWorkflow;
    };

    const editWorkflow = async () => {
        const sendableWorkflow = createSendableWorkflow();
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}edit-workflow/${workflowId}`, {
            method: 'PUT',
            headers: {
                'ngrok-skip-browser-warning': '69420',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            },
            body: JSON.stringify({
                'name_workflow': workflowName,
                'description': workflowDescription,
                'workflow': sendableWorkflow,
                'variables': variables
            }),
        });
        console.warn("Sent workflow: ", workflow)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }

    const loadWorkflow = async (workflowId) => {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}get-workflow/${workflowId}`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': true,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();


        setWorkflowName(data.name_workflow);
        setWorkflowDescription(data.description);
        setWorkflow(data.workflow);
        setVariables(data.variables);
        setWorkflowId(workflowId)
        console.log("When fetching: ", data)
        return data;
    }

    const updateWorkflowNode = (nodeId, newData) => {
        setWorkflow(prevWorkflow => {
            return prevWorkflow.map(node => {
                if (node.id == nodeId) {
                    return { ...node, ...newData };
                }
                return node;
            });
        });
    };

    const addWorkflowNode = (node) => {
        setWorkflow(prevWorkflow => {
            if (prevWorkflow.some(n => n.id == node.id)) {
                return prevWorkflow;
            }
            return [...prevWorkflow, node];
        });
    }

    return (
        <WorkflowContext.Provider
            value={{
                trigger,
                setTrigger,
                workflow,
                setWorkflow,
                variables,
                setVariables,
                workflowId,
                setWorkflowId,
                isAddModalOpen,
                toggleAddModal,
                isSidebarSettingsOpen,
                toggleSidebarSettings,
                updateNodeInWorkflow,
                workflowName,
                setWorkflowName,
                workflowDescription,
                setWorkflowDescription,
                updateWorkflowNode,
                addWorkflowNode,
                createWorkflow,
                editWorkflow,
                loadWorkflow,
                loadingState,
                setLoadingState,
                isBurgerOpen,
                setBurgerOpen,
            }}
        >
            {children}
        </WorkflowContext.Provider>
    );
};

export const useWorkflowContext = () => {
    const context = useContext(WorkflowContext);
    if (context === undefined)
        throw new Error("Context must be used within a context provider");
    return context;
};
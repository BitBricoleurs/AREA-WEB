import React from 'react';
import { useContext, useState, createContext } from "react";

const WorkflowContext = createContext();

export const WorkflowContextProvider = ({children }) => {
    const [trigger, setTrigger] = useState({});
    const [workflow, setWorkflow] = useState([]);
    const [variables, setVariables] = useState([]);
    const [workflowId, setWorkflowId] = useState('');
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isSidebarSettingsOpen, setSidebarSettingsOpen] = useState(false);
    const [workflowName, setWorkflowName] = useState('');
    const [workflowDescription, setWorkflowDescription] = useState('');

    const toggleAddModal = () => {
        setAddModalOpen(!isAddModalOpen);
    };

    const toggleSidebarSettings = () => {
        setSidebarSettingsOpen(!isSidebarSettingsOpen);
    };

    const updateNodeInWorkflow = (nodeId, newNodeData) => {
        setWorkflow((prevWorkflow) => {
            return prevWorkflow.map(node =>
                node.id === nodeId ? { ...node, ...newNodeData } : node
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

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("The worflow sent is : ", tmpWorkflow)
        const data = await response.json();
        setWorkflowId(data.workflow_id);
        console.log(data);
        const test = await loadWorkflow(data.workflow_id);
        return data;
    }

    const editWorkflow = async () => {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}edit-workflow/${workflowId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            },
            body: {
                "name_workflow": workflowName,
                "description" : workflowDescription,
                "workflow": workflow,
                "variables": variables
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);
        return data;
    }

    const loadWorkflow = async (workflowId) => {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}get-workflow/${workflowId}`, {
            method: 'GET',
            headers: {
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

        console.log(data);
        return data;
    }

    const updateWorkflowNode = (nodeId, newData) => {
        setWorkflow(prevWorkflow => {
            return prevWorkflow.map(node => {
                if (node.id === nodeId) {
                    return { ...node, ...newData };
                }
                return node;
            });
        });
    };

    const addWorkflowNode = (node) => {
        setWorkflow(prevWorkflow => {
            if (prevWorkflow.some(n => n.id === node.id)) {
                return prevWorkflow;
            }
            return [...prevWorkflow, node];
        });
    }

    console.log("workflow: ", workflow)


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
                createWorkflow
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
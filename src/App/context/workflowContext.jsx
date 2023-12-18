import { useContext, useState, createContext } from "react";

const WorkflowContext = createContext();

export const WorkflowContextProvider = ({children }) => {
    const [trigger, setTrigger] = useState({});
    const [workflow, setWorkflow] = useState([]);
    const [variables, setVariables] = useState([]);
    const [workflowId, setWorkflowId] = useState('');
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isSidebarSettingsOpen, setSidebarSettingsOpen] = useState(false);

    const toggleAddModal = () => {
        setAddModalOpen(!isAddModalOpen);
    };

    console.log("workflow", workflow);

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

    const fetchTrigger = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/triggers`
        );
        const data = await response.json();
        setTrigger(data);
        setWorkflowId(data.workflow);
    };

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
                fetchTrigger,
                setWorkflowId,
                isAddModalOpen,
                toggleAddModal,
                isSidebarSettingsOpen,
                toggleSidebarSettings,
                updateNodeInWorkflow,
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
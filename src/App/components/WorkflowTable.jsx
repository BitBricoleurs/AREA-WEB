import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

const initialSortState = {
    key: 'id',
    direction: 'asc',
};

const WorkflowTable = ({ workflows, toggleWorkflowSelection }) => {
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [activeStatus, setActiveStatus] = useState({}
    );
    const [sortConfig, setSortConfig] = useState(initialSortState);
    const [sortedWorkflows, setSortedWorkflows] = useState([...workflows]);

    useEffect(() => {
        const updatedStatus = workflows.reduce((status, workflow) => {
            status[workflow.id] = workflow.state === 'Active';
            return status;
        }, {});
        setActiveStatus(updatedStatus);
    }, [workflows]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdownId && !event.target.closest(`[data-dropdown-id="${openDropdownId}"]`)) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openDropdownId]);

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const toggleActiveState = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/toggle-workflow/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            setActiveStatus((prevStatus) => ({
                ...prevStatus,
                [id]: !prevStatus[id]
            }));
        } catch (error) {
            console.error('Error toggling workflow active state:', error);
        } finally {
            setOpenDropdownId(null);
        }
    };


    useEffect(() => {
        setSortedWorkflows([...workflows]);
    }, [workflows]);

    useEffect(() => {
        const getSortedData = () => {
            const sortedData = [...workflows];
            if (sortConfig.direction !== 'none' && sortConfig.key) {
                sortedData.sort((a, b) => {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'asc' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'asc' ? 1 : -1;
                    }
                    return 0;
                });
            }
            return sortedData;
        };

        setSortedWorkflows(getSortedData());
    }, [sortConfig, workflows]);

    const requestSort = (key) => {
        setSortConfig((currentSortConfig) => {
            if (currentSortConfig.key === key) {
                return {
                    key,
                    direction:
                        currentSortConfig.direction === 'asc'
                            ? 'desc'
                            : currentSortConfig.direction === 'desc'
                                ? 'none'
                                : 'asc',
                };
            }
            return { key, direction: 'asc' };
        });
    };


    const SortArrow = ({ direction }) => {
        return (
            <div className="flex justify-center items-center" style={{ width: '20px', height: '20px' }}>
                {direction === 'asc' && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 13.5V0.5" stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.5 4L7 0.5L10.5 4" stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
                {direction === 'desc' && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0.5V13.5" stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.5 10L7 13.5L10.5 10" stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
                {direction === 'none' && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.07092 14.8492V3.53553" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.54594 6.0105L7.07107 3.53562L4.59619 6.0105" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.7277 4.94984V16.2635" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.2529 13.7886L12.7278 16.2634L15.2027 13.7886" stroke="#A9A9A9" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                )}
            </div>
        );
    };


    const handleCheckboxChange = (id) => {
        toggleWorkflowSelection(id);
    };

    return (
        <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-center text-custom-grey bg-contrast-box-color rounded-lg border border-contrast-box-color">
                <thead className="text-xs uppercase bg-box-color border-b border-contrast-box-color text-custom-grey">
                <tr>
                    <th className="py-3 px-6">Select</th>
                    <th
                        onClick={() => requestSort('id')}
                        className="py-3 px-6 cursor-pointer flex-row justify-center items-center"
                    >
                        <div className="flex flex-row justify-center items-center">
                            <span className="mr-2">ID</span>
                            <SortArrow direction={sortConfig.key === 'id' ? sortConfig.direction : 'none'} />
                        </div>
                    </th>

                    <th
                        onClick={() => requestSort('name')}
                        className="py-3 px-6 cursor-pointer flex-row justify-center items-center"
                    >
                        <div className="flex flex-row justify-center items-center">
                        <span className="mr-2">NAME</span>
                        <SortArrow direction={sortConfig.key === 'name' ? sortConfig.direction : 'none'} />
                        </div>
                    </th>
                    <th
                        onClick={() => requestSort('lastTimeStarted')}
                        className="py-3 px-6 cursor-pointer flex-row justify-center items-center"
                    >
                        <div className="flex flex-row justify-center items-center">
                        <span className="mr-2">LAST TIME STARTED</span>
                        <SortArrow direction={sortConfig.key === 'lastTimeStarted' ? sortConfig.direction : 'none'} />
                        </div>
                    </th>
                    <th
                        onClick={() => requestSort('averageRuntime')}
                        className="py-3 px-6 cursor-pointer flex-row justify-center items-center"
                    >
                        <div className="flex flex-row justify-center items-center">
                        <span className="mr-2">AVERAGE RUNTIME</span>
                        <SortArrow direction={sortConfig.key === 'averageRuntime' ? sortConfig.direction : 'none'} />
                        </div>
                    </th>
                    <th
                        onClick={() => requestSort('totalUse')}
                        className="py-3 px-6 cursor-pointer flex-row justify-center items-center"
                    >
                        <div className="flex flex-row justify-center items-center">
                        <span className="mr-2">TOTAL USE</span>
                        <SortArrow direction={sortConfig.key === 'totalUse' ? sortConfig.direction : 'none'} />
                        </div>
                    </th>
                    <th
                        onClick={() => requestSort('state')}
                        className="py-3 px-6 cursor-pointer flex-row justify-center items-center"
                    >
                        <div className="flex flex-row justify-center items-center">
                        <span className="mr-2">STATE</span>
                        <SortArrow direction={sortConfig.key === 'state' ? sortConfig.direction : 'none'} />
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                {sortedWorkflows.map(workflow => {
                    console.log(workflow)
                    return (
                    <tr key={workflow.id} className="border-b border-contrast-box-color bg-box-color">
                        <td className="py-4 px-6">
                            <input
                                type="checkbox"
                                checked={workflow.isSelected}
                                onChange={() => handleCheckboxChange(workflow.id)}
                            />
                        </td>
                        <td className="py-4 px-6 font-light">{workflow.id}</td>
                        <td className="py-4 px-6 text-light-purple font-normal">
                            <Link to={'/automate'} state={ {workflowID: workflow.id}}>
                                {workflow.name}
                            </Link>
                        </td>
                        <td className="py-4 px-6">{workflow.lastTimeStarted}</td>
                        <td className="py-4 px-6">{workflow.averageRuntime}</td>
                        <td className="py-4 px-6">{workflow.totalUse}</td>
                        <td className="py-4 px-6">
                            <div className="relative inline-block text-left" data-dropdown-id={workflow.id}>
                                <button
                                    onClick={() => toggleDropdown(workflow.id)}
                                    className="inline-flex justify-center items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded-md hover:bg-contrast-box-color focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                    type="button"
                                >
                                    <span className={`mr-2 inline-block w-3 h-3 rounded-full ${activeStatus[workflow.id] ? 'bg-success-green' : 'bg-error-red'}`}></span>
                                    {activeStatus[workflow.id] ? 'Active' : 'Disabled'}
                                    <svg
                                        className={`w-4 h-4 transform transition-transform ${openDropdownId === workflow.id ? 'rotate-180' : 'rotate-0'}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {openDropdownId === workflow.id && (
                                    <div
                                        className="absolute z-10 mt-1 py-1 w-36 rounded-md shadow-lg bg-box-color hover:bg-contrast-box-color ring-1 ring-black ring-opacity-5 focus:outline-none transition-opacity duration-300"
                                        style={{
                                            opacity: 0,
                                            animation: 'fadeIn 300ms ease-out forwards'
                                        }}
                                    >
                                        <button
                                            onClick={() => toggleActiveState(workflow.id)}
                                            className="block w-full px-4 py-2 text-left text-sm text-custom-grey"
                                        >
                                            {activeStatus[workflow.id] ? 'Disabled' : 'Active'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </td>
                    </tr>
                )})}
                </tbody>
            </table>
        </div>
    );
};

export default WorkflowTable;

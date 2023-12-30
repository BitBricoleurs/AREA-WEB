import React, { useState, useEffect } from 'react';

const initialSortState = {
    key: 'id',
    direction: 'asc',
};

const WorkflowHistoryTable = ({ workflows, maxColumns = 0 }) => {
    const [sortConfig, setSortConfig] = useState(initialSortState);

    const displayedColumns = maxColumns > 0 ? workflows.slice(0, maxColumns) : workflows;

    const requestSort = (key) => {
        setSortConfig((currentSortConfig) => ({
            key,
            direction: currentSortConfig.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const sortedWorkflows = React.useMemo(() => {
        let sortableItems = [...displayedColumns];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [displayedColumns, sortConfig]);


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

    const getStateColor = (state) => {
        switch (state) {
            case 'Success': return 'bg-success-green';
            case 'Running': return 'bg-warning-yellow';
            case 'Failed': return 'bg-error-red';
            default: return 'bg-custom-grey';
        }
    };

    return (
        <div className="overflow-x-auto relative w-full">
            <table className="w-full text-sm text-center text-custom-grey bg-contrast-box-color border border-contrast-box-color">
                <thead className="text-xs uppercase bg-box-color border-b border-contrast-box-color text-custom-grey">
                <tr >
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
                            <span className="mr-2">Name</span>
                            <SortArrow direction={sortConfig.key === 'name' ? sortConfig.direction : 'none'} />
                        </div>
                    </th>
                    <th
                        onClick={() => requestSort('startTime')}
                        className="py-3 px-6 cursor-pointer flex-row justify-center items-center"
                    >
                        <div className="flex flex-row justify-center items-center">
                            <span className="mr-2">Start Time</span>
                            <SortArrow direction={sortConfig.key === 'startTime' ? sortConfig.direction : 'none'} />
                        </div>
                    </th>
                    <th
                        onClick={() => requestSort('endTime')}
                        className="py-3 px-6 cursor-pointer flex-row justify-center items-center"
                    >
                        <div className="flex flex-row justify-center items-center">
                            <span className="mr-2">End Time</span>
                            <SortArrow direction={sortConfig.key === 'endTime' ? sortConfig.direction : 'none'} />
                        </div>
                    </th>
                    <th
                        onClick={() => requestSort('duration')}
                        className="py-3 px-6 cursor-pointer flex-row justify-center items-center"
                    >
                        <div className="flex flex-row justify-center items-center">
                            <span className="mr-2">Duration</span>
                            <SortArrow direction={sortConfig.key === 'duration' ? sortConfig.direction : 'none'} />
                        </div>
                    </th>
                    <th
                        onClick={() => requestSort('status')}
                        className="py-3 px-6 cursor-pointer flex-row justify-center items-center"
                    >
                        <div className="flex flex-row justify-center items-center">
                            <span className="mr-2">Status</span>
                            <SortArrow direction={sortConfig.key === 'status' ? sortConfig.direction : 'none'} />
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                {sortedWorkflows.map((workflow, index) => (
                    <tr key={workflow.id} className={`border-b border-contrast-box-color bg-box-color ${index === sortedWorkflows.length - 1 ? 'rounded-b-lg' : ''}`}>
                        <td className="py-4 px-6">{workflow.id}</td>
                        <td className="py-4 px-6 text-light-purple">{workflow.name}</td>
                        <td className="py-4 px-6">{workflow.startTime}</td>
                        <td className="py-4 px-6">{workflow.endTime}</td>
                        <td className="py-4 px-6">{workflow.duration}</td>
                        <td className="py-4 px-6">
                            <div className={`inline-block w-3 h-3 rounded-full ${getStateColor(workflow.status)}`}></div>
                            <span className="ml-2">{workflow.status}</span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WorkflowHistoryTable;

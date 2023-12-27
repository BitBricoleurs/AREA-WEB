import React from 'react';
import { getBezierPath, getMarkerEnd } from 'reactflow';

import tailwindConfig from "/tailwind.config.js"
const darkPurple = tailwindConfig.theme.extend.colors['dark-purple'];
const lightPurple = tailwindConfig.theme.extend.colors['light-purple'];
const success_green = tailwindConfig.theme.extend.colors['success-green'];
const error_red = tailwindConfig.theme.extend.colors['error-red'];

const CustomEdge = ({
                        id,
                        sourceX,
                        sourceY,
                        targetX,
                        targetY,
                        sourcePosition,
                        targetPosition,
                        style = {},
                        markerEnd,
                        isSelected = false,
                    }) => {

    const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

    const edgeStyle = {
        stroke: isSelected ? darkPurple : lightPurple,
        strokeWidth: 2,
        ...style,
    };

    return (
        <g className="react-flow__edge ">
            <path
                id={id}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={getMarkerEnd(markerEnd, 'source')}
                style={edgeStyle}
            />
        </g>
    );
};

const CustomEdgeTrue = ({
                            id,
                            sourceX,
                            sourceY,
                            targetX,
                            targetY,
                            sourcePosition,
                            targetPosition,
                            style = {},
                            markerEnd,
                            isSelected = false,
                        }) => {

    const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

    const edgeStyle = {
        stroke: isSelected ? darkPurple : success_green,
        strokeWidth: 2,
        ...style,
    };

    return (
        <g className="react-flow__edge ">
            <path
                id={id}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={getMarkerEnd(markerEnd, 'source')}
                style={edgeStyle}
            />
        </g>
    );
};

const CustomEdgeFalse = ({
                                id,
                                sourceX,
                                sourceY,
                                targetX,
                                targetY,
                                sourcePosition,
                                targetPosition,
                                style = {},
                                markerEnd,
                                isSelected = false,
                            }) => {

        const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

        const edgeStyle = {
            stroke: isSelected ? darkPurple : error_red,
            strokeWidth: 2,
            ...style,
        };

        return (
            <g className="react-flow__edge ">
                <path
                    id={id}
                    className="react-flow__edge-path"
                    d={edgePath}
                    markerEnd={getMarkerEnd(markerEnd, 'source')}
                    style={edgeStyle}
                />
            </g>
        );
}

export { CustomEdge, CustomEdgeTrue, CustomEdgeFalse };

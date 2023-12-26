import React from 'react';
import { getBezierPath, getMarkerEnd } from 'reactflow';

import tailwindConfig from "../../../../tailwind.config.js"
const darkPurple = tailwindConfig.theme.extend.colors['dark-purple'];
const lightPurple = tailwindConfig.theme.extend.colors['light-purple'];

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
                        isSelected,
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

export default CustomEdge;

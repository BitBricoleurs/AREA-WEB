import {cardServicesStyles} from "./index.js";

const initNodes = [
    {
        id: '-1',
        type: 'add',
        data : {},
        position: { x: 50, y: 400 },
    }
];

const initEdges = [
    {
        id: 'e1-2',
        source: '0',
        target: '-1',
    }
];

export { initNodes, initEdges };
import React, { PureComponent } from 'react';
import {PieChart, Pie, Sector, ResponsiveContainer, Cell, Legend} from 'recharts';

const data = [
    { name: 'Success', value: 400 },
    { name: 'Failed', value: 500 },
    { name: 'Running', value: 100 },
];

const COLORS = ['#4CAF50', '#F44336', '#FFC107'];
const COLORS_TAILWINDBASE = ['success-green', 'error-red', 'warning-yellow'];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 5) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 11;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 3}
                outerRadius={outerRadius + 5}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text className={"text-custom-grey text-[12px]"} x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#999">
                {`${(percent * 100).toFixed(1)}%`}
            </text>
        </g>
    );
};

const RenderLegend = (props) => {
    const { payload } = props;
    console.log("color: ", COLORS[0])
    return (
        <div className="d-flex justify-content-end mt-[90px]">
            {payload.map((entry, index) => (
                <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full bg-${COLORS_TAILWINDBASE[index]}`}/>
                    <span className="mx-2 text-custom-grey text-[14px]" key={`item-${index}`}>
            {entry.value}
          </span>
                </div>
            ))}
        </div>
    );
};

export default class AnalyticsWorkflowStatus extends PureComponent {
    state = {
        activeIndex: 0,
    };

    onPieEnter = (_, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    getCellFill = (index) => {
        const { activeIndex } = this.state;
        const fillColor = COLORS[index % COLORS.length];
        return activeIndex === index ? `${fillColor}99` : fillColor;
    };

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        activeIndex={this.state.activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        onMouseEnter={this.onPieEnter}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={this.getCellFill(index)}
                                className="stroke-box-color shadow-2xl"
                            />
                        ))}
                    </Pie>
                    <Legend layout="vertical" verticalAlign="middle" align="left"  content={RenderLegend}/>

                </PieChart>
            </ResponsiveContainer>
        );
    }
}

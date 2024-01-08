const AnalyticsWorkflowFilterSection = ({ workflows, selectedWorkflow, onChange, minDate, maxDate, selectedStartDate, selectedEndDate, handleStartDateChange, handleEndDateChange }) => {

    return (
        <div className="flex flex-col w-full h-full">
            <svg className={"ms-auto m-2 w-5 h-5"} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1 7.46156V2.84616C1 2.35653 1.1945 1.88695 1.54071 1.54073C1.88693 1.19451 2.35649 1 2.84611 1H7.46139"
                    stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                    d="M24.999 7.46156V2.84616C24.999 2.35653 24.8045 1.88695 24.4583 1.54073C24.1121 1.19451 23.6425 1 23.1529 1H18.5376"
                    stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                    d="M1 18.5386V23.154C1 23.6436 1.1945 24.1132 1.54071 24.4594C1.88693 24.8056 2.35649 25.0001 2.84611 25.0001H7.46139"
                    stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                <path
                    d="M25 18.5386V23.154C25 23.6436 24.8055 24.1132 24.4593 24.4594C24.113 24.8056 23.6435 25.0001 23.1539 25.0001H18.5386"
                    stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.92334 13.9232H6.53862L9.30779 6.53857L13 16.6925L16.6922 9.30781L19.4614 13.9232H24.0767"
                      stroke="#9A77EC" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            <div className="flex flex-row w-full h-full  space-x-2 pr-10 -mt-8">
                <div className="flex flex-row w-full h-full items-center space-x-2 ">
                    <p className="flex-col flex text-[16px] font-outfit items-center text-custom-grey px-2">{"Select Workflow"}</p>
                    <select
                        className="flex flex-col w-56 bg-background py-1.5 m-2 px-2 border-contrast-box-color border rounded-md text-custom-grey"
                        value={selectedWorkflow}
                        onChange={onChange}>
                        {workflows.map((workflow, index) => (
                            <option key={index} value={workflow.value}>
                                {workflow.label}
                            </option>
                        ))}
                    </select>
                </div>
                <AnalyticsWorkflowFilter selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate}
                                         handleStartDateChange={handleStartDateChange}
                                         handleEndDateChange={handleEndDateChange} maxDate={maxDate} minDate={minDate}/>
            </div>
        </div>
    );
}

const formatDateString = (value, oldDate) => {
    let cleanValue = value.replace(/[^0-9/]/g, '');
    cleanValue = cleanValue.replace(/^(0[1-9]|[12][0-9]|3[01])$/, '$&/');
    cleanValue = cleanValue.replace(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, '$&/');
    cleanValue = cleanValue.substring(0, 10);

    if (oldDate && oldDate.length > cleanValue.length) {
        if (oldDate.charAt(oldDate.length - 1) === '/') {
            cleanValue = cleanValue.substring(0, cleanValue.length - 1);
        }
    }

    return cleanValue;
};
const isDateValid = (dateString, minDate, maxDate) => {
    if (dateString.length < 10) return true;

    const parts = dateString.split('/');
    const formattedDateString = `${parts[2]}-${parts[1]}-${parts[0]}`;

    const date = new Date(formattedDateString);
    const min = new Date(minDate.split('/').reverse().join('-'));
    const max = new Date(maxDate.split('/').reverse().join('-'));

    return date >= min && date <= max;
};

const AnalyticsWorkflowFilter = ({selectedStartDate, selectedEndDate, handleStartDateChange, handleEndDateChange, minDate, maxDate }) => {
    const onStartDateChange = (e) => {
        const formattedDate = formatDateString(e.target.value, selectedStartDate);
        handleStartDateChange(formattedDate);
    };

    const onEndDateChange = (e) => {
        const formattedDate = formatDateString(e.target.value, selectedEndDate);
        handleEndDateChange(formattedDate);
    };

    const startInputClass = `flex flex-col w-56 bg-background py-2 px-2 border rounded-md text-[12px] outline-none focus:ring-1 focus:ring-light-purple text-custom-grey ${isDateValid(selectedStartDate, minDate, maxDate) ? 'border-contrast-box-color' : 'border-error-red'}`;
    const endInputClass = `flex flex-col w-56 bg-background py-2 px-2 border rounded-md text-[12px] outline-none focus:ring-1 focus:ring-light-purple text-custom-grey ${isDateValid(selectedEndDate, selectedStartDate, maxDate) ? 'border-contrast-box-color' : 'border-error-red'}`;

    return (
        <div className="flex flex-row w-full h-full items-center space-x-2 mb-2 mr-1 ml-2">
            <p className="flex-col flex text-[16px] font-outfit font-light items-center text-custom-grey -">{"From"}</p>
            <input
                className={startInputClass}
                type="text"
                value={selectedStartDate}
                onChange={onStartDateChange}
                placeholder="DD/MM/YYYY"
            />
            <p className="flex-col flex text-[16px] font-outfit font-light items-center text-custom-grey -">{"To"}</p>
            <input
                className={endInputClass}
                type="text"
                value={selectedEndDate}
                onChange={onEndDateChange}
                placeholder="DD/MM/YYYY"
            />
        </div>
    );
}
export default AnalyticsWorkflowFilterSection;

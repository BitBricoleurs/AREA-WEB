import YourWorkflowIcon from  "/src/assets/icons/yourworkflow.svg";
import { cardServicesStyles } from '../../constants/index';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Spinner = () => {
    return (
        <div className="flex justify-center items-center w-full h-28 self-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
        </div>
    );
};
const PreviewCard = ({ workflowDescription, serviceName, workflowId, isLoading }) => {
    const borderColor = isLoading ? "border-box-color" : (cardServicesStyles[serviceName]?.borderColor || cardServicesStyles["default"].borderColor);

    return (
        <Link to={"/automate"} state={{ workflowID: workflowId }} className={`bg-transparent w-full h-28 rounded-lg font-outfit border ${borderColor} hover:border-opacity-50 duration-300 transition-all`}>
            {!isLoading && (
                <div className="flex flex-col h-full justify-between pt-4 px-4">
                    <div className="bg-white w-8 h-8 rounded-full flex justify-center items-center">
                        <img
                            src={cardServicesStyles[serviceName]?.iconPath || cardServicesStyles["default"].iconPath}
                            alt={`${serviceName} Icon`}/>
                    </div>
                    <p className="text-white font-outfit font-light text-md pb-2">{workflowDescription}</p>
                </div>
            )}
        </Link>
    );
};

const DashboardPreviewCarrousel = ({}) => {

    let slides = [];

    const mockWorkflows =
    [
        {
            service: "OpenAi",
            name: "Generate Text",
            id: "1"
        },
        {
            service: "Jenkins",
            name: "Build on Teams",
            id: "2"
        },
        {
            service: "Outlook",
            name: "Send Email on Time",
            id: "3"
        },
    ]

    const [workflows, setWorkflows] = useState(mockWorkflows)
    const [isLoading, setIsLoading] = useState(true);

    const fetchWorkflows = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}get-user-workflows-ids`, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': true,
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }

            const data = await response.json();
            if (!data.workflow) {
                throw new Error(`No workflows found`);
            }
            return data.workflow;
        } catch (error) {
            console.error('Error fetching workflows:', error);
        }
    };


    useEffect(() => {
        fetchWorkflows().then(data => {
            if (!data) {
                data = [];
            }
            if (data.length < 3) {
                data.push(...mockWorkflows.slice(0, 3 - data.length));
            }
            setWorkflows(data || mockWorkflows);
            setIsLoading(false);
        });
    }, []);


    let newSlides = [];

    for (let i = 0; i < workflows.length; i += 4) {
        newSlides.push(workflows.slice(i, i + 4));
    }

    slides = newSlides;
    const totalSlides = slides.length;

    const [activeSlide, setActiveSlide] = useState(0);
    const [previousSlide, setPrevSlide] = useState(null);

    const nextSlide = () => {
        setPrevSlide(activeSlide);
        setActiveSlide(currentSlide => (currentSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        setPrevSlide(activeSlide);
        setActiveSlide(currentSlide => (currentSlide - 1 + totalSlides) % totalSlides);
    };

    const translateX = activeSlide * -100;

    return (
        <div className="bg-box-color w-full h-full rounded-lg p-4 font-outfit border border-contrast-box-color overflow-hidden">
            <div className="flex flex-row items-start w-full">
                <div className="h-32 bg-vertical-card-purple-gradient w-1.5 rounded-lg"/>
                <div className="Content flex flex-col w-full h-full ml-6 overflow-hidden">
                    <p className="text-white font-outfit text-2xl font-light text-md pb-2 h-14 ">Your Workflow</p>
                    <div className="flex transition-transform duration-[400ms] ease-in-out relative"
                         style={{transform: `translateX(${translateX}%)`}}>
                        {slides.map((slide, index) => (
                            <div key={index} className="w-full flex-shrink-0">
                                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                                    {slide.map((workflow, idx) => (
                                        <PreviewCard key={idx} workflowDescription={workflow.name}
                                                     serviceName={workflow.service} workflowId={workflow.id}
                                                     isLoading={isLoading}/>
                                    ))}
                                </div>
                                {isLoading && (
                                    <div
                                        className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-40">
                                        <div className="bg-box-color/50 w-full h-full absolute"></div>
                                        <Spinner/>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="relative pt-2 flex flex-row space-x-2 items-center justify-center bottom-0 -mb-2">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={prevSlide}
                                disabled={activeSlide === 0}
                                aria-label="Previous Slide"
                                className={`w-8 h-8 rounded-full text-white ${activeSlide === 0 ? 'opacity-50' : ''}`}>
                                {'<'}
                            </button>
                            <button
                                onClick={nextSlide}
                                disabled={activeSlide === totalSlides - 1}
                                aria-label="Next Slide"
                                className={`w-8 h-8 rounded-full text-white ${activeSlide === totalSlides - 1 ? 'opacity-50' : ''}`}>
                                {'>'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row place-items-end w-1/12">
                    <div className="ms-auto w-8 h-8 rounded-full bg-transparent flex justify-center items-center">
                        <img className="stroke-light-purple" src={YourWorkflowIcon} alt="Your Workflow Icon"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPreviewCarrousel;
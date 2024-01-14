import {Link} from "react-router-dom";

const FirstContent = () => {
    return (
        <div className="flex flex-row w-full px-16 py-12">
            <div className="flex flew-row w-full space-x-8 justify-center items-end">
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col">
                    <span className="font-outfit text-5xl font-semibold text-white">Craft your workflow</span>
                    <span className="font-outfit text-white font-semibold text-5xl -mt-1"> Automate your success</span>
                </div>
                <span className="font-outfit  text-custom-grey max-w-[70%] text-[18px]">Let BotButler handle the repetitive tasks for you. Create
                                                                            custom automations and access analytics with our mobile
                                                                            and web app. Streamline your workflow with AI
                                                                            technology.
                </span>
                <div className="flex flex-row space-x-4">
                    <button
                        className="bg-[#7E3AF2] text-white font-jakarta text-[14px] py-3.5  pl-6 pr-5 rounded-md hover:bg-opacity-80 transition duration-300 flex items-center space-x-1.5">
                        <span>Try It Free</span>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.79688 10H16.4635" stroke="white" strokeWidth="1.66667" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M10.6309 4.16663L16.4642 9.99996L10.6309 15.8333" stroke="white"
                                  strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button className={"text-[#7E3AF2] bg-white font-jakarta text-[14px] py-3.5 px-6 rounded-md hover:bg-opacity-80 transition duration-300 flex items-center space-x-1"}>
                        <span>Learn More</span>
                    </button>
                </div>
            </div>
                <div className="bg-white rounded-xl w-full h-[500px] flex flex-col items-center justify-center"/>
            </div>
        </div>
    )
}

export default FirstContent
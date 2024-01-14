const FourthCard = ({title, price, description, features}) => {
    return (
        <div className="flex flex-col w-1/4  bg-white rounded-[4px] h-[750px] shadow-lg hover:scale-[102%] hover:ring-4 hover:ring-purple-600 transition-all duration-300">
            <div className="flex flex-col w-full h-full space-y-4 p-10 ">
                <span className="font-jakarta text-[12px] shadow w-20 text-center rounded-lg font-semibold text-[#7E3AF2]">{title}</span>
                <div className="flex flex-row w-full items-center space-x-2">
                <span className="font-jakarta text-[36px] font-bold text-black">{price}</span>
                    <span className="font-jakarta text-[14px] text-[#6B7280] pt-4">/mo</span>
                </div>
                <span className="font-jakarta text-[14px] text-custom-grey pb-10">{description}</span>
                <div className="flex flex-col w-full space-y-10 flex-grow justify-center">
                    {features.map((feature, index) => {
                        return (
                            <div className="flex flex-row  space-x-2 items-center">
                                <svg className={"w-4 h-4 m-2"} viewBox="0 0 15 17" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_1148_3185)">
                                        <path
                                            d="M0 9.21591L1.43203 7.78388L5.0121 11.364L12.8883 3.48779L14.3203 4.91982L5.0121 14.228L0 9.21591Z"
                                            fill="#0E9F6E"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1148_3185">
                                            <rect width="14.3203" height="16" fill="white"
                                                  transform="translate(0 0.5)"/>
                                        </clipPath>
                                    </defs>
                                </svg>

                                <span className="font-jakarta text-[14px] w-3/4 text-custom-grey" key={index}>{feature}</span>
                            </div>
                        )
                    })}
                </div>
                <button
                    className="bg-[#7E3AF2] text-white font-jakarta text-[14px] py-3.5  pl-6 pr-5 rounded-md hover:bg-opacity-80 transition duration-300 flex items-center space-x-1.5 justify-center">
                    <span>See More</span>
                </button>
            </div>
        </div>
    )
}

const FourthContent = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full justify-center">
                <span className="font-jakarta text-[36px] font-bold text-center text-white">Pricing</span>
                <span className="font-jakarta text-custom-grey text-[16px] text-center max-w-[33%] mx-auto ">Take your productivity to the next level with
                BotButler. Automate tasks and access analytics
                and AI workflow creation on your mobile or web
                app.</span>
            </div>
            <div className="flex flex-row w-full justify-center space-x-8 mt-10">
                <FourthCard title={"FREE"} price={"$0"} description={"Free limited features for individuals"} features={["Limited custom automation capabilities", "Access via mobile and web apps", "Basic analytics for performance tracking"]}/>
                <FourthCard title={"BASIC"} price={"$49"} description={"Basic features for individuals and\n" + "small teams"} features={["Extended Automation Tools: Access more triggers, actions, and the power to build out a more complex workflow.", "Full Access Anywhere: Use BotButler on any device, ensuring your automations are always at your fingertips.", "Get clear insights on performance, helping you fine-tune your processes for efficiency."]}/>
                <FourthCard title={"PREMIUM"} price={"$79"} description={"Premium features for individuals\n" + "and teams"} features={["Unlimited Automation: No caps on your creativity—build intricate workflows with premium features.", "Priority Access: Experience the fastest, most reliable connection for managing your tasks.", "Advanced Analytics: Take control with in-depth reports and predictive metrics for smarter decision-making."]}/>
            </div>
        </div>
    )
}

export default FourthContent
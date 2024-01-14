const ThirdContent = () => {
    return (
        <div className="flex flex-col w-full px-16 py-24">
            <div className="flex flex-col w-full justify-between items-center space-y-4 ">
                <span className="font-outfit text-[14px] font-semibold text-[#7E3AF2]">HOW IT WORKS</span>
                <span className="font-jakarta text-[28px] text-center w-1/3 font-semibold text-white leading-8">Boost Efficiency and
                                                                                Streamline Your Tasks with
                                                                                BotButler Automation Service
                </span>
                <span className="font-jakarta text-custom-grey text-[16px] text-center w-1/2">
                    Say goodbye to manual tasks and hello to efficient workflows with BotButler. Create
                    custom automations, access analytics, and streamline your workflow with our
                    mobile and web app.
                </span>
            </div>
            <div className="flex flex-col w-full mt-8 justify-center">
                <div className="flex flex-row full justify-center space-x-[33%]">
                    <svg className={"mt-6 w-6 h-6"} viewBox="0 0 33 32" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.99609 16H29.6628" stroke="#DCD7FE" strokeWidth="2.66667" strokeMiterlimit="10"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20.3301 6.66675L29.6634 16.0001L20.3301 25.3334" stroke="#DCD7FE"
                              strokeWidth="2.66667"
                              strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <svg className={"mt-6 w-6 h-6"} viewBox="0 0 33 32" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.99609 16H29.6628" stroke="#DCD7FE" strokeWidth="2.66667" strokeMiterlimit="10"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20.3301 6.66675L29.6634 16.0001L20.3301 25.3334" stroke="#DCD7FE"
                              strokeWidth="2.66667"
                              strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="flex flex-row w-full justify-between items-center space-x-16 -mt-10">
                    <div className="flex flex-col items-center space-y-2 w-1/3">
                        <div className="bg-white w-16 h-16 rounded-full mb-2"/>
                        <span
                            className="font-jakarta text-[18px] text-center font-semibold text-white  ">Sign up and create a profile</span>
                        <span className="font-jakarta text-custom-grey text-[11px] text-center">Work companies can sign up for BotButler and create a
                            personalized profile.
                    </span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 w-1/3">
                        <div className="bg-white w-16 h-16 rounded-full mb-2"/>
                        <span
                            className="font-jakarta text-[18px]  text-center font-semibold text-white">Choose services to automate</span>
                        <span className="font-jakarta text-custom-grey text-[11px]  text-center">
                            Companies can select from a variety of services such as
                              email marketing, social media management, or customer
                        support to automate using the app.
                    </span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 w-1/3">
                        <div className="bg-white w-16 h-16 rounded-full mb-2"/>
                        <span
                            className="font-jakarta text-[18px] font-semibold text-center text-white">Monitor analytics and adjust
                                                                                        workflows</span>
                        <span className="font-jakarta text-custom-grey text-[11px]  text-center">With access to analytics, companies can track the
                                            performance of their automation and make adjustments to
                                            their workflows using AI technology for maximum efficiency.
                    </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ThirdContent
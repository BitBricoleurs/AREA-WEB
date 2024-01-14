
const SecondContentCard = ({title, description}) => {
    return (
        <div className="flex flex-col space-y-5">
            <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.1001 12L13.2539 26.7692H23.4078L21.5616 36L35.4078 21.2308H25.2539L27.1001 12Z"
                          stroke="#7E3AF2" strokeWidth="2.76923" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            </div>
            <span className="font-outfit text-lg font-semibold text-white">{title}</span>
            <span className="font-jakarta text-[#959E9C] text-[14px]">{description}</span>
        </div>
    )
}

const SecondContent = () => {
    return (
        <div className="flex flex-row w-full px-16 py-24">
            <div className="flex flew-row w-full space-x-16">
                <div className="flex flex-col space-y-6 max-w-[37%]">
                    <span className="font-outfit text-3xl w-full font-semibold text-white">Streamline Your Work with
                                                                                    BotButler's Custom
                                                                                    Automations and AI Workflow
                                                                                    Creation
                    </span>
                    <span className="font-outfit text-custom-grey w-full text-[13px]">
                        Boost your productivity to new heights with BotButler! Our powerful
                        automation service empowers users to create custom
                        workflows and streamline their operations. Whether you're on the go
                        or at your desk, our mobile and web apps are ready to assist you with
                        analytics and AI workflow creation. Say goodbye to manual tasks and
                        hello to efficient, automated processes. Unleash the potential of your
                        team today with BotButler – because work should be smart, not hard!
                    </span>
                    <div className="flex flex-row space-x-4">
                        <button
                            className="bg-[#7E3AF2] text-white font-jakarta text-[14px] py-3.5  pl-6 pr-5 rounded-md hover:bg-opacity-80 transition duration-300 flex items-center space-x-1.5">
                            <span>Get Started</span>
                        </button>
                        <button
                            className={"text-[#7E3AF2] text-semibold font-jakarta text-[14px] py-3.5 px-2 rounded-md hover:bg-opacity-60 transition duration-300 flex items-center space-x-1"}>
                            <span>Learn More</span>
                        </button>
                    </div>
                </div>
                <div className={"grid gap-8 grid-cols-2 grid-rows-2 max-w-[60%]"}>
                    <SecondContentCard title={"Streamline your tasks with AI"} description={"With BotButler, users can save time and increase\n" +
                        "productivity by automating repetitive tasks using AI\n" +
                        "technology. From scheduling social media posts to\n" +
                        "creating personalized workflows, BotButler makes it\n" +
                        "easy to streamline your daily tasks."}/>
                    <SecondContentCard title={"Personalize your automations"} description={"With BotButler, users have the ability to create\n" +
                        "custom automations tailored to their specific needs\n" +
                        "and preferences. This allows for a more personalized\n" +
                        "and efficient workflow."}/>
                    <SecondContentCard title={"Streamline your tasks with AI"} description={"With BotButler, users can save time and increase\n" +
                        "productivity by automating repetitive tasks using AI\n" +
                        "technology. From scheduling social media posts to\n" +
                        "creating personalized workflows, BotButler makes it\n" +
                        "easy to streamline your daily tasks."}/>
                    <SecondContentCard title={"Personalize your automations"} description={"With BotButler, users have the ability to create\n" +
                        "custom automations tailored to their specific needs\n" +
                        "and preferences. This allows for a more personalized\n" +
                        "and efficient workflow."}/>
                </div>
            </div>
        </div>
    )
}

export default SecondContent
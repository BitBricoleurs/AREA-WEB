
const SecondContentCard = ({title, description, icon}) => {
    return (
        <div className="flex flex-col space-y-5">
            <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
                {icon}
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
                        "easy to streamline your daily tasks."} icon={
                        <svg width="44" height="44" viewBox="0 0 44 44"
                                                                           fill="none"
                                                                           xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1195_1533)">
                            <path
                                d="M37.125 33C36.5122 33.0031 35.9081 33.1445 35.3576 33.4136L29.4444 27.5H24.75V30.25H28.3056L33.4132 35.3579C33.1445 35.9084 33.0033 36.5124 33 37.125C33 37.9408 33.2419 38.7384 33.6952 39.4167C34.1484 40.0951 34.7927 40.6238 35.5464 40.936C36.3002 41.2482 37.1296 41.3299 37.9297 41.1707C38.7299 41.0116 39.4649 40.6187 40.0418 40.0418C40.6187 39.4649 41.0116 38.7299 41.1707 37.9297C41.3299 37.1296 41.2482 36.3002 40.936 35.5464C40.6238 34.7927 40.0951 34.1484 39.4167 33.6952C38.7384 33.2419 37.9408 33 37.125 33ZM37.125 38.5C36.8531 38.5 36.5872 38.4194 36.3611 38.2683C36.135 38.1172 35.9587 37.9024 35.8547 37.6512C35.7506 37.3999 35.7234 37.1235 35.7764 36.8567C35.8295 36.59 35.9604 36.345 36.1527 36.1527C36.345 35.9604 36.59 35.8295 36.8567 35.7764C37.1235 35.7234 37.3999 35.7506 37.6512 35.8547C37.9024 35.9587 38.1172 36.135 38.2683 36.3611C38.4194 36.5872 38.5 36.8531 38.5 37.125C38.4997 37.4896 38.3547 37.8391 38.0969 38.0969C37.8391 38.3547 37.4896 38.4997 37.125 38.5Z"
                                fill="#7E3AF2" stroke="#7E3AF2" strokeWidth="0.00032"/>
                            <path
                                d="M37.125 17.875C36.2747 17.8776 35.4461 18.1433 34.7529 18.6357C34.0596 19.1281 33.5359 19.823 33.2534 20.625H24.75V23.375H33.2534C33.5068 24.086 33.9507 24.7136 34.5367 25.1894C35.1226 25.6652 35.8281 25.9707 36.5759 26.0727C37.3238 26.1746 38.0853 26.0691 38.7772 25.7676C39.4691 25.466 40.0649 24.9801 40.4993 24.3629C40.9338 23.7457 41.1902 23.021 41.2407 22.2679C41.2911 21.5148 41.1336 20.7624 40.7853 20.0927C40.4371 19.4231 39.9115 18.8621 39.2659 18.471C38.6204 18.0799 37.8798 17.8737 37.125 17.875ZM37.125 23.375C36.8531 23.375 36.5872 23.2944 36.3611 23.1433C36.135 22.9922 35.9587 22.7774 35.8547 22.5262C35.7506 22.2749 35.7234 21.9985 35.7764 21.7318C35.8295 21.465 35.9604 21.22 36.1527 21.0277C36.345 20.8354 36.59 20.7045 36.8568 20.6514C37.1235 20.5984 37.3999 20.6256 37.6512 20.7297C37.9024 20.8337 38.1172 21.01 38.2683 21.2361C38.4194 21.4622 38.5 21.7281 38.5 22C38.4997 22.3646 38.3547 22.7141 38.0969 22.9719C37.8391 23.2297 37.4896 23.3747 37.125 23.375Z"
                                fill="#7E3AF2" stroke="#7E3AF2" strokeWidth="0.00032"/>
                            <path
                                d="M37.125 2.75C36.0313 2.7512 34.9828 3.18618 34.2095 3.95951C33.4362 4.73284 33.0012 5.78135 33 6.875C33.0047 7.53371 33.169 8.18148 33.4786 8.76288L28.3191 13.75H24.75V16.5H29.4309L35.4794 10.653C36.0413 10.8979 36.6507 11.0144 37.2633 10.9942C37.8759 10.9739 38.4763 10.8173 39.0208 10.5358C39.5653 10.2542 40.0401 9.85484 40.4108 9.36667C40.7815 8.8785 41.0386 8.31382 41.1636 7.71374C41.2885 7.11366 41.2781 6.49328 41.1331 5.89773C40.9881 5.30218 40.7121 4.74645 40.3253 4.27099C39.9384 3.79553 39.4505 3.4123 38.8969 3.14919C38.3433 2.88608 37.7379 2.74971 37.125 2.75ZM37.125 8.25C36.853 8.25 36.5872 8.16936 36.3611 8.01827C36.135 7.86718 35.9587 7.65244 35.8547 7.40119C35.7506 7.14994 35.7234 6.87348 35.7764 6.60675C35.8295 6.34003 35.9604 6.09503 36.1527 5.90273C36.345 5.71043 36.59 5.57948 36.8567 5.52642C37.1235 5.47337 37.3999 5.5006 37.6512 5.60467C37.9024 5.70874 38.1172 5.88497 38.2683 6.11109C38.4194 6.33721 38.5 6.60305 38.5 6.875C38.4997 7.23957 38.3547 7.58912 38.0969 7.84691C37.8391 8.1047 37.4896 8.24967 37.125 8.25Z"
                                fill="#7E3AF2" stroke="#7E3AF2" strokeWidth="0.00032"/>
                            <path
                                d="M24.75 8.25H27.5V5.5H24.75C23.9664 5.50263 23.1925 5.67371 22.4808 6.00165C21.7691 6.32958 21.1362 6.8067 20.625 7.40066C20.1138 6.8067 19.481 6.32958 18.7692 6.00165C18.0575 5.67371 17.2836 5.50263 16.5 5.5H15.125C11.8441 5.50364 8.69855 6.8086 6.37857 9.12857C4.0586 11.4485 2.75364 14.5941 2.75 17.875V26.125C2.75364 29.4059 4.0586 32.5515 6.37857 34.8714C8.69855 37.1914 11.8441 38.4964 15.125 38.5H16.5C17.2836 38.4974 18.0575 38.3263 18.7692 37.9984C19.481 37.6704 20.1138 37.1933 20.625 36.5993C21.1362 37.1933 21.7691 37.6704 22.4808 37.9984C23.1925 38.3263 23.9664 38.4974 24.75 38.5H27.5V35.75H24.75C24.0209 35.7492 23.3219 35.4592 22.8064 34.9436C22.2908 34.4281 22.0008 33.7291 22 33V11C22.0008 10.2709 22.2908 9.57192 22.8064 9.05638C23.3219 8.54084 24.0209 8.25084 24.75 8.25ZM16.5 35.75H15.125C12.8128 35.7459 10.5793 34.9102 8.83234 33.3956C7.08539 31.8809 5.94164 29.7883 5.61 27.5H8.25V24.75H5.5V19.25H9.625C10.7186 19.2488 11.7672 18.8138 12.5405 18.0405C13.3138 17.2672 13.7488 16.2186 13.75 15.125V12.375H11V15.125C10.9997 15.4896 10.8547 15.8391 10.5969 16.0969C10.3391 16.3547 9.98957 16.4997 9.625 16.5H5.61C5.94164 14.2117 7.08539 12.1191 8.83234 10.6044C10.5793 9.08975 12.8128 8.25405 15.125 8.25H16.5C17.2291 8.25084 17.9281 8.54084 18.4436 9.05638C18.9592 9.57192 19.2492 10.2709 19.25 11V16.5H16.5V19.25H19.25V24.75H16.5C15.4064 24.7512 14.3578 25.1862 13.5845 25.9595C12.8112 26.7328 12.3762 27.7814 12.375 28.875V31.625H15.125V28.875C15.1253 28.5104 15.2703 28.1609 15.5281 27.9031C15.7859 27.6453 16.1354 27.5003 16.5 27.5H19.25V33C19.2492 33.7291 18.9592 34.4281 18.4436 34.9436C17.9281 35.4592 17.2291 35.7492 16.5 35.75Z"
                                fill="#7E3AF2" stroke="#7E3AF2" strokeWidth="0.00032"/>
                            <path d="M44 0H0V44H44V0Z" stroke="#7E3AF2" strokeWidth="0.00032"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_1195_1533">
                                <rect width="44" height="44" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    }/>
                    <SecondContentCard title={"Personalize your automations"}
                                       description={"With BotButler, users have the ability to create\n" +
                                           "custom automations tailored to their specific needs\n" +
                                           "and preferences. This allows for a more personalized\n" +
                                           "and efficient workflow."} icon={<svg className={"p-1"} width="46" height="46"
                                                                                 viewBox="0 0 46 46" fill="none"
                                                                                 xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M26.0448 45C19.8135 41.4406 15.6634 35.1056 15.6634 27.8812C15.6634 24.1693 18.9478 21.1609 22.9975 21.1609C27.0474 21.1609 30.3316 24.1693 30.3316 27.8812C30.3316 31.5931 33.6159 34.6015 37.6658 34.6015C41.7155 34.6015 45 31.5931 45 27.8812C45 16.7457 35.1493 7.72035 22.9999 7.72035C10.8506 7.72035 1 16.7457 1 27.8812C1 30.3633 1.30326 32.7804 1.86082 35.11M13.6292 43.2864C10.291 38.9228 8.32724 33.6137 8.32724 27.8812C8.32724 20.4576 14.8935 14.4407 22.9932 14.4407C31.0927 14.4407 37.6589 20.4576 37.6589 27.8812M38.4539 41.2861C38.1897 41.2996 37.9305 41.3221 37.6639 41.3221C29.5644 41.3221 22.9983 35.305 22.9983 27.8815M43.4727 9.49894C38.4715 4.29518 31.1594 1 22.9964 1C14.8331 1 7.52097 4.29518 2.51986 9.49894"
                            stroke="#7E3AF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    }/>
                    <SecondContentCard title={"Efficiency Optimized"}
                                       description={"Embrace BotButler's AI efficiency. Our smart task management automates and streamlines complex tasks, ensuring seamless operations. Stay on top of your business with our real-time alerts and workflow synchronization."}
                    icon={<svg width="44" height="44" viewBox="0 0 44 44" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M5.5 38.5048H38.5V34.8381H5.5V38.5048ZM34.8634 5.5L25.6674 5.5055V9.17033H32.2417L23.0751 18.3388H13.9066L6.0379 26.2093L8.63023 28.8017L15.4264 22.0055H24.5912L34.8634 11.7333V18.3315H38.5301V5.5H34.8634Z"
                              fill="#7E3AF2"/>
                    </svg>
                    }/>
                    <SecondContentCard title={"Simple and Powerful"}
                                       description={"BotButler combines an easy-to-use interface with powerful automation capabilities. Set up is quick, the execution is flawless, and the performance meets the demands of any task, no matter how complex."}
                    icon={<svg width="49" height="48" viewBox="0 0 49 48" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M39.6673 35V16.3C39.6673 13.2197 39.6673 11.6796 39.0678 10.5031C38.5406 9.46816 37.6992 8.62677 36.6643 8.09946C35.4877 7.5 33.9477 7.5 30.8673 7.5H19.134C16.0537 7.5 14.5135 7.5 13.337 8.09946C12.3021 8.62677 11.4608 9.46816 10.9334 10.5031C10.334 11.6796 10.334 13.2197 10.334 16.3V35M39.6673 35C39.6673 38.0377 37.205 40.5 34.1673 40.5H15.834C12.7964 40.5 10.334 38.0377 10.334 35M39.6673 35C39.6673 31.9624 37.205 29.5 34.1673 29.5H15.834C12.7964 29.5 10.334 31.9624 10.334 35M24.084 13.9167L22.2507 18.5H27.7507L25.9173 23.0833M15.834 35H19.5007"
                            stroke="#7E3AF2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    }/>
                </div>
            </div>
        </div>
    )
}

export default SecondContent
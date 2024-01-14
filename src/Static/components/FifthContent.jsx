const FifthContent = () => {
    return (
        <div className="flex flex-col w-full px-16 pt-12">
            <div className="h-0.5 w-full bg-[#E5E7EB]"/>
            <div className="flex flex-col w-full px-16 py-8">
                <div className="flex flex-row w-full justify-between">
                    <div className="flex flex-col w-1/4 items-center">
                        <div className="flex flex-col space-y-1 ">
                            <span className="font-outfit text-[16px] font-semibold text-white">BotButler</span>
                            <span className="font-outfit text-[#959E9C] font-thin text-[12px]">Power up your workflow with BotButler -
                        the ultimate automation tool for businesses.
                        Create custom automations and access
                        advanced analytics on both mobile and web
                        platforms.</span>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1 w-1/">
                        <span className="font-outfit text-[16px] font-semibold text-white">Company</span>
                        <div className="flex flex-col">
                            <span className="font-outfit text-[#959E9C] font-light text-[14px]">Home</span>
                            <span className="font-outfit text-[#959E9C] font-light text-[14px]">About us</span>
                            <span className="font-outfit text-[#959E9C] font-light text-[14px]">Company values</span>
                            <span className="font-outfit text-[#959E9C] font-light text-[14px]">Pricing</span>
                            <span className="font-outfit text-[#959E9C] font-light text-[14px]">Privacy Policy</span>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 w-1/4">
                        <span className="font-outfit text-[16px] font-semibold text-white">Subscribe</span>
                        <span className="font-outfit text-[#959E9C] font-thin text-[12px]">Get the latest news and articles to your
                    inbox every month.</span>
                        <div className="flex flex-row space-x-2">
                            <input
                                className="bg-[#F5F5F5] rounded-[2px] w-full h-8 px-2 text-[#959E9C] font-outfit text-[12px]"
                                placeholder="Enter your email address"/>
                            <button
                                className="bg-[#7E3AF2] rounded-md h-8 text-white font-outfit text-[12px] px-2">Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-0.5 w-full bg-[#E5E7EB]"/>
            <span className="font-outfit text-[12px] font-light text-[#959E9C] text-center py-4">© 2024 BitBricoleurs. All rights reserved.</span>
        </div>
    )
}

export default FifthContent
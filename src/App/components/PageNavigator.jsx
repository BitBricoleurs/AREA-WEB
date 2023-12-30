import React from 'react';

const PageNavigator = ({ TitlePageNavigator, tabs, activeTab, setActiveTab }) => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row">
                <div className="flex space-x-4 items-center">
                    <span className="text-2xl font-bold text-custom-grey">{TitlePageNavigator}</span>
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => !tab.disabled && setActiveTab(tab.name)}
                            className={`py-2 px-4 text-2xl font-light 
                                        ${activeTab === tab.name ? 'text-light-purple' : 'text-custom-grey'} 
                                        ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={tab.disabled}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="relative">
                <div className="absolute bg-light-purple h-1 transition-all duration-500 ease-in-out"
                     style={{
                         width: `${tabs.find((tab) => tab.name === activeTab).barWidth}px`,
                         left: `${tabs.find((tab) => tab.name === activeTab).barOffset}px`,
                     }}
                />
            </div>
            <div className="flex flex-grow w-full transition-all duration-500 ease-in-out">
                {tabs.find((tab) => tab.name === activeTab).component}
            </div>
        </div>
    );
};

export default PageNavigator;

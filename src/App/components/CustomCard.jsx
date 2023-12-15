import {cardServicesStyles} from "/src/constants/index.js";
import React from "react";

const CustomCard = ({serviceName, description, onSelect}) => {

    const styles = cardServicesStyles[serviceName] || cardServicesStyles['default'];

    return (
        <div className="h-full w-full flex">
            <div className="flex flex-row w-full h-full pl-4 pt-4">
                <div className={`w-1 h-2/4 rounded-md ${styles.backgroundColor}`}></div>
                <div className="flex flex-col w-full h-full pl-4 items-center">
                    <div className="flex flex-row w-full h-full space-x-5 items-center">
                        <img className={"w-10 h-10"} src={styles.iconPath} alt={serviceName}/>
                        <div className="font-outfit text-xl font-regular text-custom-grey">{serviceName}</div>
                    </div>

                    <div className="flex mt-6 mb-8 -ml-10 w-3/4 h-12">
                        <div className="font-outfit text-lg text-custom-grey">{description}</div>
                    </div>
                    <div className="flex mt-4 justify-center w-full pb-4">
                        <button onClick={onSelect}
                                className={`flex items-center transition-all duration-700 justify-center -ml-10 w-2/3 h-10 rounded-md border ${styles.borderColor} ${styles.hoverBackColor} group`}
                        >
                        <span
                            className={`font-outfit transition-all duration-700 font-medium group-hover:text-black ${styles.textColor}`}>
                            {"Select"}
                        </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomCard;
import React, {useEffect, useState} from 'react';
import { useWorkflowContext } from '../../context/workflowContext.jsx';
import Spinner from "../SucessSpinner.jsx";
import Draggable from 'react-draggable';
import 'three-dots/dist/three-dots.css';
import "/src/App/styles/custom-three-dots.scss";

const GenerateGraph = () => {

    const [showBox, setShowBox] = useState(false);
    const [saveStatus, setSaveStatus] = useState('idle');
    const [prompt, setPrompt] = useState('');

    const handleToggle = () => {
        setShowBox(!showBox);
    };

    const handleGenerate = async () => {
        setSaveStatus('loading');
        return;
        try {
            setSaveStatus('success');
        } catch (error) {
            setSaveStatus('failed');
        }
    };

    const {workflowName, workflowDescription, workflow, variables} = useWorkflowContext();


    const renderButtonContent = () => {
        switch (saveStatus) {
            case 'loading':
                return (
                    <div className="flex flex-row items-center ">
                        <span className="-ml-3 font-outfit text-sm font-medium text-white group-hover:text-magic-color animate-pulse">
                            {"Doing Magic Stuff"}
                        </span>
                        <div className={"dot-bricks ml-3 -mr-2"}/>
                    </div>
                );
            case 'success':
            case 'failed':
                return <Spinner contrast="black" status={saveStatus}/>;
            default:
                return <span className={"font-outfit text-sm font-medium text-white"}
                >Generate
                </span>;
        }
    };

    return (
        <Draggable>
            <div
                className={`fixed right-0 mt-4 mr-96 z-10 transition-all duration-500 ease-in-out w-80 bg-magic-color rounded-lg`}>
                <button className="flex flex-row items-center w-full py-1.5 px-3 group"
                        onClick={handleToggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="iconify iconify--twemoji w-5 h-5"
                         viewBox="0 0 36 36">
                        <path fill="#292F33"
                              d="M3.651 29.852 29.926 3.576c.391-.391 2.888 2.107 2.497 2.497L6.148 32.349c-.39.391-2.888-2.107-2.497-2.497z"/>
                        <path fill="#66757F" d="M30.442 4.051 4.146 30.347l.883.883L31.325 4.934z"/>
                        <path fill="#E1E8ED"
                              d="m34.546 2.537-.412-.412-.671-.671a.967.967 0 0 0-.255-.169.988.988 0 0 0-1.159.169l-2.102 2.102.495.495.883.883 1.119 1.119 2.102-2.102a.999.999 0 0 0 0-1.414zM5.029 31.23l-.883-.883-.495-.495-2.209 2.208a.988.988 0 0 0-.169 1.159c.046.09.094.18.169.255l.671.671.412.412a.999.999 0 0 0 1.414 0l2.208-2.208-1.118-1.119z"/>
                        <path fill="#F5F8FA"
                              d="m31.325 4.934 2.809-2.809-.671-.671a.967.967 0 0 0-.255-.169l-2.767 2.767.884.882zM4.146 30.347 1.273 33.22c.046.09.094.18.169.255l.671.671 2.916-2.916-.883-.883z"/>
                        <path fill="#FFAC33"
                              d="m28.897 14.913 1.542-.571.6-2.2a.667.667 0 0 1 1.287 0l.6 2.2 1.542.571a.665.665 0 0 1 0 1.25l-1.534.568-.605 2.415a.667.667 0 0 1-1.293 0l-.605-2.415-1.534-.568a.665.665 0 0 1 0-1.25M11.961 5.285l2.61-.966.966-2.61a1.103 1.103 0 0 1 2.07 0l.966 2.61 2.609.966a1.103 1.103 0 0 1 0 2.07l-2.609.966-.966 2.61a1.105 1.105 0 0 1-2.07 0l-.966-2.61-2.61-.966a1.104 1.104 0 0 1 0-2.07M24.13 20.772l1.383-.512.512-1.382a.585.585 0 0 1 1.096 0l.512 1.382 1.382.512a.584.584 0 0 1 0 1.096l-1.382.512-.512 1.382a.585.585 0 0 1-1.096 0l-.512-1.382-1.383-.512a.585.585 0 0 1 0-1.096"/>
                    </svg>
                    <p className={"text-white font-outfit text-[20px] pl-2 font-light"}>Magic Editor</p>
                    <div
                        className="flex flex-col ms-auto justify-center  bg-contrast-box-color rounded-lg dark:bg-box-color"

                    >
                        <svg className={` -rotate-90 group-hover:rotate-0 transition-all duration-500 bg-magic-color fill-white `} width="22"
                             height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289Z"
                                  />
                        </svg>
                    </div>
                </button>
                <div
                    className={`flex flex-col bg-custom-darker-blue pt-1 overflow-hidden transition-all duration-1000 ease-in-out items-center ${showBox ? 'max-h-[350px]' : 'max-h-0'}`}>
                    <div className="flex flex-col space-x-2 p-4">
                        <div className="flex flex-col w-[280px]">
                            <p className="text-custom-grey font-outfit text-[14px] pl-2 font-light py-2">Prompt</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                        <textarea
                            className="rounded-lg font-outfit text-[14px] bg-custom-light-blue outline-none text-custom-grey pl-2 resize-none font-thin"
                            rows="5"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={!showBox}
                        />
                        </div>
                    </div>
                    <button
                        className="flex flex-col justify-center items-center w-1/2 h-8 mt-2 hover:bg-contrast-box-color rounded-lg bg-magic-color group transition-all duration-300 mb-4"
                        onClick={handleGenerate}>
                        {renderButtonContent()}
                    </button>
                </div>
            </div>
        </Draggable>
    );
};


export default GenerateGraph;

import React from "react";

const SearchBar = ({ searchInput, setSearchInput, searchPlaceHolder}) => {
    return (
        <div className="flex flex-col flex-grow w-full pt-6">
            <form>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-custom-grey border border-contrast-box-color rounded-lg bg-box-color dark:border-contrast-box-color dark:placeholder-gray-400 dark:text-custom-grey ring-background outline-none focus:border-light-purple"
                        placeholder={`Search ${searchPlaceHolder}`}
                        required
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
};

export default SearchBar;
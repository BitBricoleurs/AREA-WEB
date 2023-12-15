const LittleInputBox = ({ placeholder, value, onChange }) => (
    <div className="flex flex-col">
        <input
            className="font-outfit block w-64 p-4 text-sm text-custom-grey border border-contrast-box-color rounded-lg bg-box-color dark:border-contrast-box-color dark:placeholder-gray-400 dark:text-custom-grey ring-background outline-none focus:border-light-purple"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>
);

export default LittleInputBox;
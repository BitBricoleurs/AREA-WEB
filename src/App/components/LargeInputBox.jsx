const LargeInputBox = ({ placeholder, value, onChange }) => (
    <div className="flex flex-col">
         <textarea
             className="font-outfit block w-64 px-4 py-2 text-sm text-custom-grey border border-contrast-box-color rounded-lg bg-box-color dark:border-contrast-box-color dark:text-custom-grey ring-background outline-none focus:border-light-purple resize-none"
             value={value}
             onChange={onChange}
             placeholder={placeholder}
             rows={4}
         />
    </div>
);

export default LargeInputBox;
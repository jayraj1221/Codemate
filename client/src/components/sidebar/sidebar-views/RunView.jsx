import toast from "react-hot-toast";
import { useExecuteCode } from "../../../context/ExecuteCodeContext";
import { FaCaretDown } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

const RunView = () => {
  const {
    setInput,
    output,
    isRunning,
    supportedLanguages,
    selectedLanguage,
    setSelectedLanguage,
    executeCode,
  } = useExecuteCode();

  const handleLngChange = (ev) => {
    const language = JSON.parse(ev.target.value);
    setSelectedLanguage(language);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Output copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-900 rounded-lg shadow-lg w-full max-w-lg">
      <h1 className="text-xl font-semibold text-white">Run Code</h1>

      {/* Language Dropdown */}
      <div className="relative w-full">
        <select
          className="w-full appearance-none rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
          value={JSON.stringify(selectedLanguage)}
          onChange={handleLngChange}
        >
            <option className="text-white">
                Select a Language
            </option>
            {supportedLanguages
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((l, i) => (
                <option key={i} value={JSON.stringify(l)} className="text-white">
                    {l.name}
                </option>
            ))}
        </select>
        <FaCaretDown className="absolute right-4 top-3 text-gray-400" size={16} />
      </div>

      {/* Run Button */}
      <button
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={executeCode}
        disabled={isRunning}
      >
        {isRunning ? "Running..." : "Run"}
      </button>

      {/* Output Section */}
      <div className="w-full">
        <div className="flex justify-between items-center text-gray-400 text-sm">
          <span>Output:</span>
          <button onClick={copyOutput} className="hover:text-white transition">
            <IoCopyOutline size={18} />
          </button>
        </div>
        <div className="mt-2 h-40 w-full overflow-y-auto rounded-lg bg-gray-800 p-3 text-white font-mono text-sm border border-gray-700">
          <code>
            <pre className="whitespace-pre-wrap">{output || "// Output will appear here..."}</pre>
          </code>
        </div>
      </div>
    </div>
  );
};

export default RunView;
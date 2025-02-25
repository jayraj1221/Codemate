import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import CodeExecuteService from "../services/codeExecuteService";

const ExecuteCodeContext = createContext(null)

export const useExecuteCode = () => {
    const cxt = useContext(ExecuteCodeContext);

    if(cxt === null)
    {
        throw new Error("useExecuteCode must be used within a ExecuteCodeContextProvider");
    }
    return cxt;
}

const ExecuteCodeContextProvider = ({children}) => {

    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [isRunning, setIsRunning] = useState(false)
    const [supportedLanguages, setSupportedLanguages] = useState([])

    useEffect(() => {
        const codeExecuteService = new CodeExecuteService();
        const fetchLanguages = codeExecuteService.getSupportedLanguages();

        setSupportedLanguages(fetchLanguages.result);

    }, []);

    return (
        <ExecuteCodeContext.Provider>
            {children}
        </ExecuteCodeContext.Provider>
    )
}

export { ExecuteCodeContextProvider };
export default ExecuteCodeContext;
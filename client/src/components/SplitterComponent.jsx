import Split from "react-split";
function SplitterComponent({ children }) {
    return (
            <Split
                 sizes={[35,65]} 
                 minSize={5}    
                 direction="horizontal" 
                 gutterSize={10} 
                 gutterAlign="center"
                 cursor="col-resize"
                 className="flex h-screen min-h-screen max-w-full items-center justify-center overflow-hidden" 
            >
            {children}
             </Split>
    );
}

export default SplitterComponent;

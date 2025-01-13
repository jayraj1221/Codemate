import Split from "react-split";
function SplitterComponent({ children }) {
    return (
                 <Split
                 sizes={[20, 80]} // Default sizes: 50% for each pane
                 minSize={100}    // Minimum size for each pane
                 direction="horizontal" // Horizontal split
                 gutterSize={5}  // Width of the gutter
                 gutterAlign="center"
                 cursor="col-resize" // Cursor style for resizing
                 className="flex h-screen" // Tailwind for full-screen height
                >
                {children}
             </Split>
    );
}

export default SplitterComponent;

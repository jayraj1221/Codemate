import { useViews } from "../../../context/ViewContext";
import { Tooltip } from "react-tooltip";
import { useState, useEffect } from "react";
import { tooltipStyles , buttonStyles } from "./tootipsStyle";
import VIEW from "../../../types/view";
const SidebarButton = ({viewName , icon}) => {
    const {isSidebarOpen,setisSidebarOpen,activeView,setactiveView } = useViews()
    const [showTooltip , setShowTooltip] = useState(true)
    const handleViewClick = (viewName) => {
        if (viewName === activeView) {
            setisSidebarOpen(!isSidebarOpen)
        } else {
            setisSidebarOpen(true)
            setactiveView(viewName)
        }
    }
    return (
        <div className="relative flex items-center flex-col">
        <button
            onClick={() => handleViewClick(viewName)}
            onMouseEnter={() => setShowTooltip(true)} // Show tooltip again on hover
            className={`${buttonStyles.base} ${buttonStyles.hover}`}
            {...(showTooltip && {
                'data-tooltip-id': `tooltip-${viewName}`,
                'data-tooltip-content': viewName
            })}
        >
            <div className="flex items-center justify-center">
                {icon}
            </div>
            {/* Show dot for new message in chat View Button */}
            {viewName === VIEW.CHATS  && (
                <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-primary"></div>
            )}
        </button>
        {/* render the tooltip */}
        {showTooltip && (
                <Tooltip 
                    id={`tooltip-${viewName}`}
                    place="right"
                    offset={25}
                    className="!z-50"
                    style={tooltipStyles}
                    noArrow={false}
                    positionStrategy="fixed"
                    float={true}
                />
            )}
        </div>
    )
}
export default SidebarButton;
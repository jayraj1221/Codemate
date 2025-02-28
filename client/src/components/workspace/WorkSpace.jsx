import Editor from "../editor/Editor";
import FilesTab from "../filesTab/FilesTab";
import { useAppContext } from "../../context/AppContext";
import ACTIVITY_STATE from "../../types/activityState";
import DrawingBoard  from "../drawing/DrawingEditor";

const WorkSpace = () => {
  const { activityState } = useAppContext();

  return (
    <>
      {activityState === ACTIVITY_STATE.DRAWING ? (
        <DrawingBoard />
      ) : (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
          {/* Files Tab Section */}
          <div className="flex-none bg-white dark:bg-gray-800 shadow-md">
            <FilesTab />
          </div>

          {/* Editor Section */}
          <div className="flex-1 overflow-auto p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full overflow-hidden">
              <Editor />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkSpace;

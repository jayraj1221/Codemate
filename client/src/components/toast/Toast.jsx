import { Toaster } from "react-hot-toast";

function Toast() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 30000, // 30 seconds
            }}
        />
    );
}

export default Toast;

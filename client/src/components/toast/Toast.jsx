import { Toaster } from "react-hot-toast";

function Toast() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 2000, // 2 seconds
            }}
        />
    );
}

export default Toast;

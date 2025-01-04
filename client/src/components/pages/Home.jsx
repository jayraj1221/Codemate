import illustration from "../../assets/illustration.svg"
import { AppProvider } from "../../context/AppContext";
import FormComponent from "../../forms/FormComponent";
function Home()
{
    return  (
        <div className="flex min-h-screen flex-col items-center justify-center gap-16 bg-black">
        <div className="my-12 flex h-full min-w-full flex-col items-center justify-evenly sm:flex-row sm:pt-0">
            <div className="flex w-full animate-up-down justify-center sm:w-1/2 sm:pl-4 ">
                <img
                    src={illustration}
                    alt="Code Sync Illustration"
                    className="mx-auto w-[250px] sm:w-[400px]"
                />
            </div>
            <div className="flex w-full items-center justify-center sm:w-1/2">
            <AppProvider>
                <FormComponent />   
            </AppProvider>
            </div>
        </div>
        {/* <Footer /> */}
    </div>
            )   
}
export default Home;
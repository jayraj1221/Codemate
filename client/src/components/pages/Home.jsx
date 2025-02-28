import codeIllustration from "../../assets/code-illustration.jpg";
import FormComponent from "../../forms/FormComponent";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 text-black overflow-hidden">
      {/* Top Animated SVG Waves */}
      <svg
        className="absolute top-0 left-0 w-full animate-wave"
        viewBox="0 0 1440 320"
      >
        <path
          fill="black"
          fillOpacity="0.06"
          d="M0,160L40,186.7C80,213,160,267,240,266.7C320,267,400,213,480,192C560,171,640,181,720,202.7C800,224,880,256,960,240C1040,224,1120,160,1200,122.7C1280,85,1360,75,1400,69.3L1440,64L1440,0L0,0Z"
        ></path>
      </svg>

      {/* Main Content */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col-reverse items-center justify-between px-6 sm:flex-row sm:px-16">
        {/* Left Section - Illustration */}
        <div className="flex w-full justify-center sm:w-1/2">
          <img
            src={codeIllustration}
            alt="Code Collaboration"
            className="w-[280px] sm:w-[420px] drop-shadow-lg transition-transform duration-300 hover:scale-105 animate-float"
          />
        </div>

        {/* Right Section - Form */}
        <div className="flex w-full sm:w-1/2 items-center justify-center">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-12 border border-gray-200">
            <h2 className="mb-4 text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Get Started 🚀
            </h2>
            <p className="mb-6 text-center text-lg text-gray-600">
              Join the collaboration now!
            </p>
            <FormComponent />
          </div>
        </div>
      </div>

      {/* Bottom Animated SVG Waves */}
      <svg
        className="absolute bottom-0 left-0 w-full animate-wave"
        viewBox="0 0 1440 320"
      >
        <path
          fill="black"
          fillOpacity="0.06"
          d="M0,320L40,288C80,256,160,192,240,186.7C320,181,400,235,480,245.3C560,256,640,224,720,208C800,192,880,192,960,181.3C1040,171,1120,149,1200,138.7C1280,128,1360,128,1400,128L1440,128L1440,0L0,0Z"
        ></path>
      </svg>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-8px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-wave {
          animation: wave 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

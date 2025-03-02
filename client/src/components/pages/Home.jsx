// import codeIllustration from "../../assets/code-illustration.jpg";
// import FormComponent from "../../forms/FormComponent";

// export default function Home() {
//   return (
//     <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 text-black overflow-hidden">
//       {/* Top Animated SVG Waves */}
//       <svg
//         className="absolute top-0 left-0 w-full animate-wave"
//         viewBox="0 0 1440 320"
//       >
//         <path
//           fill="black"
//           fillOpacity="0.06"
//           d="M0,160L40,186.7C80,213,160,267,240,266.7C320,267,400,213,480,192C560,171,640,181,720,202.7C800,224,880,256,960,240C1040,224,1120,160,1200,122.7C1280,85,1360,75,1400,69.3L1440,64L1440,0L0,0Z"
//         ></path>
//       </svg>

//       {/* Main Content */}
//       <div className="relative z-10 flex w-full max-w-6xl flex-col-reverse items-center justify-between px-6 sm:flex-row sm:px-16">
//         {/* Left Section - Illustration */}
//         <div className="flex w-full justify-center sm:w-1/2">
//           <img
//             src={codeIllustration}
//             alt="Code Collaboration"
//             className="w-[280px] sm:w-[420px] drop-shadow-lg transition-transform duration-300 hover:scale-105 animate-float"
//           />
//         </div>

//         {/* Right Section - Form */}
//         <div className="flex w-full sm:w-1/2 items-center justify-center">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-12 border border-gray-200">
//             <h2 className="mb-4 text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
//               Get Started 🚀
//             </h2>
//             <p className="mb-6 text-center text-lg text-gray-600">
//               Join the collaboration now!
//             </p>
//             <FormComponent />
//           </div>
//         </div>
//       </div>

//       {/* Bottom Animated SVG Waves */}
//       <svg
//         className="absolute bottom-0 left-0 w-full animate-wave"
//         viewBox="0 0 1440 320"
//       >
//         <path
//           fill="black"
//           fillOpacity="0.06"
//           d="M0,320L40,288C80,256,160,192,240,186.7C320,181,400,235,480,245.3C560,256,640,224,720,208C800,192,880,192,960,181.3C1040,171,1120,149,1200,138.7C1280,128,1360,128,1400,128L1440,128L1440,0L0,0Z"
//         ></path>
//       </svg>

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-12px); }
//         }
//         @keyframes wave {
//           0%, 100% { transform: translateX(0); }
//           50% { transform: translateX(-8px); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
//         .animate-wave {
//           animation: wave 5s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }
import codeIllustration from "../../assets/code-illustration.jpg"
import FormComponent from "../../forms/FormComponent"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-gray-50 text-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-blue-200 opacity-60 animate-float-slow"></div>
        <div className="absolute top-1/4 -right-12 w-36 h-36 rounded-full bg-purple-200 opacity-50 animate-float"></div>
        <div className="absolute bottom-1/3 -left-16 w-48 h-48 rounded-full bg-teal-200 opacity-40 animate-float-reverse"></div>
      </div>

      {/* Top Animated SVG Waves */}
      <svg className="absolute top-0 left-0 w-full animate-wave-slow" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="rgba(59, 130, 246, 0.08)"
          d="M0,160L40,186.7C80,213,160,267,240,266.7C320,267,400,213,480,192C560,171,640,181,720,202.7C800,224,880,256,960,240C1040,224,1120,160,1200,122.7C1280,85,1360,75,1400,69.3L1440,64L1440,0L0,0Z"
        ></path>
      </svg>

      {/* Main Content */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col-reverse items-center justify-between gap-12 px-6 py-12 sm:flex-row sm:px-16">
        {/* Left Section - Illustration */}
        <div className="flex w-full justify-center sm:w-1/2">
          <div className="relative">
            <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 blur-xl opacity-70"></div>
            <img
              src={codeIllustration || "/placeholder.svg"}
              alt="Code Collaboration"
              className="relative w-[280px] sm:w-[420px] rounded-2xl drop-shadow-lg transition-all duration-500 hover:scale-105 hover:rotate-1 animate-float-medium"
            />
            <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-70 animate-pulse"></div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex w-full sm:w-1/2 items-center justify-center">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-gray-100 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(8,_112,_184,_0.18)]">
            <div className="mb-8">
              <h2 className="mb-3 text-center text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:text-4xl">
                Get Started 🚀
              </h2>
              <p className="text-center text-lg text-gray-600">Join the collaboration now!</p>
            </div>
            <FormComponent />
          </div>
        </div>
      </div>

      {/* Bottom Animated SVG Waves */}
      <svg className="absolute bottom-0 left-0 w-full animate-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="rgba(59, 130, 246, 0.08)"
          d="M0,320L40,288C80,256,160,192,240,186.7C320,181,400,235,480,245.3C560,256,640,224,720,208C800,192,880,192,960,181.3C1040,171,1120,149,1200,138.7C1280,128,1360,128,1400,128L1440,128L1440,0L0,0Z"
        ></path>
      </svg>

      {/* Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-8px); }
        }
        @keyframes wave-slow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-12px); }
        }
        .animate-float-slow {
          animation: float-slow 7s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 6s ease-in-out infinite;
        }
        .animate-wave {
          animation: wave 6s ease-in-out infinite;
        }
        .animate-wave-slow {
          animation: wave-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}


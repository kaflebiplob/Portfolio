import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white
      ">
        🚧 Portfolio Update In Progress
      </h1>

      <p className="text-lg text-gray-400 max-w-xl">
        I’m currently upgrading my website to a brand new React
        version. Stay tuned for something amazing!
      </p>

     
    </div>
  );
}

export default App;

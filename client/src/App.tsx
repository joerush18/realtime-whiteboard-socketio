import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import { Toaster } from "react-hot-toast";

const  App : React.FC = ()=>  {
  return (
    <>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 1000,
            style: {
              background: "#363636",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/editor/:roomID" element={<EditorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

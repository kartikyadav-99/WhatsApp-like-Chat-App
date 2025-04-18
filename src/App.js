
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./redux/StateProvider"; // Import useStateValue

function App() {
const [{user}] = useStateValue();



  return (
    // BEM naming convention
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <div className="app__body">
        <Router>
        <Sidebar />
          <Routes>

            <Route path="/rooms/:roomId" element={
                <>
                  <Chat />
                </>
              }/>
            <Route path="/" element={
              <> 
              <Chat />
              </>
            }/>
          </Routes>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
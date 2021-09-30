import "./App.css";
import { WorldMap } from "./components/Map";
const App = () => {
  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} className="App">
      <WorldMap />
    </div>
  );
};

export default App;

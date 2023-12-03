import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <link href="/dist/output.css" rel="stylesheet"></link>
        <Dashboard />
      </header>
    </div>
  );
}

export default App;

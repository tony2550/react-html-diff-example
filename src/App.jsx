import { useState } from "react";
import "./App.css";
import Diff2 from "./pages/Diff2";
import Diffmp from "./pages/Diffmp";
import DiffViewer from "./pages/DiffViewer";
import RevStatus from "./pages/RevStatus";

function App() {
  const [page, setPage] = useState(3);

  const handlePage = (index) => {
    setPage(index);
  };
  return (
    <div className="App">
      <header className="App-header">
        <span className="App-title">React-HTML-Diff-Study</span>
      </header>
      <div className="App-tabs">
        <span onClick={() => handlePage(0)}>patch-match</span>
        <span onClick={() => handlePage(1)}>2html</span>
        <span onClick={() => handlePage(2)}>diffviewer</span>
        <span onClick={() => handlePage(3)}>Rev</span>
      </div>
      <div className="App-body">
        {page === 0 ? (
          <Diffmp />
        ) : page === 1 ? (
          <Diff2 />
        ) : page === 2 ? (
          <DiffViewer />
        ) : (
          <RevStatus />
        )}
      </div>
    </div>
  );
}

export default App;

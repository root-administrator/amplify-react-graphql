import { useState } from "react";
import "./App.css";
import FloralCatalog from "./components/FloralCatalog";
import "./styles/FloralCatalog.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>Welcome to My Floral Catalog</h1>
        <FloralCatalog />
      </div>
    </>
  );
}

export default App;

import React from "react";
import Form from "./components/Form";
import Preview from "./components/Preview";
import { LoadingProvider } from "./LoadingContext";

function App() {
  return (
    <LoadingProvider>
      <div className="app">
        <h3 className="app-title">Bulut Bilişim Microsoft SDK Ses İşleme</h3>
        <div className="container d-flex justify-content-between">
          <Form />
          <Preview />
        </div>
      </div>
    </LoadingProvider>
  );
}

export default App;

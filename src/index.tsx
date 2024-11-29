import React from "react";
import { render } from "react-dom";

import ErrorBoundary from "./ErrorBoundary";
import Suspense from "./Suspense";

function ComponentThatThrowError() {
  throw new Error("error from component");
  return <div>throw error</div>;
}

let throwed = false;
function ComponentThatThrowResolvedPromise() {
  if (!throwed) {
    throw new Promise((res, rej) => {
      throwed = true;
      setTimeout(res, 3000);
    });
  }

  return <div>throw promise.</div>;
}

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={null}>
          <ComponentThatThrowError />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<div>loading...</div>}>
          <ComponentThatThrowResolvedPromise />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

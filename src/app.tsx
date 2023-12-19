import Landing from "./landing";
import SignUp from "./signUp";
import { Route } from "wouter";

const App = () => {
  return (
    <>
      <div className="flex h-screen w-screen overscroll-none">
        <Route path="/">
          {" "}
          <Landing />
        </Route>
        <Route path="/sign-up">
          {" "}
          <SignUp />
        </Route>
      </div>
    </>
  );
};

export default App;

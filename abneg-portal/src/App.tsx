import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import Dashboard from "@/pages/Dashboard";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  <div className="flex flex-col items-center justify-center min-h-screen">
                    <SignIn />
                  </div>
                </SignedOut>
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <SignedOut>
                  <SignIn />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                  <h1>Welcome, you are signed in!</h1>
                </SignedIn>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

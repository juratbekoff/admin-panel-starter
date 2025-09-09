import { Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import { AuthChecker } from "./middlewares/auth";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route
        element={
          <AuthChecker>
            <RootLayout />
          </AuthChecker>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="*" element={<h1>Page not found!</h1>} />
      </Route>
    </Routes>
  );
};

export default App;

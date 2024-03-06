import { Route, Routes } from "react-router-dom";
import { AuthLayout, RootLayout } from "./layouts";
import { Dashboard, NotFound } from "./pages";
import { AuthChecker } from "./middlewares";

function App() {
  return (
    <Routes>
      {/* Root layout */}
      <Route
        element={
          <AuthChecker>
            <RootLayout />
          </AuthChecker>
        }
      >
        <Route index element={<Dashboard />} />
        {/* Here will be other routes, if needs */}

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth layout */}
      <Route path="/auth" element={<AuthLayout />} />
    </Routes>
  );
}

export default App;

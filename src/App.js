import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import "./App.css";
import { paths } from "./urlPaths";
import Login from "./components/auth/login";
import HomePage from "./components/homePage/homePage";
import { checkTokenValidity } from "./utils/token/validateToken";
import ComponentBody from "./routing/ComponentBody";
import Register from "./components/auth/register";
import CreatePermission from "./components/createPermission/createPermission";
import CreateRole from "./components/createRole/createRole";

function App() {
  let isTokenValidated = checkTokenValidity();
  return (
    <div className="App bg-blue-50 w-full h-full min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route
            path={paths.createPermission}
            element={
              isTokenValidated ? (
                <ComponentBody hasNavBar={true}>
                  <CreatePermission />
                </ComponentBody>
              ) : (
                <Navigate to={paths.login} />
              )
            }
          />
          <Route
            path={paths.createRole}
            element={
              isTokenValidated ? (
                <ComponentBody hasNavBar={true}>
                  <CreateRole />
                </ComponentBody>
              ) : (
                <Navigate to={paths.login} />
              )
            }
          />
          <Route
            path={paths.register}
            element={
              isTokenValidated ? (
                <ComponentBody hasNavBar={true}>
                  <Register />
                </ComponentBody>
              ) : (
                <Navigate to={paths.login} />
              )
            }
          />
          <Route
            path={paths.home}
            element={
              isTokenValidated ? (
                <ComponentBody hasNavBar={true}>
                  <HomePage />
                </ComponentBody>
              ) : (
                <Navigate to={paths.login} />
              )
            }
          />
          <Route path={paths.login} element={<Login />} />
          <Route path={paths.root} element={<Navigate to={paths.login} />} />
          <Route path="*" render={() => <Navigate to={paths.root} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import DetalleFactura from "./pages/facturaDetalle/DetalleFactura";
import New from "./pages/new/New";
import NewInvoice from "./pages/newInvoice/NewInvoice";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs, invoiceInputs } from "./assets/data/formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user, authIsReady } = useAuthContext();

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="login" element={!user && <Login />} />
              <Route
                index
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route path="users">
                <Route
                  index
                  element={user ? <List /> : <Navigate to="/login" />}
                />
                <Route
                  path=":id"
                  element={user ? <Single /> : <Navigate to="/login" />}
                />
                <Route
                  path="new"
                  element={
                    user ? (
                      <New inputs={userInputs} title="Add New User" />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              </Route>
              <Route path="facturas">
                <Route
                  index
                  element={
                    user ? (
                      <NewInvoice
                        inputs={invoiceInputs}
                        title="Add New Invoice"
                      />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path=":id"
                  element={user ? <DetalleFactura /> : <Navigate to="/login" />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;

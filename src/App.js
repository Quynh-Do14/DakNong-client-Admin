import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import './App.css';
import { ROUTE_PATH } from "./core/common/appRouter";
import { RegisterPage } from "./pages/Auth/Register/Register";
import { LoginPage } from "./pages/Auth/Login/Login";
import { MainLayout } from "./infrastucture/common/components/layout/MainLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_PATH.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTE_PATH.MAINLAYOUT} element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

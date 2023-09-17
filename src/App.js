import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import './App.css';
import { ROUTE_PATH } from "./core/common/appRouter";
import { RegisterPage } from "./pages/Auth/Register/Register";
import { LoginPage } from "./pages/Auth/Login/Login";
import { MainLayout } from "./infrastucture/common/components/layout/MainLayout";
import { ListUserManagement } from "./pages/user-management/list";
import { ViewUserManagement } from "./pages/user-management/view";
import { ListTourManagement } from "./pages/tour-management/list";
import { AddUserManagement } from "./pages/user-management/add";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE_PATH.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTE_PATH.MAINLAYOUT} element={<MainLayout />} />

          <Route path={ROUTE_PATH.USER} element={<ListUserManagement />} />
          <Route path={ROUTE_PATH.VIEW_USER} element={<ViewUserManagement />} />
          <Route path={ROUTE_PATH.ADD_USER} element={<AddUserManagement />} />

          <Route path={ROUTE_PATH.TOUR} element={<ListTourManagement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

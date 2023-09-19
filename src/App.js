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
import { ListCategoryManagement } from "./pages/category-management/list";
import { AddCategoryManagement } from "./pages/category-management/add";
import { ViewCategoryManagement } from "./pages/category-management/view";
import { AddTourManagement } from "./pages/tour-management/add";
import { ViewTourManagement } from "./pages/tour-management/view";
import { PrivateRoute } from "./infrastucture/common/components/router/private-router";
import { ListDistrictManagement } from "./pages/district-management/list";
import { ViewDistrictManagement } from "./pages/district-management/view";
import { AddDistrictManagement } from "./pages/district-management/add";
import { ListEvaluateManagement } from "./pages/evaluate-management/list";
import { AddEvaluateManagement } from "./pages/evaluate-management/add";
import { ViewEvaluateManagement } from "./pages/evaluate-management/view";
import { ListLocationManagement } from "./pages/location-management/list";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path={ROUTE_PATH.LOGIN} element={< PrivateRoute component={LoginPage} />} /> */}
          <Route path={ROUTE_PATH.LOGIN} element={< LoginPage />} />
          <Route path={ROUTE_PATH.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTE_PATH.MAINLAYOUT} element={<PrivateRoute component={MainLayout} />} />

          <Route path={ROUTE_PATH.USER} element={<PrivateRoute component={ListUserManagement} />} />
          <Route path={ROUTE_PATH.VIEW_USER} element={<PrivateRoute component={ViewUserManagement} />} />
          <Route path={ROUTE_PATH.ADD_USER} element={<PrivateRoute component={AddUserManagement} />} />

          <Route path={ROUTE_PATH.CATEGORY} element={<PrivateRoute component={ListCategoryManagement} />} />
          <Route path={ROUTE_PATH.VIEW_CATEGORY} element={<PrivateRoute component={ViewCategoryManagement} />} />
          <Route path={ROUTE_PATH.ADD_CATEGORY} element={<PrivateRoute component={AddCategoryManagement} />} />

          <Route path={ROUTE_PATH.TOUR} element={<PrivateRoute component={ListTourManagement} />} />
          <Route path={ROUTE_PATH.VIEW_TOUR} element={<PrivateRoute component={ViewTourManagement} />} />
          <Route path={ROUTE_PATH.ADD_TOUR} element={<PrivateRoute component={AddTourManagement} />} />

          <Route path={ROUTE_PATH.DISTRICT} element={<PrivateRoute component={ListDistrictManagement} />} />
          <Route path={ROUTE_PATH.VIEW_DISTRICT} element={<PrivateRoute component={ViewDistrictManagement} />} />
          <Route path={ROUTE_PATH.ADD_DISTRICT} element={<PrivateRoute component={AddDistrictManagement} />} />

          <Route path={ROUTE_PATH.NEWS} element={<PrivateRoute component={ListTourManagement} />} />
          <Route path={ROUTE_PATH.VIEW_NEWS} element={<PrivateRoute component={ViewTourManagement} />} />
          <Route path={ROUTE_PATH.ADD_NEWS} element={<PrivateRoute component={AddTourManagement} />} />

          <Route path={ROUTE_PATH.LOCATION} element={<PrivateRoute component={ListLocationManagement} />} />
          <Route path={ROUTE_PATH.VIEW_LOCATION} element={<PrivateRoute component={ViewTourManagement} />} />
          <Route path={ROUTE_PATH.ADD_LOCATION} element={<PrivateRoute component={AddTourManagement} />} />

          <Route path={ROUTE_PATH.EVALUATE} element={<PrivateRoute component={ListEvaluateManagement} />} />
          <Route path={ROUTE_PATH.VIEW_EVALUATE} element={<PrivateRoute component={ViewEvaluateManagement} />} />
          <Route path={ROUTE_PATH.ADD_EVALUATE} element={<PrivateRoute component={AddEvaluateManagement} />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

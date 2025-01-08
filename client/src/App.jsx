import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const UserPrivateComp = React.lazy(() =>
  import("./Components/PrivateComponents/UserPrivateComp")
);
const AdminPrivateComp = React.lazy(() =>
  import("./Components/PrivateComponents/AdminPrivateComp")
);
const AddMinistratorSignup = React.lazy(() =>
  import("./Components/MainComponents/admin/AdministratorSignUp.jsx")
);
const AdministartorLogin = React.lazy(() =>
  import("./Components/MainComponents/admin/AdministratorLogin.jsx")
);
const AdminiStrativeDashboard = React.lazy(() =>
  import("./Components/MainComponents/admin/AdministrativeDashboard.jsx")
);

const ViewProject = React.lazy(() =>
  import("./Components/MainComponents/admin/ViewProject.jsx")
);

const AdminUserView = React.lazy(() =>
  import("./Components/MainComponents/admin/AdminUserView")
);
// user

const UserLoginPage = React.lazy(() => import("./Components/MainComponents/user/UserLogin"))
const UserHome = React.lazy(() => import("./Components/MainComponents/user/UserHome"))
const UserProject = React.lazy(() => import("./Components/MainComponents/user/UserProject"))
const App = () => {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddMinistratorSignup />} />
          <Route path="/administrativeLogin" element={<AdministartorLogin />} />
          {/* normal user login */}
          <Route path="/userlogin" element={<UserLoginPage />} />

          {/* administrative Private Routes */}
          <Route path="/admin" element={<AdminPrivateComp />}>
            <Route path="" element={<AdminiStrativeDashboard />} />
            <Route path=":id/view" element={<ViewProject />} />
            <Route path=":userid/viewUser" element={<AdminUserView />} />
          </Route>

          {/* user Private Routes */}
          <Route path="/user" element={<UserPrivateComp />}>
            <Route path="" element={<UserHome />} />
            <Route path=":projectId/project" element={<UserProject />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;

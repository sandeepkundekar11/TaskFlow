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
const App = () => {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddMinistratorSignup />} />
          <Route path="/administrativeLogin" element={<AdministartorLogin />} />
          {/* normal user login */}
          <Route path="/userlogin" element={<h1>user Login</h1>} />

          {/* administrative Private Routes */}
          <Route path="/admin/" element={<AdminPrivateComp />}>
            <Route path="dashobaord" element={<AdminiStrativeDashboard />} />
          </Route>

          {/* user Private Routes */}
          <Route path="/user/" element={<UserPrivateComp />}>
            <Route path="userdashboard" element={<h1>User Dashboard</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;

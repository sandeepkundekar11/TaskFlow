
import React, { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
const AddMinistratorSignup = React.lazy(() => import("./Components/MainComponents/AdministratorSignUp"))
const AdministartorLogin = React.lazy(() => import("./Components/MainComponents/AdministratorLogin"))
const App = () => {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddMinistratorSignup />} />
          <Route path="/administrativeLogin" element={<AdministartorLogin />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
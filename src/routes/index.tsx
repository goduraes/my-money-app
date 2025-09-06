import { Navigate, createBrowserRouter } from "react-router-dom";

import { AuthProvider } from "../contexts/auth";

import Login from "../pages/login";
import ResetPassword from "../pages/reset-password";

import ProtectedRoute from "../components/protected-route";
import Home from "../pages/home";
import Profile from "../pages/profile";

import AdminUsers from "../pages/admin/users";

const routes = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: '', element: <Home /> },
          { path: 'profile', element: <Profile /> },
          {
            path: 'admin',
            children: [
              { path: 'users', element: <AdminUsers /> }
            ]
          }
        ]
      },
      { path: 'login', element: <Login /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: '*', element: <Navigate to="/" /> },
    ]
  }
]);

export default routes;

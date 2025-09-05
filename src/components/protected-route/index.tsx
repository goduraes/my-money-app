import { Navigate, Outlet } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Navbar from "../navbar";
import Loading from "../loading";

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);
  const [loadingComponents, setLoadingComponents] = useState(true);
  setTimeout(() => setLoadingComponents(false), 400);

  useEffect(() => {
    auth?.getIsAdmin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!auth?.user) {
    return <Navigate to="/login" />
  };

  return (
    <div id="protected-route">
      {loadingComponents &&  (
        <div className="flex justify-center items-center absolute w-screen h-screen top-0 left-0 z-3 bg-white">
          <Loading className="h-12 w-12" color="blue" />
        </div>
      )}

      <div className={`${loadingComponents ? 'hidden': 'block'}`}>
        <Navbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;

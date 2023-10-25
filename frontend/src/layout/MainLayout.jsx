import { Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      isLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Outlet />
        </>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}

export default MainLayout;
import { Outlet } from "react-router";
import Header from "@/components/header";
import { ThirdwebProvider } from "thirdweb/react";

const RootLayout = () => {
  return (
    <ThirdwebProvider>
      <Header />
      <Outlet />
    </ThirdwebProvider>
  );
};

export default RootLayout;

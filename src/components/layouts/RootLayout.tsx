import { Outlet } from "react-router";
import Header from "@/components/header";
import { ThirdwebProvider } from "thirdweb/react";
import Background from "../Background";

const RootLayout = () => {
  return (
    <ThirdwebProvider>
      <Background />
      <Header />
      <Outlet />
    </ThirdwebProvider>
  );
};

export default RootLayout;

import Footer from "../Footer";
import { Outlet } from "react-router";
import { Toaster } from "../ui/sonner";
import AuthProvider from "../AuthProvider";
import MainContainer from "./MainContainer";
import MintingOverlayWrapper from "../thirdweb/MintingOverlayWrapper";
import { MintingProvider } from "@/contexts/MintingContext";

export default function SecondaryLayout() {
  return (
    <AuthProvider>
      <MintingProvider>
        <div className="relative w-screen h-screen">
          <div className="relative z-10 flex flex-col h-full w-full">
            <MainContainer>
              <Outlet />
            </MainContainer>
            <Footer />
          </div>
          <MintingOverlayWrapper />
          <Toaster />
        </div>
      </MintingProvider>
    </AuthProvider>
  );
}

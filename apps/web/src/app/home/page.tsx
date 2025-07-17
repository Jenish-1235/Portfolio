// /home/page.tsx
import HomeContainer from "./components/HomeContainer";
import HeroSection from "./components/HeroSection";
import AboutMeSection from "./components/AboutMeSection";
import NavBar from "@/app/common/NavBar";
import Footer from "../common/Footer";
import StackingContainer from "./components/StackingContainer";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <HomeContainer>
        <StackingContainer>
          <HeroSection />
          <AboutMeSection />
        </StackingContainer>
        <Footer />
      </HomeContainer>
    </>
  );
}

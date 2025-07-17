// /home/page.tsx
import HomeContainer from "./components/HomeContainer";
import HeroSection from "./components/HeroSection";
import AboutMeSection from "./components/AboutMeSection";
import NavBar from "@/app/common/NavBar";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <HomeContainer>
        <HeroSection />
        <AboutMeSection/>
        {/* <ProjectsPreview /> */}
        {/* <BlogPreview /> */}
        {/* <Footer /> */}
      </HomeContainer>
    </>
  );
}

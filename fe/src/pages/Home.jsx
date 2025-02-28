import AboutComponent from "../components/AboutComponent"
import ArtikelComponent from "../components/ArtikelComponent"
import CtaComponent from "../components/CtaComponent"
import GaleryComponent from "../components/GaleryComponent"
import HeroComponent from "../components/HeroComponent"
import KonsultasiComponent from "../components/KonsultasiComponent"
import NavbarComponent from "../components/NavbarComponent"
import ServiceComponent from "../components/ServiceComponent"
import TeamComponent from "../components/TeamComponent"

const Home = () => {
  return (
    <div>
      <NavbarComponent />
      <HeroComponent />
      <AboutComponent />
      <CtaComponent />
      <ServiceComponent />
      <TeamComponent />
      <ArtikelComponent />
      <GaleryComponent />
      <KonsultasiComponent />
    </div>
  )
}

export default Home

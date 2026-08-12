import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from './Home';
import About from './About';
import VisionMission from './VisionMission';
import Businesses from './Businesses';
import Contact from './Contact';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
          <VisionMission />
        </section>
        <section id="businesses">
          <Businesses />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

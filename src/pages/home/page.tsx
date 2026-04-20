import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Testimonial from './components/Testimonial';
import Stats from './components/Stats';
import Appointment from './components/Appointment';
import Blog from './components/Blog';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Services />
        <Pricing />
        <Testimonial />
        <Stats />
        <Appointment />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}

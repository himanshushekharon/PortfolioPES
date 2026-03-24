import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureCards from './components/Features';
import Skills from './components/Skills';
import Training from './components/Training';
import Education from './components/Education';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Particles from './components/Particles';
import PageTransition from './components/PageTransition';
import Chatbot from './components/Chatbot';
import Journey from './components/Journey';

function App() {
  const location = useLocation();
  const { pathname, hash } = location;
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('hasSeenLoader');
  });

  const handleLoaderFinish = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasSeenLoader', 'true');
  };

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader key="loader" finishLoading={handleLoaderFinish} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative overflow-x-hidden min-h-screen text-[#2A3B4C] dark:text-gray-200 transition-colors duration-300"
      >
      {/* Background abstract decorations */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Particles 
          particleColors={['#20A274', '#3BAFDA', '#ffffff']} 
          particleCount={150} 
          particleSpread={12} 
          speed={0.1}
          particleBaseSize={80}
          sizeRandomness={1.5}
        />
        
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-[#e6f4ff] to-transparent rounded-full blur-3xl opacity-70 dark:opacity-20"></div>
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] bg-gradient-to-l from-[#e1f5f3] to-transparent rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-gradient-to-t from-[#e6f4ff] to-transparent rounded-full blur-3xl opacity-70"></div>

        <div className="absolute top-32 left-8 w-16 h-16 decorative-dots opacity-40"></div>
        <div className="absolute top-1/3 right-12 w-20 h-20 decorative-dots opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 decorative-dots opacity-30"></div>

        <div className="absolute top-24 left-1/3 w-4 h-4 rounded bg-[#3BAFDA] rotate-45 opacity-60"></div>
        <div className="absolute top-1/2 right-1/4 w-6 h-6 rounded bg-[#2E8B7E] rotate-12 opacity-40"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <Navbar />
        <main className="w-full flex w-full flex-col items-center min-h-[calc(100vh-100px)]">
          <AnimatePresence mode="wait">
            <Routes location={location} key={pathname}>
              <Route path="/" element={
                <PageTransition>
                  <Hero />
                  <div className="w-full relative py-12 flex flex-col items-center">
                    {/* Elegant glass structural background instead of skewed line */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-[96%] max-w-[1500px] h-full bg-white/40 dark:bg-[#070e17]/50 backdrop-blur-3xl -z-10 mt-10 rounded-[40px] border border-white/60 dark:border-[#20A274]/15 shadow-2xl dark:shadow-[0_0_40px_rgba(32,162,116,0.05)]"></div>
                    <FeatureCards />
                  </div>
                </PageTransition>
              } />
              <Route path="/journey" element={<PageTransition><Journey /></PageTransition>} />
              <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
              <Route path="/training" element={<PageTransition><Training /></PageTransition>} />
              <Route path="/education" element={<PageTransition><Education /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
              <Route path="/certificates" element={<PageTransition><Certificates /></PageTransition>} />
              <Route path="/achievements" element={<PageTransition><Achievements /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </main>
      </div>
      <Chatbot />
    </motion.div>
    </>
  );
}

export default App;

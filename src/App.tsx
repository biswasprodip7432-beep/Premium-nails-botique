/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, 
  X, 
  Star, 
  Instagram, 
  Phone, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  Crown, 
  Waves,
  Zap
} from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bgFlash, setBgFlash] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const triggerBgAnimate = () => {
    setBgFlash(true);
    setTimeout(() => setBgFlash(false), 1000);
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Book Now', href: '#booking' }
  ];

  const services = [
    { icon: <Sparkles className="w-6 h-6" />, name: 'Gel Manicure', desc: 'Long-lasting high-gloss finish with premium curating.', price: '$65' },
    { icon: <Zap className="w-6 h-6" />, name: 'Acrylic Extensions', desc: 'Sculpted length and strength for the perfect silhouette.', price: '$85' },
    { icon: <Crown className="w-6 h-6" />, name: 'Nail Art', desc: 'Bespoke hand-painted designs from minimalist to avant-garde.', price: '$95+' },
    { icon: <Waves className="w-6 h-6" />, name: 'Paraffin Treatment', desc: 'Deep hydration and relaxation for tired hands.', price: '$55' },
    { icon: <Heart className="w-6 h-6" />, name: 'Bridal Package', desc: 'Complete consultation and service for your special day.', price: '$250' },
    { icon: <Star className="w-6 h-6" />, name: 'Luxury Pedicure', desc: 'Foot soak, scrub, and massage with designer polish.', price: '$75' },
  ];

  const testimonials = [
    { text: "Absolutely the best nail experience in the city. I won't go anywhere else.", author: "Sofia M.", location: "Manhattan" },
    { text: "My bridal package was a dream. Every detail was perfect.", author: "Rachel K.", location: "Brooklyn" },
    { text: "Worth every penny. The quality and attention here is unmatched.", author: "Priya L.", location: "Upper East Side" },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-luxury-black flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-serif tracking-widest text-luxury-gold mb-2">VELOUR</h1>
          <div className="h-px w-12 bg-luxury-gold mx-auto mt-4" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen transition-colors duration-1000 ${bgFlash ? 'bg-[#1a1505]' : 'bg-luxury-black'}`}>
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl md:text-3xl font-serif tracking-tighter text-luxury-white hover:text-luxury-gold transition-colors">
            Velour <span className="text-luxury-gold">Nails</span>
          </a>
          
          <div className="hidden md:flex space-x-12 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm uppercase tracking-widest text-luxury-white/70 hover:text-luxury-gold transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-luxury-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button 
            className="md:hidden text-luxury-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed inset-0 bg-luxury-black z-30 pt-32 px-10 md:hidden"
          >
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-3xl font-serif text-luxury-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Particles Simulation */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-luxury-gold/20 rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random() 
              }}
              animate={{ 
                y: [null, Math.random() * -100 - 50 + "px"],
                opacity: [0, 0.5, 0]
              }}
              transition={{ 
                duration: Math.random() * 5 + 5, 
                repeat: Infinity,
                delay: Math.random() * 10
              }}
            />
          ))}
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1 border border-luxury-gold/30 rounded-full mb-8 bg-luxury-gold/5"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-luxury-gold">
              Rated #1 in NYC ⭐⭐⭐⭐⭐
            </span>
          </motion.div>
          <h1 className="text-6xl md:text-9xl font-serif leading-none mb-6">
            Where Luxury <br /> Meets <span className="italic gold-gradient-text">Precision</span>
          </h1>
          <p className="text-lg md:text-xl text-luxury-white/60 mb-10 max-w-2xl mx-auto font-light">
            New York's Premier Nail Boutique — By Appointment Only
          </p>
          <motion.button
            onClick={triggerBgAnimate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 overflow-hidden border border-luxury-gold text-luxury-gold tracking-widest uppercase text-xs font-semibold"
          >
            <span className="relative z-10">Reserve Your Visit</span>
            <div className="absolute inset-0 bg-luxury-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <style dangerouslySetInnerHTML={{ __html: `
              .group:hover { color: #0a0a0a !important; }
            `}} />
          </motion.button>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="bg-luxury-black border-y border-luxury-gold/20 py-6 overflow-hidden">
        <div className="flex whitespace-nowrap marquee-container">
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ x: "-100%" }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex space-x-12 pr-12 text-luxury-gold uppercase tracking-[0.4em] font-medium text-sm"
            >
              <span>Luxury Nail Art</span>
              <span>•</span>
              <span>Gel Extensions</span>
              <span>•</span>
              <span>Bridal Packages</span>
              <span>•</span>
              <span>Nail Treatments</span>
              <span>•</span>
              <span>Premium Acrylics</span>
              <span>•</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-serif italic text-luxury-rose leading-tight">
              "Every nail tells a story of elegance."
            </h2>
            <div className="w-24 h-1 bg-luxury-gold" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-luxury-white/70 text-lg md:text-xl font-light leading-relaxed"
          >
            <p>
              Nestled in the heart of Manhattan, Velour Nails NYC is more than a boutique—it is a sanctuary for those who demand the highest standards in nail aesthetics. 
            </p>
            <p>
              With over 10 years of experience serving the city's fashion elite, our philosophy is simple: uncompromising quality, health-conscious products, and an obsession with the finer details. We use only the most premium designer polishes and sustainable treatments.
            </p>
            <div className="flex items-center space-x-4 pt-4 text-luxury-gold">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-semibold">10+ Years Excellence</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-32 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-serif mb-4 gold-gradient-text uppercase tracking-tight">Our Signature Services</h2>
            <p className="text-luxury-white/40 uppercase tracking-[0.3em] text-xs">Curated for the Manhattan Elite</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, borderColor: 'rgba(201, 168, 76, 0.4)' }}
                className="bg-luxury-black/40 p-10 border border-luxury-gold/10 group transition-all duration-500"
              >
                <div className="text-luxury-gold mb-6 group-hover:scale-110 transition-transform duration-500 inline-block">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif mb-3 text-luxury-white">{item.name}</h3>
                <p className="text-sm text-luxury-white/50 mb-6 font-light leading-relaxed">{item.desc}</p>
                <p className="text-luxury-rose font-medium tracking-widest text-sm">Starts from {item.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-serif tracking-tighter"
            >
              The Velour <span className="italic block text-luxury-gold">Finish</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative overflow-hidden group aspect-[4/5] ${i % 2 === 0 ? 'md:mt-12' : ''}`}
              >
                <img 
                  src={`https://picsum.photos/400/500?random=${i + 10}`} 
                  alt={`Nail Art ${i}`}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter saturate-[0.8] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-luxury-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <Instagram className="text-luxury-white w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-gold/5 rounded-full blur-[100px] -z-1" />
        
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-4xl md:text-6xl font-serif mb-20 tracking-wide translate-z-0"
          >
            Words From <span className="italic">Our Clients</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -5, boxShadow: '0 10px 40px -10px rgba(201, 168, 76, 0.1)' }}
                className="bg-luxury-black p-12 border border-luxury-gold/5 relative"
              >
                <div className="flex text-luxury-gold mb-8 space-x-1">
                  {[...Array(5)].map((_, star) => <Star key={star} size={14} fill="currentColor" />)}
                </div>
                <p className="text-lg text-luxury-white/80 leading-relaxed font-light italic mb-8">
                  "{t.text}"
                </p>
                <div className="flex items-center space-x-3 pt-6 border-t border-luxury-gold/10">
                  <span className="font-serif text-xl">{t.author}</span>
                  <div className="w-1 h-1 bg-luxury-gold rounded-full" />
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold/70">{t.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section id="booking" className="py-24 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto bg-gradient-to-r from-luxury-gold via-luxury-rose to-luxury-gold bg-[length:200%_auto] p-16 md:p-32 text-center text-luxury-black animate-gradient-x"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-serif leading-none mb-8">Your Next Appointment Awaits</h2>
            <p className="text-black/70 text-lg md:text-xl font-medium mb-12 uppercase tracking-wide">
              Limited slots available each week. Book now to secure your visit.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerBgAnimate}
                className="w-full md:w-auto bg-luxury-black text-luxury-gold px-12 py-5 uppercase text-xs font-bold tracking-widest flex items-center justify-center space-x-3"
              >
                <Phone size={16} />
                <span>Call Us Now</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerBgAnimate}
                className="w-full md:w-auto bg-transparent border-2 border-luxury-black text-luxury-black px-12 py-5 uppercase text-xs font-bold tracking-widest flex items-center justify-center space-x-3"
              >
                <Instagram size={16} />
                <span>DM on Instagram</span>
              </motion.button>
            </div>
            <p className="mt-12 text-sm font-bold flex items-center justify-center space-x-2 animate-pulse">
              <span>🔥</span>
              <span className="uppercase tracking-widest">Only 3 slots left this week</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-6 border-t border-luxury-gold/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-serif mb-6">Velour <span className="text-luxury-gold italic">Nails</span></h3>
            <p className="text-luxury-white/40 max-w-sm font-light leading-relaxed">
              NYC's most exclusive boutique for bespoke nail aesthetics. Combining high-fashion trends with clinical precision since 2015.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-luxury-gold mb-8">VISIT US</h4>
            <ul className="space-y-4 text-sm font-light text-luxury-white/60">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-luxury-gold shrink-0" />
                <span>Lexington Ave, Manhattan, <br />New York City, NY 10022</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock size={18} className="text-luxury-gold shrink-0" />
                <span>Mon-Sat: 10am — 7pm</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-luxury-gold mb-8">FOLLOW</h4>
            <div className="flex space-x-6">
              <a href="#" className="text-luxury-white/60 hover:text-luxury-gold transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-luxury-white/60 hover:text-luxury-gold transition-colors font-serif italic text-xl">Pinterest</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-16 border-t border-luxury-gold/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-luxury-white/30 font-medium">
          <p>© 2025 Velour Nails NYC. All rights reserved.</p>
          <div className="flex space-x-12 mt-6 md:mt-0">
            <a href="#" className="hover:text-luxury-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-luxury-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
      `}} />
    </div>
  );
}

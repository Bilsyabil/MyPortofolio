import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring 
} from 'framer-motion';
import { 
  Terminal, 
  Code2, 
  Sparkles, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  Send, 
  Award, 
  FolderGit2, 
  Cpu, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  Rocket, 
  Globe, 
  ChevronRight, 
  Compass,
  MessageSquare,
  PhoneCall,
  Video
} from 'lucide-react';

// --- Typewriter Effect Component ---
const Typewriter = ({ words = [], delay = 120, pause = 1800 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(currentFullWord.substring(0, currentText.length - 1));
      }, delay / 2);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentFullWord.substring(0, currentText.length + 1));
      }, delay);
    }

    if (!isDeleting && currentText === currentFullWord) {
      timer = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, delay, pause]);

  return (
    <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 font-bold">
      {currentText}
      <span className="inline-block w-[3px] h-6 md:h-8 ml-1 bg-[#2c67ed] animate-pulse rounded-full align-middle" />
    </span>
  );
};

// --- HTML Canvas Dynamic Starfield Background ---
const SpaceCanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate Stars
    const numStars = 120;
    const stars = Array.from({ length: numStars }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      color: Math.random() > 0.3 ? '#ffffff' : '#60a5fa',
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
    }));

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.1) {
          star.speed = -star.speed;
        }

        ctx.save();
        ctx.globalAlpha = Math.abs(star.alpha);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        if (star.radius > 1.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#2c67ed';
        }
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05070f]">
      {/* HTML Canvas for sharp twinkling stars */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Cosmic Nebula Glow Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-[#2c67ed]/15 blur-[150px]" />
      <div className="absolute bottom-[5%] right-[-5%] w-[650px] h-[650px] rounded-full bg-indigo-900/20 blur-[170px]" />
      <div className="absolute top-[45%] left-[25%] w-[450px] h-[450px] rounded-full bg-cyan-600/10 blur-[160px]" />

      {/* Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(#2c67ed 1px, transparent 1px)`,
          backgroundSize: `40px 40px`
        }}
      />
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeTab, setActiveTab] = useState('projects');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Update Navbar Active State on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'portfolio', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  // --- Data Objects ---
  const roles = [
    'Junior Developer',
    'Tech Enthusiast',
    'Full-Stack Developer',
    'UI/UX Craftsman'
  ];

  const stats = [
    { label: 'Project Selesai', value: '15+', icon: FolderGit2 },
    { label: 'Sertifikasi Keahlian', value: '8+', icon: Award },
    { label: 'Pengalaman Coding', value: '2+ Thn', icon: Code2 },
    { label: 'Kepuasan Klien', value: '99%', icon: Cpu },
  ];

  const educationList = [
    {
      degree: 'S1 Teknik Informatika',
      institution: 'Universitas Cendekia Abditama',
      period: '2022 - Sekarang',
      desc: 'Fokus pada Software Engineering, Algoritma Pemrograman, Sistem Basis Data, dan Pengembangan Web/Mobile Modern.'
    },
    {
      degree: 'SMA IPA',
      institution: 'SMA Negeri 1 Tangerang',
      period: '2019 - 2022',
      desc: 'Aktif dalam Ekstrakurikuler Komputer, Web Development Basic, dan Komunitas Robotika.'
    }
  ];

  const experienceList = [
    {
      role: 'Frontend Developer Intern',
      company: 'Tech Solutions Indonesia',
      period: '2024 - Sekarang',
      desc: 'Mengembangkan antarmuka aplikasi web modern menggunakan React, Tailwind CSS, dan Next.js dengan standar performa & SEO tinggi.'
    },
    {
      role: 'Freelance Web Developer',
      company: 'Self-Employed',
      period: '2023 - Sekarang',
      desc: 'Membuat website portofolio, landing page UMKM, dan sistem manajemen database untuk klien lokal.'
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'SIMAHA - Presensi Mahasiswa',
      desc: 'Sistem absensi berbasis QR Code dan Geolocation dengan dashboard rekapitulasi nilai serta integrasi bot laporan otomatis.',
      tags: ['React', 'Node.js', 'Tailwind', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Cherisha Date Planner',
      desc: 'Aplikasi perencana kencan interaktif dengan rekomendasi lokasi cerdas, expense tracker, dan timeline kenangan.',
      tags: ['React Native', 'Firebase', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'RFID Smart Access Control',
      desc: 'Sistem pengunci pintu otomatis berbasis IoT menggunakan NodeMCU ESP8266 dan dashboard monitoring real-time berbasis Web.',
      tags: ['C++', 'NodeMCU', 'Express.js', 'WebSockets'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: '360° Virtual Campus Tour',
      desc: 'Pengalaman tur kampus interaktif berbasis web 3D dengan Three.js dan hotspot informasi interaktif.',
      tags: ['Three.js', 'JavaScript', 'HTML5/CSS3'],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
      demoUrl: '#',
      githubUrl: '#'
    }
  ];

  const certificates = [
    {
      title: 'Belajar Dasar Pemrograman Web',
      issuer: 'Dicoding Academy',
      date: '2024',
      credentialId: 'DICODING-WEB-8821',
      icon: Code2
    },
    {
      title: 'Full-Stack JavaScript Developer',
      issuer: 'BuildWithAngga',
      date: '2023',
      credentialId: 'BWA-FSJS-9021',
      icon: Globe
    },
    {
      title: 'Responsive Web Design Certification',
      issuer: 'freeCodeCamp',
      date: '2023',
      credentialId: 'FCC-RWD-1102',
      icon: Sparkles
    },
    {
      title: 'Git & GitHub Professional',
      issuer: 'Coursera / Google',
      date: '2023',
      credentialId: 'COURSERA-GIT-4412',
      icon: Terminal
    }
  ];

  const techStack = [
    { 
      category: 'Frontend Development', 
      skills: [
        { name: 'React.js', level: '90%' },
        { name: 'Tailwind CSS', level: '95%' },
        { name: 'JavaScript (ES6+)', level: '88%' },
        { name: 'HTML5 / CSS3', level: '95%' },
        { name: 'Next.js', level: '78%' }
      ]
    },
    { 
      category: 'Backend & Database', 
      skills: [
        { name: 'Node.js', level: '80%' },
        { name: 'Express.js', level: '82%' },
        { name: 'MySQL', level: '85%' },
        { name: 'MongoDB', level: '75%' },
        { name: 'RESTful APIs', level: '90%' }
      ]
    },
    { 
      category: 'Tools & Ecosystem', 
      skills: [
        { name: 'Git & GitHub', level: '90%' },
        { name: 'VS Code', level: '95%' },
        { name: 'Postman', level: '85%' },
        { name: 'Figma', level: '78%' },
        { name: 'Vercel / Netlify', level: '88%' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com', color: 'hover:border-slate-300 hover:text-white' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:border-blue-400 hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:border-pink-500 hover:text-pink-400' },
    { name: 'TikTok', icon: Video, href: 'https://tiktok.com', color: 'hover:border-cyan-400 hover:text-cyan-400' },
    { name: 'WhatsApp', icon: PhoneCall, href: 'https://wa.me/628123456789', color: 'hover:border-emerald-400 hover:text-emerald-400' },
  ];

  return (
    <div className="relative min-h-screen text-slate-200 font-sans selection:bg-[#2c67ed] selection:text-white bg-[#05070f] overflow-x-hidden">
      {/* Background Animated Starfield */}
      <SpaceCanvasBackground />

      {/* Top Scroll Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-[#2c67ed] to-cyan-400 z-50 origin-left shadow-[0_0_12px_#2c67ed]"
        style={{ scaleX }}
      />

      {/* --- FLOATING NAVBAR MELAYANG --- */}
      <header className="fixed top-5 inset-x-0 z-40 flex justify-center px-4">
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-1 sm:gap-2 px-4 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-[#2c67ed]/40 shadow-[0_0_25px_rgba(44,103,237,0.35)]"
        >
          {[
            { id: 'hero', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'contact', label: 'Contact' }
          ].map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`relative px-3.5 sm:px-5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'text-white font-semibold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#2c67ed] to-blue-600 rounded-full -z-10 shadow-[0_0_15px_rgba(44,103,237,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {sec.label}
              </button>
            );
          })}
        </motion.nav>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 space-y-32">

        {/* --- SECTION 1: HERO SECTION --- */}
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center items-center text-center pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2c67ed]/15 border border-[#2c67ed]/40 text-blue-300 text-xs sm:text-sm mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(44,103,237,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Open for Work & Collaboration</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
          >
            Halo, Saya <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">Developer Muda</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl sm:text-3xl font-medium text-slate-300 mb-8 min-h-[40px]"
          >
            Saya seorang <Typewriter words={roles} />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="max-w-2xl text-slate-400 text-sm sm:text-base mb-10 leading-relaxed"
          >
            Berfokus pada pengembangan aplikasi web dan mobile modern yang cepat, estetik, dan berkinerja tinggi. 
            Siap menjelajahi alam semesta teknologi dan mewujudkan ide-ide kreatif Anda!
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollTo('portfolio')}
              className="px-7 py-3.5 rounded-full bg-[#2c67ed] text-white font-semibold flex items-center gap-2 hover:bg-blue-600 shadow-[0_0_25px_rgba(44,103,237,0.6)] hover:shadow-[0_0_35px_rgba(44,103,237,0.8)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Rocket className="w-4 h-4" />
              <span>Lihat Project</span>
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="px-7 py-3.5 rounded-full bg-slate-900/80 border border-[#2c67ed]/50 text-blue-300 font-semibold flex items-center gap-2 hover:bg-[#2c67ed]/20 hover:border-[#2c67ed] backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
              <span>Hubungi Saya</span>
            </button>
          </motion.div>

          {/* Header Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 backdrop-blur-md shadow-2xl"
          >
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-[#2c67ed]/50 transition-colors group">
                  <div className="flex items-center justify-center gap-2 text-[#2c67ed] group-hover:scale-110 transition-transform mb-1">
                    <IconComp className="w-5 h-5" />
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">{stat.value}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        </section>


        {/* --- SECTION 2: ABOUT ME --- */}
        <section id="about" className="scroll-mt-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
              Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2c67ed]">Saya</span>
            </h2>
            <div className="w-20 h-1 bg-[#2c67ed] mx-auto rounded-full shadow-[0_0_10px_#2c67ed]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Avatar Orbiting Rings */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Orbiting Neon Border Effects */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#2c67ed]/40 animate-[spin_25s_linear_infinite]" />
                <div className="absolute -inset-4 rounded-full border border-blue-500/20 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2c67ed]/30 to-purple-600/20 blur-xl -z-10" />

                {/* Main Image Avatar Wrapper */}
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden p-1.5 bg-gradient-to-b from-[#2c67ed] via-indigo-600 to-slate-900 shadow-[0_0_30px_rgba(44,103,237,0.5)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" 
                      alt="Profile" 
                      className="w-full h-full object-cover object-center filter contrast-105 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Floating Badge Satellite */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-2 right-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-[#2c67ed]/60 text-xs font-semibold text-blue-300 backdrop-blur-md flex items-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Teknik Informatika</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Profile Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                <p className="text-lg font-semibold text-white">
                  Developer antusias yang berfokus membangun solusi digital modern & efisien.
                </p>
                <p>
                  Memiliki pemahaman mendalam dalam arsitektur web modern, integrasi API, serta perancangan antarmuka pengguna yang responsif. Bertekad tinggi untuk terus beradaptasi dengan tren teknologi terbaru.
                </p>
              </div>

              {/* Education & Experience Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#2c67ed]/50 transition-all">
                  <div className="flex items-center gap-2.5 text-[#2c67ed] mb-4">
                    <GraduationCap className="w-5 h-5" />
                    <h3 className="font-bold text-white text-base">Pendidikan</h3>
                  </div>
                  <div className="space-y-4">
                    {educationList.map((edu, idx) => (
                      <div key={idx} className="border-l-2 border-[#2c67ed]/50 pl-3 space-y-1">
                        <h4 className="text-sm font-bold text-white">{edu.degree}</h4>
                        <p className="text-xs text-blue-400 font-medium">{edu.institution} ({edu.period})</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{edu.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#2c67ed]/50 transition-all">
                  <div className="flex items-center gap-2.5 text-[#2c67ed] mb-4">
                    <Briefcase className="w-5 h-5" />
                    <h3 className="font-bold text-white text-base">Pengalaman</h3>
                  </div>
                  <div className="space-y-4">
                    {experienceList.map((exp, idx) => (
                      <div key={idx} className="border-l-2 border-indigo-500/50 pl-3 space-y-1">
                        <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                        <p className="text-xs text-indigo-400 font-medium">{exp.company} ({exp.period})</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{exp.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* --- SECTION 3: PORTFOLIO TABS --- */}
        <section id="portfolio" className="scroll-mt-28">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
              Eksplorasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2c67ed]">Portofolio</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Koleksi karya proyek terbaik, sertifikat resmi, serta keahlian teknologi yang dikuasai.
            </p>
          </div>

          {/* Tab Navigation Buttons */}
          <div className="flex justify-center mb-10">
            <div className="p-1.5 rounded-full bg-slate-900/90 border border-slate-800/80 backdrop-blur-md flex gap-2">
              {[
                { id: 'projects', label: 'Projects', icon: FolderGit2 },
                { id: 'certificates', label: 'Certificates', icon: Award },
                { id: 'techstack', label: 'Tech Stack', icon: Cpu },
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#2c67ed] text-white shadow-[0_0_20px_rgba(44,103,237,0.7)]' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animated Tab Switch Content */}
          <AnimatePresence mode="wait">
            {/* TAB 1: PROJECTS */}
            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {projects.map((proj) => (
                  <motion.div
                    key={proj.id}
                    whileHover={{ y: -6 }}
                    className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden hover:border-[#2c67ed]/60 transition-all duration-300 group shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={proj.image} 
                          alt={proj.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      </div>

                      <div className="p-6 space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                          {proj.desc}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                          {proj.tags.map((tag, i) => (
                            <span 
                              key={i} 
                              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#2c67ed]/15 text-blue-300 border border-[#2c67ed]/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex items-center gap-4">
                      <a 
                        href={proj.demoUrl} 
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#2c67ed] hover:bg-blue-600 text-white text-xs font-semibold transition-colors shadow-[0_0_12px_rgba(44,103,237,0.4)]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                      <a 
                        href={proj.githubUrl} 
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* TAB 2: CERTIFICATES */}
            {activeTab === 'certificates' && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {certificates.map((cert, idx) => {
                  const IconC = cert.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#2c67ed]/60 transition-all flex items-start gap-4 shadow-md"
                    >
                      <div className="p-3 rounded-xl bg-[#2c67ed]/20 border border-[#2c67ed]/40 text-[#2c67ed] shrink-0">
                        <IconC className="w-6 h-6" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="font-bold text-white text-base leading-snug">{cert.title}</h3>
                        <p className="text-xs text-blue-400 font-medium">{cert.issuer} • {cert.date}</p>
                        <p className="text-[11px] text-slate-500 font-mono">ID Credential: {cert.credentialId}</p>
                        <div className="pt-2">
                          <button className="text-xs font-semibold text-[#2c67ed] hover:underline flex items-center gap-1">
                            <span>Verifikasi Lisensi</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* TAB 3: TECH STACK */}
            {activeTab === 'techstack' && (
              <motion.div
                key="techstack"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {techStack.map((group, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#2c67ed]/40 transition-all">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#2c67ed]" />
                      <span>{group.category}</span>
                    </h3>
                    <div className="space-y-4">
                      {group.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-slate-200">{skill.name}</span>
                            <span className="text-blue-400">{skill.level}</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: skill.level }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: sIdx * 0.1 }}
                              className="h-full bg-gradient-to-r from-[#2c67ed] to-cyan-400 rounded-full shadow-[0_0_8px_#2c67ed]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>


        {/* --- SECTION 4: CONTACT & SOCIAL MEDIA --- */}
        <section id="contact" className="scroll-mt-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
              Kirim <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2c67ed]">Pesan</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Ada ide proyek menarik atau ingin berkolaborasi? Mari terhubung langsung dengan saya!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Social Links & Info Box */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
                <h3 className="text-xl font-bold text-white mb-4">Kontak & Media Sosial</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="p-3 rounded-xl bg-[#2c67ed]/20 text-[#2c67ed]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Email Resmi</p>
                      <p className="text-sm font-semibold text-white">dev.portfolio@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="p-3 rounded-xl bg-[#2c67ed]/20 text-[#2c67ed]">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Lokasi</p>
                      <p className="text-sm font-semibold text-white">Tangerang / Jakarta, Indonesia</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Neon Glow Grid */}
                <div className="pt-4 border-t border-slate-800">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Temukan Saya Di</p>
                  <div className="flex flex-wrap items-center gap-3">
                    {socialLinks.map((soc, i) => {
                      const SocIcon = soc.icon;
                      return (
                        <a
                          key={i}
                          href={soc.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 transition-all duration-300 hover:shadow-[0_0_18px_rgba(44,103,237,0.6)] ${soc.color}`}
                          title={soc.name}
                        >
                          <SocIcon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interactive Contact Form Box */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl relative overflow-hidden">
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                    <h3 className="text-2xl font-bold text-white">Pesan Berhasil Terkirim!</h3>
                    <p className="text-slate-300 text-sm max-w-sm mx-auto">
                      Terima kasih telah menghubungi. Saya akan membalas pesan Anda sesegera mungkin!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">Nama Lengkap</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Masukkan nama Anda..."
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#2c67ed] focus:ring-1 focus:ring-[#2c67ed] transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">Alamat Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="nama@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#2c67ed] focus:ring-1 focus:ring-[#2c67ed] transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Subjek</label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Topik atau judul pesan..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#2c67ed] focus:ring-1 focus:ring-[#2c67ed] transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Pesan</label>
                      <textarea
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tuliskan detail pesan Anda..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#2c67ed] focus:ring-1 focus:ring-[#2c67ed] transition-all text-sm resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#2c67ed] hover:bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(44,103,237,0.5)] hover:shadow-[0_0_30px_rgba(44,103,237,0.7)] transition-all duration-300"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Pesan Sekarang</span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Space Portfolio. Single-File React Component.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <Compass className="w-4 h-4 text-[#2c67ed]" />
            <span>Built for the Space & Tech Universe</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
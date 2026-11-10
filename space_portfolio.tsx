import React, { useState, useEffect } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring, 
  useTransform 
} from 'framer-motion';
import foto_pribadi.jpg from './Pictures/foto_pribadi.jpg';
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
  User, 
  Briefcase, 
  GraduationCap, 
  Layers, 
  CheckCircle2, 
  Download, 
  ChevronRight, 
  Rocket, 
  Globe, 
  Database, 
  Wrench,
  Smartphone,
  Server,
  Star,
  Compass
} from 'lucide-react';

// --- Typewriter Effect Component ---
const Typewriter = ({ words = [], delay = 150, pause = 2000 }) => {
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
    <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 font-bold">
      {currentText}
      <span className="inline-block w-[3px] h-6 md:h-8 ml-1 bg-[#2c67ed] animate-pulse rounded-full align-middle" />
    </span>
  );
};

// --- Animated Starfield Background ---
const StarfieldBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#05070f]">
      {/* Deep Space Cosmic Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#2c67ed]/15 blur-[140px]" />
      <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-900/15 blur-[160px]" />
      <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[150px]" />

      {/* Dynamic Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: star.size > 2 ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none',
          }}
          animate={{
            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Grid Pattern with subtle opacity */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#2c67ed 1px, transparent 1px)`,
          backgroundSize: `36px 36px`
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

  // Scroll indicator line
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Handle active navbar indicator base on scroll
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

  // --- Data Arrays ---
  const roles = [
    'Junior Developer',
    'Tech Enthusiast',
    'Full Stack Developer',
    'Problem Solver'
  ];

  const stats = [
    { label: 'Project Selesai', value: '15+', icon: FolderGit2 },
    { label: 'Sertifikasi Keahlian', value: '8+', icon: Award },
    { label: 'Pengalaman Coding', value: '2+ Thn', icon: Code2 },
    { label: 'Teknologi Dikuasai', value: '12+', icon: Cpu },
  ];

  const educationList = [
    {
      degree: 'S1 Teknik Informatika',
      institution: 'Universitas Cendekia Abditama',
      period: '2022 - Sekarang',
      desc: 'Fokus pada Software Engineering, Algoritma Pemrograman, Sistem Basis Data, dan Pengembangan Aplikasi Web/Mobile.'
    },
    {
      degree: 'SMA IPA',
      institution: 'SMA Negeri 1 Tangerang',
      period: '2019 - 2022',
      desc: 'Aktif dalam klub Robotika dan Olimpiade Komputer dasar.'
    }
  ];

  const experienceList = [
    {
      role: 'Frontend Developer Intern',
      company: 'Tech Solutions Indonesia',
      period: '2024 - Present',
      desc: 'Mengembangkan antarmuka aplikasi web modern menggunakan React, Tailwind CSS, dan Next.js dengan standar performa tinggi.'
    },
    {
      role: 'Freelance Web Developer',
      company: 'Self-Employed',
      period: '2023 - Present',
      desc: 'Membuat website portofolio, landing page UMKM, dan sistem manajemen inventaris untuk klien lokal.'
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'SIMAHA - System Presensi Mahasiswa',
      desc: 'Sistem absensi berbasis QR Code dan Geolocation dengan dashboard rekapitulasi nilai serta integrasi bot laporan otomatis.',
      tags: ['React', 'Node.js', 'Tailwind', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Cherisha Date Planner App',
      desc: 'Aplikasi perencana kencan interaktif dengan rekomendasi lokasi cerdas, expense tracker, dan timeline kenangan.',
      tags: ['React Native', 'Firebase', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'RFID IoT Smart Access Control',
      desc: 'Sistem pengunci pintu otomatis menggunakan sensor RFID, NodeMCU ESP8266, dan dashboard monitoring real-time berbasis Web.',
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
      title: 'Git & GitHub Version Control Professional',
      issuer: 'Coursera / Google',
      date: '2023',
      credentialId: 'COURSERA-GIT-4412',
      icon: Terminal
    }
  ];

  const techStack = [
    { category: 'Frontend', skills: [
      { name: 'React.js', level: '90%' },
      { name: 'Tailwind CSS', level: '95%' },
      { name: 'JavaScript (ES6+)', level: '88%' },
      { name: 'HTML5 / CSS3', level: '95%' },
      { name: 'Next.js', level: '75%' }
    ]},
    { category: 'Backend & Database', skills: [
      { name: 'Node.js', level: '80%' },
      { name: 'Express.js', level: '82%' },
      { name: 'MySQL', level: '85%' },
      { name: 'MongoDB', level: '75%' },
      { name: 'REST APIs', level: '90%' }
    ]},
    { category: 'Tools & DevOps', skills: [
      { name: 'Git & GitHub', level: '90%' },
      { name: 'VS Code', level: '95%' },
      { name: 'Postman', level: '85%' },
      { name: 'Figma', level: '78%' },
      { name: 'Vercel / Netlify', level: '88%' }
    ]}
  ];

  return (
    <div className="relative min-h-screen text-slate-200 font-sans selection:bg-[#2c67ed] selection:text-white bg-[#05070f] overflow-x-hidden">
      {/* Background Animated Space Effect */}
      <StarfieldBackground />

      {/* Top Scroll Progress Indicator Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-[#2c67ed] to-cyan-400 z-50 origin-left shadow-[0_0_12px_#2c67ed]"
        style={{ scaleX }}
      />

      {/* --- Floating Centered Futuristic Navbar --- */}
      <header className="fixed top-5 inset-x-0 z-40 flex justify-center px-4">
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-1 sm:gap-2 px-4 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-[#2c67ed]/40 shadow-[0_0_25px_rgba(44,103,237,0.35)]"
        >
          {['hero', 'about', 'portfolio', 'contact'].map((sec) => {
            const labels = { hero: 'Beranda', about: 'Tentang', portfolio: 'Portofolio', contact: 'Kontak' };
            const isActive = activeSection === sec;
            return (
              <button
                key={sec}
                onClick={() => scrollTo(sec)}
                className={`relative px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'text-white' 
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
                {labels[sec]}
              </button>
            );
          })}
        </motion.nav>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 space-y-32">

        {/* --- SECTION 1: HERO SECTION --- */}
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center items-center text-center pt-10">
          {/* Futuristic Badge */}
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

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
          >
            Halo, Saya <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">Developer Muda</span>
          </motion.h1>

          {/* Typewriter Subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl sm:text-3xl font-medium text-slate-300 mb-8 min-h-[40px]"
          >
            Saya seorang <Typewriter words={roles} />
          </motion.div>

          {/* Bio Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="max-w-2xl text-slate-400 text-sm sm:text-base mb-10 leading-relaxed"
          >
            Berfokus pada pengembangan aplikasi web dan mobile yang modern, estetik, dan berkinerja tinggi. 
            Siap menjelajahi alam semesta teknologi dan menghidupkan ide-ide kreatif Anda!
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollTo('portfolio')}
              className="px-7 py-3.5 rounded-full bg-[#2c67ed] text-white font-semibold flex items-center gap-2 hover:bg-blue-600 shadow-[0_0_25px_rgba(44,103,237,0.6)] hover:shadow-[0_0_35px_rgba(44,103,237,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Rocket className="w-4 h-4" />
              <span>Lihat Portofolio</span>
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="px-7 py-3.5 rounded-full bg-slate-900/80 border border-[#2c67ed]/50 text-blue-300 font-semibold flex items-center gap-2 hover:bg-[#2c67ed]/20 hover:border-[#2c67ed] backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
              <span>Hubungi Saya</span>
            </button>
          </motion.div>

          {/* Quick Stats Grid Header */}
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
            {/* Space Avatar Ring */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Glowing Cosmic Orbit Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#2c67ed]/40 animate-[spin_25s_linear_infinite]" />
                <div className="absolute -inset-4 rounded-full border border-blue-500/20 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2c67ed]/30 to-purple-600/20 blur-xl -z-10" />

                {/* Main Profile Container */}
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden p-1.5 bg-gradient-to-b from-[#2c67ed] via-indigo-600 to-slate-900 shadow-[0_0_30px_rgba(44,103,237,0.5)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" 
                      alt="Profile" 
                      className="w-full h-full object-cover object-center filter contrast-105 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Floating Orbiting Satellite Card */}
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

            {/* Bio & Details Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                <p className="text-lg font-semibold text-white">
                  Pengembang perangkat lunak bertekad tinggi yang gemar memecahkan tantangan dengan kode yang bersih & efisien.
                </p>
                <p>
                  Saya memiliki ketertarikan mendalam dalam ekosistem pengembangan web modern, pengembangan mobile, serta eksplorasi teknologi baru seperti IoT dan AI integration. Selalu bersemangat untuk belajar hal baru dan berkolaborasi dalam tim.
                </p>
              </div>

              {/* Education & Experience Sub-sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {/* Education Box */}
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

                {/* Experience Box */}
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
              Koleksi karya proyek terbaik, sertifikat resmi, serta teknologi yang dikuasai sejauh ini.
            </p>
          </div>

          {/* Tab Navigation Buttons */}
          <div className="flex justify-center mb-10">
            <div className="p-1.5 rounded-full bg-slate-900/90 border border-slate-800/80 backdrop-blur-md flex gap-2">
              {[
                { id: 'projects', label: 'Proyek Utama', icon: FolderGit2 },
                { id: 'certificates', label: 'Sertifikat', icon: Award },
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

          {/* TAB CONTENTS */}
          <AnimatePresence mode="wait">
            {/* SUB-TAB 1: PROJECTS */}
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
                      {/* Card Header Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={proj.image} 
                          alt={proj.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                          {proj.desc}
                        </p>
                        
                        {/* Tech Tag Pills */}
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

                    {/* Footer Actions */}
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

            {/* SUB-TAB 2: CERTIFICATES */}
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
                        <p className="text-[11px] text-slate-500 font-mono">ID: {cert.credentialId}</p>
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

            {/* SUB-TAB 3: TECH STACK */}
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


        {/* --- SECTION 4: CONTACT --- */}
        <section id="contact" className="scroll-mt-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
              Kirim <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2c67ed]">Pesan</span>
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Punya ide proyek, tawaran pekerjaan, atau sekadar ingin berdiskusi seputar teknologi? Kirimkan pesan Anda di bawah!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Info & Socials Left Box */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
                <h3 className="text-xl font-bold text-white mb-4">Mari Terhubung</h3>
                
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

                <div className="pt-4 border-t border-slate-800">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Sosial Media</p>
                  <div className="flex items-center gap-3">
                    {[
                      { icon: Github, href: "#", name: "GitHub" },
                      { icon: Linkedin, href: "#", name: "LinkedIn" },
                      { icon: Instagram, href: "#", name: "Instagram" },
                    ].map((soc, i) => {
                      const SocIcon = soc.icon;
                      return (
                        <a
                          key={i}
                          href={soc.href}
                          className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-[#2c67ed] transition-all duration-300 hover:shadow-[0_0_15px_rgba(44,103,237,0.7)]"
                          aria-label={soc.name}
                        >
                          <SocIcon className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form Right Box */}
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
                    <h3 className="text-2xl font-bold text-white">Pesan Terkirim!</h3>
                    <p className="text-slate-300 text-sm max-w-sm mx-auto">
                      Terima kasih telah menghubungi. Saya akan membalas pesan Anda secepatnya!
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
                          placeholder="Masukkan nama..."
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
                        placeholder="Topik pesan..."
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
                        placeholder="Tuliskan pesan Anda di sini..."
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
          <p>© {new Date().getFullYear()} Space Portfolio. Designed with React & Tailwind CSS.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <Compass className="w-4 h-4 text-[#2c67ed]" />
            <span>Built for the Digital Universe</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
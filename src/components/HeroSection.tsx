import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, Instagram } from "lucide-react";

const HeroSection: React.FC = () => {
  const particlesRef = useRef<HTMLCanvasElement>(null);

  // Simple interactive particles
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles: { x: number; y: number; dx: number; dy: number }[] = [];
    const count = 25;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,200,255,0.5)";
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/assets/resume.pdf";
    link.download = "Harish_D_Resume.pdf";
    link.click();
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Darkhand333", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/d-harish-7a569a316", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/hari_idfc_333", label: "Instagram" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Smooth particles background */}
      <canvas ref={particlesRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Aurora corner glow */}
      <div className="absolute top-[20%] left-[15%] w-[25rem] h-[25rem] bg-cyan-400/30 rounded-full blur-[140px]" />
      <div className="absolute bottom-[10%] right-[15%] w-[20rem] h-[20rem] bg-pink-400/20 rounded-full blur-[120px]" />

      {/* Center Content */}
      <div className="relative z-10 container-max mx-auto flex flex-col items-center text-center space-y-8">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl lg:text-2xl font-light tracking-[0.3em] text-primary uppercase cursor-default select-none"
        >
          Hi, I’m
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent tracking-tight drop-shadow-2xl cursor-default select-none"
        >
          HARISH D
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg lg:text-2xl text-text-secondary italic cursor-default select-none"
        >
          Building experiences with <span className="text-primary">code</span> &{" "}
          <span className="text-accent">creativity</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-base lg:text-lg text-text-muted max-w-xl px-4 bg-white/5 backdrop-blur-md rounded-xl p-4 shadow-md cursor-default select-none"
        >
          Passionate Developer | UI/UX Designer | Innovator
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Download Resume → black text */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadResume}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-black font-semibold flex items-center gap-2 shadow-lg hover:shadow-primary/40 transition"
          >
            <Download size={20} />
            Download Resume
          </motion.button>

          {/* Contact button stays same */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="px-6 py-3 rounded-xl border border-primary/40 bg-background/40 backdrop-blur-md text-primary font-semibold flex items-center gap-2 shadow-md hover:border-primary transition"
          >
            <Mail size={20} />
            Contact Me
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex gap-6 justify-center mt-4"
        >
          {socialLinks.map((social) => {
            const hoverColor =
              social.label === "GitHub"
                ? "hover:text-black"
                : social.label === "LinkedIn"
                ? "hover:text-blue-600"
                : "hover:text-pink-500";

            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 6 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md shadow-md hover:bg-primary/20 transition"
                aria-label={social.label}
              >
                <social.icon
                  size={22}
                  className={`text-text-secondary transition-colors ${hoverColor}`}
                />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

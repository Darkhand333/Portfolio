import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Heart,
} from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // load lightweight particles preset
    }).then(() => {
      setEngineReady(true);
    });
  }, []);

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Darkhand333",
      label: "GitHub",
      color: "hover:text-gray-400",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/d-harish-hd0333",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/hari_idfc_333",
      label: "Instagram",
      color: "hover:text-pink-400",
    },
    {
      icon: Mail,
      href: "mailto:harishdeivasagayam@gmail.com",
      label: "Email",
      color: "hover:text-green-400",
    },
  ];

  const quickLinks = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-background-secondary border-t border-border overflow-hidden">
      {/* Particles Background */}
      {engineReady && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: "transparent" },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: true, mode: "push" },
              },
              modes: { repulse: { distance: 100 }, push: { quantity: 3 } },
            },
            particles: {
              color: { value: "rgba(56,189,248,0.5)" }, // 🔹 matches Hero/About
              links: {
                enable: true,
                color: "rgba(56,189,248,0.5)", // 🔹 matches Hero/About
                distance: 150,
                opacity: 0.4,
              },
              move: { enable: true, speed: 1.2 },
              number: { value: 60 },
              opacity: { value: 0.6 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 4 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Content */}
      <div className="container-max mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block mb-4">
              <h3
                className="text-2xl font-bold text-gradient cursor-pointer"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                𝑯𝑨𝑹𝑰𝑺𝑯 𝔻
              </h3>
            </motion.div>
            <p className="text-text-secondary leading-relaxed mb-6 max-w-md">
              Passionate developer and designer creating futuristic web
              experiences with modern technologies. Always exploring new
              possibilities in the digital world.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 bg-surface border border-border rounded-lg hover:border-primary transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => scrollToSection(link.id)}
                    className="text-text-secondary hover:text-primary transition-colors text-left"
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-foreground mb-6">
              Get In Touch
            </h4>
            <div className="space-y-3 text-text-secondary">
              <div>
                <div className="text-sm text-text-muted">Email</div>
                <a
                  href="mailto:harishdeivasagayam@gmail.com"
                  className="hover:text-primary transition-colors break-all"
                >
                  harishdeivasagayam@gmail.com
                </a>
              </div>
              <div>
                <div className="text-sm text-text-muted">Location</div>
                <div>Chennai, Tamil Nadu, India</div>
              </div>
              <div>
                <div className="text-sm text-text-muted">Availability</div>
                <div className="text-green-400">Open for opportunities</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center"
        >
          {/* Copyright */}
          <div className="text-text-muted text-sm mb-4 md:mb-0 flex items-center">
            © {currentYear} Harish D. All Rights Reserved. Made with
            <Heart size={16} className="mx-1 text-red-400" /> and lots of ☕
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-surface border border-border rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp
              size={20}
              className="text-text-secondary group-hover:text-primary transition-colors"
            />
          </motion.button>
        </motion.div>

        {/* Additional Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-6 text-center"
        >
          <div className="text-xs text-text-muted">
            Built with React, TypeScript, TailwindCSS, Framer Motion & Three.js
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

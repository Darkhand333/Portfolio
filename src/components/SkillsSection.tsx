import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Palette,
  Database,
  Smartphone,
  Settings,
  Terminal,
} from "lucide-react";

const SkillsSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas particles (same as About)
  useEffect(() => {
    const canvas = canvasRef.current;
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
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(56,189,248,0.5)";
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

  const skillCategories = [
    {
      title: "Frontend",
      icon: Code,
      skills: ["React.js", "TailwindCSS", "Framer Motion", "Three.js", "HTML5", "CSS3"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Backend",
      icon: Database,
      skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Auth", "WebSockets"],
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Languages",
      icon: Terminal,
      skills: ["Python", "JS", "TS", "SQL", "Bash"],  
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Tools",
      icon: Settings,
      skills: ["Git", "GitHub", "VS Code", "Linux"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Design",
      icon: Palette,
      skills: ["Figma", "UI/UX", "Adobe Photoshop", "Prototyping"],
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Mobile",
      icon: Smartphone,
      skills: ["React Native", "PWA", "Responsive UI", "Cross-platform"],
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Particles Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Glow Blobs */}
      <div className="absolute top-[15%] left-[10%] w-[20rem] h-[20rem] bg-sky-400/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[10%] right-[10%] w-[18rem] h-[18rem] bg-pink-400/20 blur-[100px] rounded-full" />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient mb-3">
            My Skills & Expertise
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            Modern technologies and tools I use to build digital solutions efficiently.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 22px rgba(56,189,248,0.45)",
              }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-glass p-6 rounded-xl cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center mb-3">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-3 flex items-center justify-center`}
                >
                  <category.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 justify-start">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1 bg-surface border border-border rounded text-xs text-text-secondary"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

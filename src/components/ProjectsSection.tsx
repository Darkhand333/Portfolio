import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveDemo: string;
  github: string;
  pdf?: string;
  category: string;
  date: string;
  team: string;
  awards?: string[];
}

const ProjectsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas particles
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

  const projects: Project[] = [
    {
      id: 1,
      title: "Face Recognition Attendance Monitoring System",
      description: "A smart attendance system using face recognition to automate and enhance accuracy.",
      longDescription: "Real-time attendance monitoring using computer vision and face recognition.",
      image: "/02.png",
      technologies: ["Python", "OpenCV", "Flask", "SQLite", "ML"],
      liveDemo: "https://example.com",
      github: "https://github.com/harishd/face-recognition-attendance",
      pdf: "/docs/face-recognition.pdf",
      category: "AI/ML",
      date: "2024",
      team: "Team of 2",
      awards: ["Best Academic Project"],
    },
    {
      id: 2,
      title: "AI’s Impact on Marketing and Brand Visibility",
      description: "A research-driven project analyzing how AI transforms digital marketing strategies.",
      longDescription: "Exploring predictive analytics, personalization, AI chatbots, and automation.",
      image: "/03.png",
      technologies: ["Python", "Analytics", "AI", "NLP"],
      liveDemo: "https://example.com",
      github: "https://github.com/harishd/ai-marketing",
      pdf: "/docs/ai-marketing.pdf",
      category: "Research",
      date: "2023",
      team: "Solo Project",
      awards: ["Research Presentation Award"],
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A futuristic personal portfolio showcasing skills, projects, and creativity.",
      longDescription: "Modern web dev with React, Three.js, Framer Motion, and TailwindCSS.",
      image: "/01.png",
      technologies: ["React", "Three.js", "Framer Motion", "TailwindCSS"],
      liveDemo: "https://example.com",
      github: "https://github.com/harishd/portfolio",
      pdf: "/docs/portfolio.pdf",
      category: "Portfolio",
      date: "2025",
      team: "Solo Project",
      awards: ["Creative Excellence Award"],
    },
    {
      id: 4,
      title: "DAAKLE",
      description: "An AI + IoT powered project focusing on smart data analytics and automation.",
      longDescription: "AI + IoT for predictive analytics, automation, and decision-making.",
      image: "/api/placeholder/600/400",
      technologies: ["AI", "IoT", "Python", "Cloud"],
      liveDemo: "https://example.com",
      github: "https://github.com/harishd/daakle",
      pdf: "/docs/daakle.pdf",
      category: "AI/ML",
      date: "2024",
      team: "Team Project",
      awards: ["Innovation Award"],
    },
  ];

  const sortedProjects = [...projects].sort((a, b) => parseInt(b.date) - parseInt(a.date));

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <section className="section-padding bg-background-secondary/20 relative overflow-hidden">
      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Glow blobs */}
      <div className="absolute top-[15%] left-[10%] w-[20rem] h-[20rem] bg-sky-400/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[10%] right-[10%] w-[18rem] h-[18rem] bg-pink-400/20 blur-[100px] rounded-full" />

      <div className="container-max mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-[30px] md:text-[32px] font-bold text-gradient mb-2">
            Featured Projects
          </h2>
        </motion.div>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-primary/20 text-white rounded-full hover:bg-primary/40 transition"
          >
            &#8592;
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-primary/20 text-white rounded-full hover:bg-primary/40 transition"
          >
            &#8594;
          </button>

          <div ref={scrollRef} className="flex gap-6 overflow-hidden py-4 scroll-smooth">
            {sortedProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
                className="relative w-[280px] flex-shrink-0"
              >
                <div className="bg-glass p-4 rounded-lg cursor-pointer flex flex-col h-full transition-shadow duration-300 hover:shadow-[0_0_18px_rgba(59,130,246,0.5)]">
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-400"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-xs line-clamp-3 flex-grow">
                    {project.description}
                  </p>
                  <div className="mt-3 text-right">
                    <span className="text-xs font-semibold text-primary bg-background px-2 py-0.5 rounded-md shadow-sm">
                      {project.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

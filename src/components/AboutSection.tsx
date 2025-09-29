import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const AboutSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth particles background (non-blinking, interactive)
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
      ctx.fillStyle = "rgba(56,189,248,0.5)"; // sky-blue
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

  return (
    <section className="relative section-padding bg-background overflow-hidden">
      {/* Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Aurora Glow Corners */}
      <div className="absolute top-[15%] left-[10%] w-[20rem] h-[20rem] bg-sky-400/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[10%] right-[10%] w-[18rem] h-[18rem] bg-pink-400/20 blur-[100px] rounded-full" />

      <div className="relative z-10 container-max mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative inline-block">
              {/* Image Glow */}
              <div className="absolute -top-10 -left-10 w-36 h-36 bg-sky-400 blur-3xl opacity-30 rounded-full" />
              <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-sky-400 blur-3xl opacity-30 rounded-full" />

              {/* Profile Card */}
              <div className="relative rounded-2xl overflow-hidden bg-surface/40 backdrop-blur-md shadow-lg shadow-sky-300/30 border border-sky-200/10 max-w-[350px]">
                <img
                  src="/1.png"
                  alt="Harish D Profile"
                  className="block w-full h-auto object-contain relative z-10"
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-6 w-10 h-10 border-2 border-sky-300 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-6 -left-6 w-8 h-8 bg-sky-300/30 rounded-full"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <p className="text-primary font-medium uppercase tracking-widest text-sm">
                Get to know me
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient mt-2">
                About Me
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mt-3" />
            </div>

            {/* Description */}
            <div className="space-y-4 text-text-secondary text-lg leading-relaxed bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-md">
              <p>
                I'm <span className="text-primary font-semibold">Harish D</span>, 
                a passionate developer and designer who blends code with creativity. 
                I specialize in <span className="text-secondary font-semibold">Python</span> 
                and <span className="text-secondary font-semibold">UI/UX design</span>, 
                building futuristic and interactive web experiences.
              </p>
              <p>
                My toolset includes <span className="text-primary">React</span>, 
                <span className="text-primary"> TailwindCSS</span>, 
                <span className="text-primary"> Framer Motion</span>, 
                <span className="text-primary"> Three.js</span>, 
                <span className="text-primary"> Node.js</span>, 
                <span className="text-primary"> MongoDB</span>, 
                <span className="text-primary"> Git/GitHub</span>, 
                <span className="text-primary"> Figma</span>, and more.
              </p>
              <p>
                I love exploring new technologies and creative design approaches 
                to deliver impactful digital solutions that push the boundaries 
                of what's possible on the web.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-2">
              {[
                { number: "50+", label: "Projects" },
                { number: "2+", label: "Years Exp." },
                { number: "100%", label: "Satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.08 }}
                  className="text-center bg-white/5 backdrop-blur-md rounded-xl p-4 shadow-md"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-gradient mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </div>

           {/* Skills */}
<div className="flex flex-wrap gap-3 pt-4">
  {["React", "Python", "UI/UX", "Three.js", "Node.js", "MongoDB"].map(
    (skill) => (
      <motion.span
        key={skill}
        whileHover={{ scale: 1.1 }}
        className="px-4 py-2 bg-surface/40 border border-border/40 backdrop-blur-md rounded-full text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-all cursor-pointer select-none"
      >
        {skill}
      </motion.span>
    )
  )}
</div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

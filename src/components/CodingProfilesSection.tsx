import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, TrendingUp, Code, Star } from 'lucide-react';
import * as THREE from 'three';

interface CodingProfile {
  id: number;
  name: string;
  username: string;
  profileUrl: string;
  logo: string;
  stats: {
    problems?: number;
    rating?: number;
    rank?: string;
    contests?: number;
    stars?: number;
    contributions?: number;
  };
  achievements: string[];
  color: string;
  description: string;
}

const CodingProfilesSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const profiles: CodingProfile[] = [
    {
      id: 1,
      name: 'GitHub',
      username: 'harishd',
      profileUrl: 'https://github.com/harishd',
      logo: '/api/placeholder/60/60',
      stats: {
        contributions: 1250,
        stars: 150,
      },
      achievements: ['Arctic Code Vault Contributor', '100+ Repositories', 'Open Source Contributor'],
      color: '#333',
      description: 'Open source contributions and project repositories'
    },
    {
      id: 2,
      name: 'LeetCode',
      username: 'harishd',
      profileUrl: 'https://leetcode.com/harishd',
      logo: '/api/placeholder/60/60',
      stats: {
        problems: 450,
        rating: 1800,
        rank: 'Expert'
      },
      achievements: ['200+ Problems Solved', 'Contest Participant', 'Algorithm Expert'],
      color: '#FFA116',
      description: 'Problem solving and algorithmic challenges'
    },
    {
      id: 3,
      name: 'HackerRank',
      username: 'harishd',
      profileUrl: 'https://hackerrank.com/harishd',
      logo: '/api/placeholder/60/60',
      stats: {
        problems: 300,
        stars: 5,
        rank: 'Gold Badge'
      },
      achievements: ['Gold Badge Holder', 'SQL Expert', '30 Days of Code'],
      color: '#00EA64',
      description: 'Programming skills and technical assessments'
    },
    {
      id: 4,
      name: 'Codeforces',
      username: 'harishd',
      profileUrl: 'https://codeforces.com/profile/harishd',
      logo: '/api/placeholder/60/60',
      stats: {
        rating: 1600,
        contests: 50,
        rank: 'Specialist'
      },
      achievements: ['Contest Regular', 'Problem Setter', 'Algorithm Specialist'],
      color: '#1F8ACB',
      description: 'Competitive programming and contests'
    }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    
    renderer.setSize(400, 300);
    renderer.setClearColor(0x000000, 0);

    // Create floating code symbols
    const geometry = new THREE.RingGeometry(0.1, 0.3, 6);
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x79c1a7, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x90d491, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0xFFA116, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0x00EA64, wireframe: true }),
    ];

    const rings: THREE.Mesh[] = [];
    
    for (let i = 0; i < 8; i++) {
      const ring = new THREE.Mesh(geometry, materials[i % materials.length]);
      ring.position.set(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3
      );
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      scene.add(ring);
      rings.push(ring);
    }

    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);
      
      rings.forEach((ring, index) => {
        ring.rotation.x += 0.01;
        ring.rotation.y += 0.005;
        ring.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
      });
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = Math.min(400, window.innerWidth * 0.6);
      const height = Math.min(300, window.innerHeight * 0.3);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section className="section-padding bg-background-secondary/30">
      <div className="container-max mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-primary font-semibold text-lg mb-2">
            Competitive programming journey
          </div>

          {/* Updated Heading Size: 30–32px */}
          <h2 className="text-[30px] md:text-[32px] font-bold text-gradient mb-4">
            Coding Profiles & Achievements
          </h2>

          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6" />
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Track my coding journey across various platforms, showcasing problem-solving skills 
            and competitive programming achievements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profiles Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {profiles.map((profile) => (
              <motion.div
                key={profile.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="card-glass group cursor-pointer"
              >
                {/* Profile Header */}
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{ backgroundColor: `${profile.color}15` }}
                  >
                    <img
                      src={profile.logo}
                      alt={`${profile.name} logo`}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {profile.name}
                    </h3>
                    <p className="text-text-muted text-sm">@{profile.username}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm mb-4">
                  {profile.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {Object.entries(profile.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold text-gradient">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                      </div>
                      <div className="text-xs text-text-muted capitalize">
                        {key === 'problems' ? 'Problems' : 
                         key === 'rating' ? 'Rating' :
                         key === 'rank' ? 'Rank' :
                         key === 'contests' ? 'Contests' :
                         key === 'stars' ? 'Stars' :
                         key === 'contributions' ? 'Contributions' : key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Achievements */}
                <div className="space-y-2 mb-4">
                  {profile.achievements.slice(0, 2).map((achievement, index) => (
                    <div key={index} className="flex items-center text-xs text-text-secondary">
                      <Award size={12} className="text-primary mr-2 flex-shrink-0" />
                      {achievement}
                    </div>
                  ))}
                </div>

                {/* Visit Profile Button */}
                <motion.a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-secondary flex items-center justify-center gap-2 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit Profile
                  <ExternalLink size={14} />
                </motion.a>
              </motion.div>
            ))}
          </motion.div>

          {/* 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center"
          >
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto rounded-lg"
                style={{ filter: 'drop-shadow(0 0 20px rgba(121, 193, 167, 0.2))' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg pointer-events-none" />
            </div>

            {/* Stats Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-2 gap-6 w-full max-w-xs"
            >
              <div className="text-center glass rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Code className="text-primary mr-2" size={20} />
                </div>
                <div className="text-2xl font-bold text-gradient">750+</div>
                <div className="text-sm text-text-muted">Problems Solved</div>
              </div>
              
              <div className="text-center glass rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="text-secondary mr-2" size={20} />
                </div>
                <div className="text-2xl font-bold text-gradient">1700+</div>
                <div className="text-sm text-text-muted">Avg Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Competitive Programming Journey
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              My coding journey spans across multiple platforms where I've solved hundreds of problems, 
              participated in contests, and contributed to open-source projects. Each platform has helped 
              me develop different aspects of programming - from algorithmic thinking to practical implementation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Star className="text-primary" size={16} />
                Active on 4+ platforms
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Award className="text-secondary" size={16} />
                10+ achievements earned
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <TrendingUp className="text-primary" size={16} />
                Consistent progress tracking
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProfilesSection;

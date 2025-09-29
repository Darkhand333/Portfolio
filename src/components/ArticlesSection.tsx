import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  link: string;
}

const ArticlesSection: React.FC = () => {
  const articles: Article[] = [
    {
      id: 1,
      title: 'Building Modern Web Applications with React and TypeScript',
      excerpt: 'Explore the best practices for creating scalable and maintainable web applications using React and TypeScript. Learn about component architecture, state management, and performance optimization.',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Web Development',
      image: '/api/placeholder/400/250',
      link: 'https://medium.com/@harishd/react-typescript-guide'
    },
    {
      id: 2,
      title: 'The Future of UI/UX Design: Trends and Predictions',
      excerpt: 'Discover the emerging trends in UI/UX design for 2024 and beyond. From AI-powered interfaces to immersive experiences, learn what\'s shaping the future of digital design.',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'Design',
      image: '/api/placeholder/400/250',
      link: 'https://medium.com/@harishd/future-ui-ux-design'
    },
    {
      id: 3,
      title: 'Mastering Three.js: Creating Stunning 3D Web Experiences',
      excerpt: 'A comprehensive guide to getting started with Three.js and creating interactive 3D experiences on the web. Covers basic concepts, animation, and optimization techniques.',
      date: '2024-01-05',
      readTime: '12 min read',
      category: 'Web Development',
      image: '/api/placeholder/400/250',
      link: 'https://medium.com/@harishd/threejs-guide'
    },
    {
      id: 4,
      title: 'Python for Web Development: Flask vs Django',
      excerpt: 'Compare the two most popular Python web frameworks and learn when to use each one. Includes practical examples and performance considerations.',
      date: '2023-12-28',
      readTime: '10 min read',
      category: 'Backend',
      image: '/api/placeholder/400/250',
      link: 'https://medium.com/@harishd/flask-vs-django'
    },
    {
      id: 5,
      title: 'Building Responsive Web Applications with TailwindCSS',
      excerpt: 'Learn how to create beautiful, responsive designs efficiently using TailwindCSS. Discover utility-first approach and advanced customization techniques.',
      date: '2023-12-20',
      readTime: '7 min read',
      category: 'CSS',
      image: '/api/placeholder/400/250',
      link: 'https://medium.com/@harishd/tailwindcss-guide'
    },
    {
      id: 6,
      title: 'Animation in Web Development: Framer Motion Deep Dive',
      excerpt: 'Master the art of web animations with Framer Motion. Learn how to create smooth, performant animations that enhance user experience.',
      date: '2023-12-15',
      readTime: '9 min read',
      category: 'Animation',
      image: '/api/placeholder/400/250',
      link: 'https://medium.com/@harishd/framer-motion-guide'
    }
  ];

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="section-padding bg-background">
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
            Knowledge sharing
          </div>
          <h2 className="heading-lg text-gradient mb-4">
            Latest Articles & Insights
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6" />
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Sharing my thoughts and experiences on web development, design, 
            and emerging technologies through detailed articles and tutorials.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article) => (
            <motion.article
              key={article.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03,
                rotateY: 3,
                transition: { duration: 0.3 }
              }}
              className="card-glass group cursor-pointer overflow-hidden"
            >
              {/* Article Image */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>

                {/* Read Article Button */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-primary rounded-full text-white shadow-lg"
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </div>
              </div>

              {/* Article Content */}
              <div className="space-y-4">
                {/* Article Meta */}
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(article.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {article.readTime}
                  </div>
                </div>

                {/* Article Title */}
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Article Excerpt */}
                <p className="text-text-secondary text-sm line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Read More Link */}
                <motion.a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-primary-dark transition-colors pt-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  Read Article
                  <ArrowRight size={16} />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All Articles Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://medium.com/@harishd"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center gap-3"
          >
            <BookOpen size={20} />
            View All Articles
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Stay Updated
            </h3>
            <p className="text-text-secondary mb-6">
              Subscribe to get notified about new articles and insights on web development and design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-surface border border-border rounded-lg text-foreground placeholder-text-muted focus:border-primary focus:outline-none transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-6 py-3"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArticlesSection;
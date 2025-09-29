# 🚀 Harish D - Optimized Portfolio Website

A high-performance, futuristic portfolio website built with React.js, featuring optimized animations, 3D effects, and responsive design for all devices.

## ✨ Features

### Frontend
- **Performance Optimized**: Lazy loading, reduced animations for low-end devices
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Futuristic UI**: Dark theme with neon gradients and glass morphism
- **3D Effects**: Three.js powered floating icons and interactive visuals
- **Smooth Animations**: Framer Motion with performance optimizations
- **Interactive Elements**: Custom cursor, particle effects, hover animations
- **SEO Optimized**: Meta tags, semantic HTML, accessibility features

### Backend
- **Express.js Server**: Fast and secure backend API
- **Email Integration**: Contact form with auto-reply functionality
- **Rate Limiting**: Protection against spam and abuse
- **Analytics**: Basic visitor and interaction tracking
- **Security**: Helmet.js, CORS, input validation

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Three.js** for 3D effects
- **EmailJS** for contact forms

### Backend
- **Node.js** with Express.js
- **Nodemailer** for email functionality
- **Express Validator** for input validation
- **Helmet.js** for security
- **Morgan** for logging

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Performance/
│   │   │   └── LazySection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ArticlesSection.tsx
│   │   ├── CodingProfilesSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── OptimizedBulletParticles.tsx
│   │   ├── OptimizedCursor.tsx
│   │   └── OptimizedCursor.css
│   ├── hooks/
│   │   └── useIntersectionObserver.ts
│   ├── utils/
│   │   └── performance.ts
│   ├── pages/
│   │   └── OptimizedPortfolio.tsx
│   ├── assets/
│   └── index.css
├── server/
│   ├── routes/
│   │   ├── contact.js
│   │   └── analytics.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── public/
│   ├── assets/
│   │   └── resume.pdf
│   └── index.html
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env file with your credentials
# Add your Gmail credentials for contact form

# Start server
npm run dev
```

## ⚙️ Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Gmail Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

JWT_SECRET=your-super-secret-jwt-key
```

## 🎯 Performance Optimizations

### Automatic Optimizations
- **Device Detection**: Automatically reduces effects on low-end devices
- **Lazy Loading**: Components load only when needed
- **Reduced Motion**: Respects user accessibility preferences
- **Hardware Acceleration**: CSS transforms optimized for GPU
- **Bundle Splitting**: Code splitting for faster initial load

### Manual Optimizations
- **Throttled Events**: Mouse and scroll events are throttled
- **Efficient Animations**: Uses transform and opacity for smooth 60fps
- **Minimal Re-renders**: Optimized React component updates
- **Compressed Assets**: Images and fonts optimized for web

## 📱 Responsive Design

- **Desktop**: Full experience with all animations and effects
- **Tablet**: Optimized touch interactions and layouts
- **Mobile**: Simplified animations, touch-friendly navigation
- **Low-End Devices**: Automatic fallbacks for better performance

## 🔧 Customization

### Colors
Edit `src/index.css` to change the color scheme:
```css
:root {
  --primary: 152 69% 56%; /* Mint green */
  --secondary: 93 50% 68%; /* Light green */
  --background: 235 39% 6%; /* Dark blue */
}
```

### Content
Update the content in each component file:
- `HeroSection.tsx` - Main headline and intro
- `AboutSection.tsx` - About information
- `SkillsSection.tsx` - Skills and technologies
- `ProjectsSection.tsx` - Portfolio projects
- `ContactSection.tsx` - Contact information

## 📊 Analytics

The backend includes basic analytics tracking:
- Page views
- Contact form submissions  
- Resume downloads
- Project interactions

Access analytics at: `GET /api/analytics/stats`

## 🔐 Security Features

- **Rate Limiting**: Prevents spam and abuse
- **Input Validation**: Server-side validation for all forms
- **CORS Protection**: Configured for secure cross-origin requests
- **Helmet.js**: Security headers and protection
- **XSS Prevention**: Input sanitization and validation

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Push to your hosting platform
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Harish D**
- Email: harishdeivasagayam@gmail.com
- Portfolio: [Live Demo](your-portfolio-url)
- GitHub: [@harishd](https://github.com/harishd)

---

⭐ Star this repository if you found it helpful!
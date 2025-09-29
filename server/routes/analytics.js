const express = require('express');
const router = express.Router();

// Simple in-memory analytics storage (use database in production)
let analytics = {
  pageViews: 0,
  contactForms: 0,
  downloadResume: 0,
  projectViews: {},
  dailyStats: {}
};

// Helper function to get current date
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Track page view
router.post('/page-view', (req, res) => {
  try {
    const { page } = req.body;
    const today = getCurrentDate();
    
    analytics.pageViews++;
    
    if (!analytics.dailyStats[today]) {
      analytics.dailyStats[today] = {
        pageViews: 0,
        contactForms: 0,
        resumeDownloads: 0
      };
    }
    
    analytics.dailyStats[today].pageViews++;
    
    res.status(200).json({ 
      success: true, 
      message: 'Page view tracked' 
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to track analytics' 
    });
  }
});

// Track contact form submission
router.post('/contact-form', (req, res) => {
  try {
    const today = getCurrentDate();
    
    analytics.contactForms++;
    
    if (!analytics.dailyStats[today]) {
      analytics.dailyStats[today] = {
        pageViews: 0,
        contactForms: 0,
        resumeDownloads: 0
      };
    }
    
    analytics.dailyStats[today].contactForms++;
    
    res.status(200).json({ 
      success: true, 
      message: 'Contact form submission tracked' 
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to track analytics' 
    });
  }
});

// Track resume download
router.post('/resume-download', (req, res) => {
  try {
    const today = getCurrentDate();
    
    analytics.downloadResume++;
    
    if (!analytics.dailyStats[today]) {
      analytics.dailyStats[today] = {
        pageViews: 0,
        contactForms: 0,
        resumeDownloads: 0
      };
    }
    
    analytics.dailyStats[today].resumeDownloads++;
    
    res.status(200).json({ 
      success: true, 
      message: 'Resume download tracked' 
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to track analytics' 
    });
  }
});

// Track project view
router.post('/project-view', (req, res) => {
  try {
    const { projectId } = req.body;
    
    if (!analytics.projectViews[projectId]) {
      analytics.projectViews[projectId] = 0;
    }
    
    analytics.projectViews[projectId]++;
    
    res.status(200).json({ 
      success: true, 
      message: 'Project view tracked' 
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to track analytics' 
    });
  }
});

// Get analytics data (protected route - add authentication in production)
router.get('/stats', (req, res) => {
  try {
    const today = getCurrentDate();
    const todayStats = analytics.dailyStats[today] || {
      pageViews: 0,
      contactForms: 0,
      resumeDownloads: 0
    };
    
    res.status(200).json({
      success: true,
      data: {
        total: {
          pageViews: analytics.pageViews,
          contactForms: analytics.contactForms,
          resumeDownloads: analytics.downloadResume
        },
        today: todayStats,
        projectViews: analytics.projectViews,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch analytics' 
    });
  }
});

module.exports = router;
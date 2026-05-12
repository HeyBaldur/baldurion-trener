import type { Translations } from './es';

export const en: Translations = {
  nav: {
    home: 'Home',
    articles: 'Articles',
    coaching: 'Coaching',
    about: 'About',
    contact: 'Contact',
  },
  hero: {
    latest: 'Latest article',
    featured: 'Featured',
  },
  article: {
    readMore: 'Read more',
    readingTime: 'min read',
    by: 'By',
    publishedOn: 'Published on',
    updatedOn: 'Updated on',
    relatedArticles: 'Related articles',
    notTranslated: 'This article is not yet translated. Showing Spanish version.',
    backToArticles: 'Back to articles',
  },
  categories: {
    entrenamiento: 'Training',
    nutricion: 'Nutrition',
    lesiones: 'Injuries',
    metodologia: 'Methodology',
    ciencia: 'Science',
    'casos-de-estudio': 'Case Studies',
  },
  filter: {
    all: 'All',
    filterBy: 'Filter by category',
  },
  cta: {
    coachingTitle: 'Want to take your training to the next level?',
    coachingBody:
      "I work with a limited number of clients to guarantee personalized attention. If you're ready to train with science and commitment, let's talk.",
    coachingButton: 'Talk to Rudolf',
  },
  footer: {
    tagline: 'Made with rigor in Katowice.',
    siteTagline: 'Training science. No noise.',
    taglineCentral: 'Training science. No noise.',
    navTitle: 'Navigation',
    legalTitle: 'Legal',
    legal: 'Legal notice',
    legalNotice: 'Legal notice',
    privacy: 'Privacy',
    cookies: 'Cookies',
    terms: 'Terms',
    preferences: 'Preferences',
    rights: 'All rights reserved',
    copyright: 'Made with rigor in Katowice.',
    euTitle: 'European Union',
    euSubtitle: 'Made in Poland · EU Member State',
    gdprBadge: 'GDPR Compliant',
    googlePlayKicker: 'Get it on',
    googlePlayLabel: 'Google Play',
    googlePlayAriaLabel: 'Download SmartGym on Google Play',
  },
  home: {
    hero: {
      eyebrow: 'PERSONAL TRAINER · KATOWICE · ONLINE',
      titleLine1: 'Fitboxing',
      titleLine2: 'and personal training.',
      subtitle:
        "Doing cardio on a treadmill is fine, but it's not the same as punching, kicking, jumping, dodging and moving your whole body.",
      ctaPrimary: 'Book your free call',
      ctaSecondary: 'See the method',
      badgeTop: 'Technical follow-up',
      badgeBottom: 'Personalized plan',
      stat1Value: '9+ years',
      stat1Label: 'Martial arts and combat',
      stat2Value: '12 weeks',
      stat2Label: 'Method · 4 levels',
      stat3Value: 'ES · EN · PL',
      stat3Label: 'Online and in-person',
    },
  },
  coaching: {
    metaTitle: 'Coaching · Baldurion Program',
    metaDescription:
      'Baldurion Program. Structured 12-week method for people who take their transformation seriously. Online and in-person in Katowice.',
    hero: {
      pretitle: 'Baldurion Program',
      titleLine1: 'Be your most',
      titleEmphasis: 'brutal self',
      subtitle:
        'Structured 12-week method. Adapted to your level. Applied to your discipline. Not for the lukewarm.',
      ctaPrimary: 'Book free call',
      ctaSecondary: 'See method',
      bottomMetaTitle: 'Katowice · Poland',
      bottomMetaText: 'Online global · In-person Katowice',
      bgTextLeft: 'FORGE',
      bgTextRight: 'STRENGTH',
    },
    audience: {
      sectionEyebrow: 'Before we start',
      sectionTitle: 'Is this for you?',
      sectionSubtitle:
        "I work with people who genuinely want to improve. It doesn't matter where you're starting from: what matters is where you want to go and how you want to get there.",
      yesTitle: 'Yes, this is for you',
      noTitle: "Maybe it's not your moment",
      yesItems: [
        'You want to look and feel better: stronger, more capable, with a body you enjoy living in.',
        "You're motivated to train with purpose: hitting the gym, lifting, learning boxing or martial arts technique.",
        "You're ready to commit for a few months and see real progress, not week-long results.",
        'You like understanding what you do. You want to know why each exercise is in your plan.',
      ],
      noItems: [
        "You're after effortless one-month results. Here we work seriously, and that's exactly why it works.",
        "You don't feel like committing right now. No worries, the door stays open for when you're ready.",
        "You'd rather train alone without guidance. That's valid too, it's just not what I offer.",
        "You're hoping I'll only tell you what you want to hear. I'm honest with you because that's what moves you forward.",
      ],
    },
    method: {
      sectionEyebrow: 'How we work',
      sectionTitle: 'The method',
      sectionSubtitle:
        'Structured 12-week program. Each phase has a clear goal. We adapt intensity to your level, but the method is the same.',
      phases: [
        {
          number: '0',
          label: 'Start',
          title: 'Evaluation',
          duration: 'WEEK 0',
          description: 'Before training, I get to know you. We define starting point and level.',
          items: [
            'Complete medical questionnaire',
            'History of injuries, sleep, lifestyle',
            'Physical test adapted to your discipline',
            'Body measurements (in-person)',
          ],
        },
        {
          number: '1',
          label: 'Phase 1',
          title: 'Fundamentals',
          duration: 'WEEKS 1-4',
          description: 'Building the base. Technical learning transversal to all levels.',
          items: [
            'CORE, posture, breathing',
            'Fundamental patterns (squat, hinge, press)',
            'Mobility and exercise technique',
            'Work capacity',
          ],
        },
        {
          number: '2',
          label: 'Phase 2',
          title: 'Forge',
          duration: 'WEEKS 5-8',
          description: 'Real loads. This is where transformation starts becoming visible.',
          items: [
            'Load intensification',
            'Explosive strength',
            'Metabolic capacity',
            'Application to your discipline',
          ],
        },
        {
          number: '3',
          label: 'Phase 3',
          title: 'Test',
          duration: 'WEEKS 9-12',
          description: 'We push capacities to the limit. Measure results vs starting point.',
          items: [
            'Final performance tests',
            'Comparative measurements',
            'Progress analysis',
            'Continuity plan',
          ],
        },
      ],
    },
    levels: {
      sectionEyebrow: 'Levels',
      sectionTitle: 'I meet you where you are',
      sectionSubtitle:
        'After evaluation, I place you in one of four levels. The method is the same; intensity and load adapt.',
      items: [
        {
          name: 'Beginner',
          description:
            'No prior experience or years without training. We start with the basics: technique before load.',
        },
        {
          name: 'Intermediate',
          description: "You have a base but you're stuck. We polish technique and raise the demands.",
        },
        {
          name: 'Advanced',
          description: 'You train seriously. Here we work on specialization and real strength.',
        },
        {
          name: 'Expert',
          description:
            'Athlete with solid experience. We pursue performance, optimization and personal ceiling.',
        },
      ],
    },
    modalities: {
      sectionEyebrow: 'Modalities',
      sectionTitle: 'How we work together',
      online: {
        badge: 'Modality 1',
        title: 'Online',
        location: 'Any city · Spanish-speaking',
        features: [
          'Structured training plan',
          'Technical follow-up via video',
          'Direct communication via WhatsApp',
          'Weekly program adjustments',
          'Measurement review (with your own scale)',
        ],
      },
      onsite: {
        badge: 'Modality 2',
        title: 'In-person',
        location: 'Katowice and surroundings · Poland',
        features: [
          'Face-to-face gym sessions',
          'Live technical correction',
          'Measurements with Xiaomi Mi Scale 2',
          'Complete physical tests on site',
          'Direct communication between sessions',
        ],
      },
    },
    ctaFinal: {
      eyebrow: 'Next step',
      title: 'Up for the challenge?',
      subtitle:
        "Book your free 30-minute call. I'll explain the program, ask the questions I need, and we'll decide if we're a fit.",
      button: 'Book a call →',
    },
  },
  about: {
    metaTitle: 'About Rudolf · Baldurion',
    metaDescription:
      'Rudolf Jaubert, certified personal trainer in Katowice. Years of experience in sport, strength, and martial arts applied to real people.',
    heroTitle:
      'Punch, jump, dodge… <span class="accent">don\'t just run</span>',
    heroSubtitle:
      "Cardio doesn't have to be boring. It can be an experience that makes you grow, feel better, get stronger and actually enjoy the process.",
    photoAlt: 'Rudolf Jaubert',
    body: {
      lead: "I'm Rudolf Jaubert.",
      paragraphs: [
        "I've spent years in sport: athletics, gyms, Kung Fu under master Victor On, and years of sparring and combat — first as a practitioner, and now as a certified trainer.",
        "I'm not here to sell you a secret. I'm here to offer you structure and method to build what you already have inside: to feel better about yourself, enjoy the journey, and build your best version.",
      ],
    },
    cta: {
      eyebrow: 'Next step',
      title: 'Ready to start?',
      subtitle: "We'll work together on a clear plan tailored to your real life.",
      primaryAction: 'Start now',
      secondaryAction: "Let's talk",
    },
  },
  contact: {
    metaTitle: 'Contact · Baldurion',
    metaDescription:
      'Book a free 30-minute call with Rudolf Jaubert to talk about your training goals.',
    eyebrow: "Let's talk",
    title: 'Shall we start?',
    leadParagraph: "The best way to know if we're a fit is to talk for 30 minutes.",
    body: [
      "I don't sell training packages cold. Before any commitment, I prefer a short call where you tell me where you are, what you want to achieve, and what you've tried before. If we're a fit, we talk about how we work. If not, I'll point you in a better direction at no cost.",
      'The call is <strong>free</strong>, with no commitment, and lasts 30 minutes. Book the slot that works best for you directly in my calendar.',
    ],
    calendlyButtonLabel: 'Book a 30-min call',
    calendlyHelpText: 'Opens in a new tab on Calendly',
    altContactLabel: 'You can also email me',
    altContactEmail: 'contact.smartgymapp@gmail.com',
  },
  theme: {
    light: 'Light mode',
    dark: 'Dark mode',
  },
  error404: {
    title: '404 — Page not found',
    body: 'This page does not exist or has been moved.',
    back: 'Back to home',
  },
  rss: {
    title: 'Baldurion — Articles',
    description: 'Fitness, training and sports nutrition based on science.',
  },
  brand: {
    siteName: 'Baldurion',
    eyebrow: 'Personal Trainer',
    tagline: 'Evidence-based training.',
  },
  banner: {
    eyebrow: 'Privacy',
    title: 'About your privacy',
    body: "We don't use analytics, tracking, or marketing cookies. We only store your theme and language locally. Third-party embeds load only when you activate them.",
    primaryAction: 'Got it',
    secondaryAction: 'Learn more',
  },
  legal: {
    category: 'Legal information',
    lastUpdated: 'Last updated',
    tableOfContents: 'Contents',
  },
  preferences: {
    title: 'Privacy preferences',
    subtitle: 'Control how this site uses your browser.',
    sitePrefTitle: 'Site preferences',
    sitePrefBody:
      'We store your theme (light/dark) and language in localStorage so you do not have to reconfigure them on every visit. This is required for the site to function.',
    sitePrefStatus: 'Active',
    embedsTitle: 'Third-party embeds',
    embedsBody:
      'YouTube, Spotify, Twitter and Instagram only load when you manually activate them in an article. Your list of activated embeds is stored locally so we do not ask again.',
    embedsClear: 'Clear embeds',
    embedsCleared: 'Embed list cleared.',
    trackingTitle: 'Analytics & tracking',
    trackingBody:
      'Baldurion uses no analytics whatsoever. No Google Analytics, no pixels, no tracking.',
    trackingStatus: 'Not applicable',
    rightsTitle: 'Your GDPR rights',
    rightsBody:
      'You can exercise your rights of access, rectification, erasure, objection and portability by writing to contact.smartgymapp@gmail.com. We respond within 30 days.',
  },
};
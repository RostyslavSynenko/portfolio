import articlePhoto1 from '../assets/blog/article_photo_1.jpeg';
import defibrillatorsMapUrl from '../assets/projects/defibrillators-map.png';
import barcelonaUrl from '../assets/projects/barcelona-fan-website.jpg';
import portfolioVer1Url from '../assets/projects/my-portfolio-v1.jpg';

export const navLinks = [
  { path: '/', title: 'Home', exact: true },
  { path: '/about', title: 'About' },
  { path: '/projects', title: 'Projects' },
  { path: '/contacts', title: 'Contacts' },
  { path: '/blog', title: 'Blog' }
];

export const mockArticles = [
  {
    id: 1,
    tags: ['thoughts', 'about me'],
    date: new Date(2019, 11, 19),
    title: 'My road to the Web Development',
    text:
      "Hello, awesome! I'm Rostyslav Synenko - Front-End Developer. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n" +
      ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    imageUrl: articlePhoto1
  }
];

export const socialMedia = [
  {
    title: 'GitHub',
    iconClass: 'fa-github',
    url: 'https://github.com/RostyslavSynenko'
  },
  {
    title: 'LinkedIn',
    iconClass: 'fa-linkedin-in',
    url: 'https://www.linkedin.com/in/rostyslav-synenko/'
  },
  {
    title: 'Facebook',
    iconClass: 'fa-facebook-f',
    url: 'https://www.facebook.com/rostyslav.synenko'
  },
  {
    title: 'Instagram',
    iconClass: 'fa-instagram',
    url: 'https://www.instagram.com/rsynenko/'
  },
  {
    title: 'Telegram',
    iconClass: 'fa-telegram-plane',
    url: 'https://t.me/rsynenko'
  }
];

export const skills = [
  {
    title: 'HTML',
    url: 'https://img.icons8.com/color/48/000000/html-5.png'
  },
  {
    title: 'CSS',
    url: 'https://img.icons8.com/color/48/000000/css3.png'
  },

  {
    title: 'JavaScript',
    url:
      'https://img.icons8.com/color/48/000000/javascript.png'
  },
  {
    title: 'TypeScript',
    url:
      'https://img.icons8.com/color/48/000000/typescript.png'
  },
  {
    title: 'Angular',
    url:
      'https://img.icons8.com/color/48/000000/angularjs.png'
  },
  {
    title: 'React',
    url:
      'https://img.icons8.com/color/48/000000/react-native.png'
  },
  {
    title: 'Redux',
    url: 'https://img.icons8.com/color/48/000000/redux.png'
  },
  {
    title: 'Sass',
    url: 'https://img.icons8.com/color/48/000000/sass.png'
  },
  {
    title: 'Node.js',
    url: 'https://img.icons8.com/color/48/000000/nodejs.png'
  },
  {
    title: 'MongoDB',
    url:
      'https://img.icons8.com/color/48/000000/mongodb.png'
  },
  {
    title: 'MySQL',
    url:
      'https://img.icons8.com/ios/50/000000/mysql-logo.png'
  },
  {
    title: 'Git',
    url: 'https://img.icons8.com/color/48/000000/git.png'
  },
  {
    title: 'Bootstrap',
    url:
      'https://img.icons8.com/color/48/000000/bootstrap.png'
  }
];

export const projects = [
  {
    title: 'Defibrillators Map',
    description:
      'This is a volunteer health care project. We developed a service that could help people to find the nearest place with defibrillator.',
    imgUrl: defibrillatorsMapUrl,
    gitHubUrl: 'https://github.com/LV-469/defibrillator',
    projectLink: '',
    technologies: [
      'React',
      'Redux',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mapbox',
      'Material-UI',
      'JSS',
      'Formik',
      'Jest',
      'Axios',
      'Passport.js',
      'JWT',
      'Bcrypt',
      'Socket.io',
      'Git',
      'GitHub'
    ]
  },
  {
    title: 'Barcelona Fan Website',
    description: 'IT course web project with a few pages.',
    imgUrl: barcelonaUrl,
    gitHubUrl:
      'https://github.com/RostyslavSynenko/Lv-469.NodeJS/tree/master/webtasks',
    projectLink: '',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'localStorage',
      'indexedDB'
    ]
  },
  {
    title: 'RS Portfolio',
    description:
      "My first site I've ever made. Remember where you started",
    imgUrl: portfolioVer1Url,
    gitHubUrl:
      'https://github.com/RostyslavSynenko/my-project-portfolio',
    projectLink:
      'https://rostyslavsynenko.github.io/my-project-portfolio/',
    technologies: ['HTML', 'CSS', 'JavaScript']
  }
];

export const cvUrl =
  'https://drive.google.com/file/d/1oTZ6Zdk7SnT8xYrXkzD0xJWbBUMDobI2/view';

export const loaderLetters = 'Loading...'.split('');

import defibrillatorsMapUrl from '../../../assets/projects/defibrillators-map.png';
import barcelonaUrl from '../../../assets/projects/barcelona-fan-website.png';
import portfolioVer1Url from '../../../assets/projects/my-portfolio-v1.png';

export const projects = [
  {
    title: 'Defibrillators Map',
    description:
      'This is a volunteer health care project. We developed a service that could help people to find the nearest place with defibrillator.',
    imgUrl: defibrillatorsMapUrl,
    gitHubUrl: 'https://github.com/LV-469/defibrillator',
    link: '',
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
    link: '',
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
    link:
      'https://rostyslavsynenko.github.io/my-project-portfolio/',
    technologies: ['HTML', 'CSS', 'JavaScript']
  }
];

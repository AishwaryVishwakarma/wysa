const themes = [
  {
    name: 'Default',
    bubbleBackgroundColor: '#fff',
    backgroundGradient:
      'linear-gradient(239.26deg, #DDEEED 63.17%, #FDF1E0 94.92%)',
  },
  {
    name: 'Ocean Breeze',
    bubbleBackgroundColor: '#fff',
    backgroundGradient:
      'linear-gradient(239.26deg, #6CC1FF 63.17%, #E0F3FF 94.92%)',
  },
  {
    name: 'Sunset Serenity',
    bubbleBackgroundColor: '#fff',
    backgroundGradient:
      'linear-gradient(239.26deg, #FFB347 63.17%, #FFD47B 94.92%)',
  },
  {
    name: 'Mystic Forest',
    bubbleBackgroundColor: '#fff',
    backgroundGradient:
      'linear-gradient(239.26deg, #8BC34A 63.17%, #C8E6C9 94.92%)',
  },
  {
    name: 'Midnight Magic',
    bubbleBackgroundColor: '#fff',
    backgroundGradient:
      'linear-gradient(239.26deg, #0D47A1 63.17%, #311B92 94.92%)',
  },
  {
    name: 'Coral Charm',
    bubbleBackgroundColor: '#fff',
    backgroundGradient:
      'linear-gradient(239.26deg, #FF6F61 63.17%, #FFC3AF 94.92%)',
  },
  {
    name: 'Golden Glow',
    bubbleBackgroundColor: '#fff',
    backgroundGradient:
      'linear-gradient(239.26deg, #FFD700 63.17%, #FFECB3 94.92%)',
  },
  {
    name: 'Sunny Daybreak',
    bubbleBackgroundColor: '#FFEB3B',
    backgroundGradient:
      'linear-gradient(239.26deg, #FF8F00 63.17%, #FFD180 94.92%)',
  },
  {
    name: 'Mystic Twilight',
    bubbleBackgroundColor: '#9C27B0',
    backgroundGradient:
      'linear-gradient(239.26deg, #4527A0 63.17%, #B39DDB 94.92%)',
  },
  {
    name: 'Emerald Oasis',
    bubbleBackgroundColor: '#4CAF50',
    backgroundGradient:
      'linear-gradient(239.26deg, #00796B 63.17%, #A5D6A7 94.92%)',
  },
];

const bubbleBackgroundColors = ['#fff', '#FFEB3B', '#9C27B0', '#4CAF50'];

const backgroundGradients = [
  'linear-gradient(239.26deg, #DDEEED 63.17%, #FDF1E0 94.92%)',
  'linear-gradient(239.26deg, #6CC1FF 63.17%, #E0F3FF 94.92%)',
  'linear-gradient(239.26deg, #FFB347 63.17%, #FFD47B 94.92%)',
  'linear-gradient(239.26deg, #8BC34A 63.17%, #C8E6C9 94.92%)',
  'linear-gradient(239.26deg, #0D47A1 63.17%, #311B92 94.92%)',
  'linear-gradient(239.26deg, #FF6F61 63.17%, #FFC3AF 94.92%)',
  'linear-gradient(239.26deg, #FFD700 63.17%, #FFECB3 94.92%)',
  'linear-gradient(239.26deg, #FF8F00 63.17%, #FFD180 94.92%)',
  'linear-gradient(239.26deg, #4527A0 63.17%, #B39DDB 94.92%)',
  'linear-gradient(239.26deg, #00796B 63.17%, #A5D6A7 94.92%)',
];

const themeMap = new Map<
  string,
  {
    bubbleBackgroundColor: string;
    backgroundGradient: string;
  }
>();

themes.forEach((t) => {
  themeMap.set(t.name, {
    bubbleBackgroundColor: t.bubbleBackgroundColor,
    backgroundGradient: t.backgroundGradient,
  });
});

export {themes, bubbleBackgroundColors, backgroundGradients, themeMap};

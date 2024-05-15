const theme = {
  Default: {
    bubble_background_color: '#fff',
    background_gradient:
      'linear-gradient(239.26deg, #DDEEED 63.17%, #FDF1E0 94.92%)',
  },
  'Ocean Breeze': {
    bubble_background_color: '#fff',
    background_gradient:
      'linear-gradient(239.26deg, #6CC1FF 63.17%, #E0F3FF 94.92%)',
  },
  'Sunset Serenity': {
    bubble_background_color: '#fff',
    background_gradient:
      'linear-gradient(239.26deg, #FFB347 63.17%, #FFD47B 94.92%)',
  },
  'Mystic Forest': {
    bubble_background_color: '#fff',
    background_gradient:
      'linear-gradient(239.26deg, #8BC34A 63.17%, #C8E6C9 94.92%)',
  },
  'Midnight Magic': {
    bubble_background_color: '#fff',
    background_gradient:
      'linear-gradient(239.26deg, #0D47A1 63.17%, #311B92 94.92%)',
  },
  'Coral Charm': {
    bubble_background_color: '#fff',
    background_gradient:
      'linear-gradient(239.26deg, #FF6F61 63.17%, #FFC3AF 94.92%)',
  },
  'Golden Glow': {
    bubble_background_color: '#fff',
    background_gradient:
      'linear-gradient(239.26deg, #FFD700 63.17%, #FFECB3 94.92%)',
  },
  'Sunny Daybreak': {
    bubble_background_color: '#FFEB3B',
    background_gradient:
      'linear-gradient(239.26deg, #FF8F00 63.17%, #FFD180 94.92%)',
  },
  'Mystic Twilight': {
    bubble_background_color: '#9C27B0',
    background_gradient:
      'linear-gradient(239.26deg, #4527A0 63.17%, #B39DDB 94.92%)',
  },
  'Emerald Oasis': {
    bubble_background_color: '#4CAF50',
    background_gradient:
      'linear-gradient(239.26deg, #00796B 63.17%, #A5D6A7 94.92%)',
  },
};

const themeMap = new Map<
  string,
  {
    bubble_background_color: string;
    background_gradient: string;
  }
>();

Object.keys(theme).forEach((key) => {
  themeMap.set(key, theme[key as keyof typeof theme]);
});

export {theme, themeMap};

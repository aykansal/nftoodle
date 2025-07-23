export const squidGameTheme = {
  colors: {
    primary: '#FF0B7A',     // Vibrant pink/red from Squid Game
    secondary: '#00FF00',   // Neon green
    accent: '#45f3ff',      // Cyan glow
    background: '#0A0A0A',  // Deep black
    text: '#FFFFFF',
    overlay: 'rgba(255, 11, 122, 0.1)',
    gradients: {
      primary: 'linear-gradient(135deg, #FF0B7A 0%, #FF4D4D 100%)',
      secondary: 'linear-gradient(135deg, #00FF00 0%, #00FFFF 100%)',
      dark: 'linear-gradient(to bottom right, #0A0A0A 0%, #1A1A1A 100%)',
      glow: 'radial-gradient(circle, rgba(255, 11, 122, 0.2) 0%, transparent 70%)',
    }
  },
  animations: {
    glowPulse: {
      '0%, 100%': { 
        boxShadow: '0 0 5px #FF0B7A, 0 0 10px #FF0B7A, 0 0 15px #FF0B7A',
        transform: 'scale(1)'
      },
      '50%': { 
        boxShadow: '0 0 10px #FF0B7A, 0 0 20px #FF0B7A, 0 0 30px #FF0B7A',
        transform: 'scale(1.05)'
      },
    },
    glitch: {
      '0%': { transform: 'translate(0)' },
      '20%': { transform: 'translate(-2px, 2px)', textShadow: '2px 0 #00FF00, -2px 0 #FF0B7A' },
      '40%': { transform: 'translate(-2px, -2px)', textShadow: '-2px 0 #00FF00, 2px 0 #FF0B7A' },
      '60%': { transform: 'translate(2px, 2px)', textShadow: '2px 0 #FF0B7A, -2px 0 #00FF00' },
      '80%': { transform: 'translate(2px, -2px)', textShadow: '-2px 0 #FF0B7A, 2px 0 #00FF00' },
      '100%': { transform: 'translate(0)', textShadow: 'none' },
    },
    scanline: {
      '0%': { transform: 'translateY(-100%)' },
      '100%': { transform: 'translateY(100%)' },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-10px)' },
    }
  },
  transitions: {
    fast: '0.2s ease-in-out',
    medium: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
  effects: {
    glassmorphism: {
      background: 'rgba(10, 10, 10, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 11, 122, 0.1)',
    },
    neonGlow: {
      textShadow: '0 0 5px #FF0B7A, 0 0 10px #FF0B7A, 0 0 15px #FF0B7A',
      boxShadow: '0 0 5px #FF0B7A, 0 0 10px #FF0B7A inset',
    },
    textGradient: {
      background: 'linear-gradient(135deg, #FF0B7A 0%, #00FF00 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }
  }
} as const;
// Configuración centralizada de estilos para todos los módulos
export const stylesConfig = {
  // Colores principales
  colors: {
    primary: '#0095f6',
    primaryHover: '#0081d6',
    primaryDark: '#0077cc',
    secondary: '#8e8e93',
    accent: '#833ab4',
    
    // Texto
    textPrimary: '#262626',
    textSecondary: '#8e8e93',
    textMuted: '#c7c7cc',
    
    // Fondos
    bgPrimary: '#ffffff',
    bgSecondary: '#fafafa',
    bgTertiary: '#f2f2f2',
    
    // Superficies
    surface: '#ffffff',
    surfaceSecondary: '#f8f9fa',
    surfaceHover: '#f1f3f4',
    
    // Bordes
    border: '#dbdbdb',
    borderLight: '#efefef',
    
    // Estados
    success: '#00c851',
    error: '#ff4444',
    warning: '#ffbb33',
    info: '#33b5e5',
    
    // Fondos de estados
    successBg: '#d4edda',
    errorBg: '#f8d7da',
    warningBg: '#fff3cd',
    infoBg: '#d1ecf1'
  },
  
  // Espaciado
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  },
  
  // Tipografía
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem'
    }
  },
  
  // Bordes redondeados
  borderRadius: {
    sm: '4px',
    base: '8px',
    lg: '12px'
  },
  
  // Sombras
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)'
  },
  
  // Transiciones
  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease'
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
};

// Función para generar variables CSS
export function generateCSSVariables() {
  const variables = [];
  
  // Colores
  Object.entries(stylesConfig.colors).forEach(([key, value]) => {
    variables.push(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`);
  });
  
  // Espaciado
  Object.entries(stylesConfig.spacing).forEach(([key, value]) => {
    variables.push(`--spacing-${key}: ${value};`);
  });
  
  // Tipografía
  variables.push(`--font-family: ${stylesConfig.typography.fontFamily};`);
  Object.entries(stylesConfig.typography.fontSize).forEach(([key, value]) => {
    variables.push(`--font-size-${key}: ${value};`);
  });
  
  // Bordes redondeados
  Object.entries(stylesConfig.borderRadius).forEach(([key, value]) => {
    variables.push(`--border-radius-${key}: ${value};`);
  });
  
  // Sombras
  Object.entries(stylesConfig.shadows).forEach(([key, value]) => {
    variables.push(`--shadow-${key}: ${value};`);
  });
  
  // Transiciones
  Object.entries(stylesConfig.transitions).forEach(([key, value]) => {
    variables.push(`--transition-${key}: ${value};`);
  });
  
  return `:root {\n  ${variables.join('\n  ')}\n}`;
}

// Función para generar tema oscuro
export function generateDarkTheme() {
  return `
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #ffffff;
    --text-secondary: #a8a8a8;
    --text-muted: #737373;
    
    --bg-primary: #000000;
    --bg-secondary: #121212;
    --bg-tertiary: #1a1a1a;
    
    --surface: #1a1a1a;
    --surface-secondary: #262626;
    --surface-hover: #333333;
    
    --border: #333333;
    --border-light: #262626;
  }
}`;
} 
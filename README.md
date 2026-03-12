# Embag Pack - Landing Page Profesional

Landing page moderna y profesional para una empresa de empaques a nivel nacional. Construida con Next.js, Tailwind CSS y Framer Motion.

## 🎯 Características

- ✅ **Modo Oscuro/Claro**: Switch de tema con persistencia en localStorage
- ✅ **Diseño Responsivo**: Mobile-first, optimizado para todos los dispositivos
- ✅ **Animaciones Suaves**: Transiciones elegantes con Framer Motion
- ✅ **Paleta Tailwind**: Colores profesionales y modernos
- ✅ **Componentes Reutilizables**: Header y Footer en todas las páginas
- ✅ **Arquitectura Modular**: Cada sección como página independiente

## 📁 Estructura del Proyecto

```
app/
├── components/
│   ├── Header.jsx           # Navegación principal + Dark mode toggle
│   └── Footer.jsx           # Pie de página reutilizable
├── context/
│   └── ThemeContext.jsx     # Contexto global para tema oscuro/claro
├── styles/
│   └── globals.css          # Estilos globales y componentes reutilizables
├── layout.jsx               # Layout raíz con ThemeProvider
├── page.jsx                 # Página de inicio (Hero + Stats + Features)
├── nosotros/
│   └── page.jsx             # Página About (Misión, Visión, Historia)
├── empaques/
│   └── page.jsx             # Catálogo de productos con filtros
└── contacto/
    └── page.jsx             # Formulario de contacto

tailwind.config.cjs          # Configuración Tailwind con dark mode
postcss.config.cjs           # PostCSS config
package.json
README.md
```

## 🚀 Características por Página

### 🏠 Inicio (`/`)
- Hero section con propuesta de valor
- Estadísticas destacadas (300+ clientes, 20,000+ productos)
- Sección de características
- CTA (Call to Action)

### 👥 Nosotros (`/nosotros`)
- Misión, Visión y Valores
- Timeline de historia de la empresa
- Presentación del equipo (placeholder)

### 📦 Empaques (`/empaques`)
- Catálogo de productos
- Filtros por categoría
- Grid responsive
- Detalles de productos (expandible)

### 📧 Contacto (`/contacto`)
- Formulario de contacto completo
- Información de ubicación
- Enlaces de redes sociales
- Placeholder para mapa

## ⚡ Tecnologías

- **Next.js 13+** - Framework React con App Router
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animaciones React
- **React Context API** - Gestión de estado del tema

## 🎨 Personalización

### Cambiar Colores Primarios

Edita `tailwind.config.cjs`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    600: '#0284c7',
    // ... más tonos
  }
}
```

### Agregar Fotos

1. Descarga tus imágenes
2. Coloca en `public/images/`
3. Importa en las páginas:

```jsx
import Image from 'next/image';

<Image 
  src="/images/tu-imagen.jpg" 
  alt="Descripción" 
  width={400} 
  height={300}
/>
```

### Integrar Formulario Real

En `app/contacto/page.jsx`, actualiza la función `handleSubmit`:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  // Envía a tu backend o servicio de email
  const response = await fetch('/api/contacto', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  // ...
};
```

## 📋 Setup

### Requisitos
- Node.js 16+
- npm o pnpm

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar servidor producción
npm start
```

La app estará disponible en `http://localhost:3000`

## ✨ Componentes Reutilizables

### Header
- Logo con link a home
- Navegación (Inicio, Nosotros, Empaques, Contacto)
- Toggle de tema (claro/oscuro)
- Menú móvil responsivo

### Footer
- Links de navegación
- Secciones: Empresa, Legal
- Redes sociales
- Copyright

### Clases CSS Globales

Disponibles en `globals.css`:
- `.container-custom` - Contenedor max-width
- `.btn-primary` - Botón primario
- `.btn-outline` - Botón outline
- `.card` - Tarjeta con hover effect
- `.section` - Padding de sección
- `.heading-section` - Título grande
- `.subheading` - Subtítulo

## 🌙 Dark Mode

Automático basado en:
1. Preferencia del sistema (prefers-color-scheme)
2. localStorage (si el usuario cambió el tema)

Para forzar dark mode en HTML:
```html
<html class="dark">
```

## 📱 Responsive Design

- Mobile first approach
- Breakpoints: sm, md, lg, xl
- Navegación adaptativa
- Grid layouts responsive

## 🔗 Próximos Pasos

- [ ] Integrar imágenes profesionales
- [ ] Conectar formulario a backend
- [ ] Agregar Google Analytics
- [ ] Implementar SEO adicional
- [ ] Integrar Google Maps
- [ ] Sistema de chat en vivo
- [ ] Blog/Noticias
- [ ] Sistema de login para clientes

## 📝 Notas

- Usa componentes funcionales con React Hooks
- 'use client' habilitado para interactividad
- Transiciones suaves en cambios de tema
- Animaciones entrada con Framer Motion
- Validación básica en formulario

---

**Construido con ❤️ para Embag Pack**


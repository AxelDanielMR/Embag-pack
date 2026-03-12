# Guía Técnica Embag Pack

Documentación detallada sobre la arquitectura y cómo extenderla.

## Arquitectura Global

### Context API - ThemeContext

Ubicación: `app/context/ThemeContext.jsx`

Proporciona:
- `isDark` - Boolean estado actual del tema
- `toggleTheme()` - Función para cambiar tema

Uso:
```jsx
import { useTheme } from './context/ThemeContext';

function Component() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? 'Modo Claro' : 'Modo Oscuro'}
    </button>
  );
}
```

## Componentes Base

### Header.jsx

**Características:**
- Navegación responsiva
- Mobile menu con Framer Motion
- Dark mode toggle
- Links activos

**Props:** Ninguno (usa context)

**Personalización:**
```jsx
const navItems = [
  { href: '/', label: 'Inicio' },
  // Agregar más rutas aquí
];
```

### Footer.jsx

**Características:**
- Links organizados en columnas
- Redes sociales
- Brand info
- Año dinámico

**Personalización:**
```jsx
const footerLinks = [
  {
    title: 'Nueva Sección',
    links: [
      { label: 'Link', href: '#' },
    ],
  },
];
```

## Paleta de Colores

Definida en `tailwind.config.cjs`:

### Colores Primarios (Azul)
- 50: #f0f9ff (muy claro)
- 100: #e0f2fe
- ...
- 600: #0284c7 (principal)
- 700: #0369a1 (hover)
- ...
- 900: #0c3d66 (muy oscuro)

### Colores Dark (Grises)
- 50: #f9fafb (casi blanco)
- 900: #111827 (casi negro)

**Usar colores:**
```jsx
<div className="text-primary-600 dark:text-primary-400">
  Texto con color apropiado para cada tema
</div>
```

## Clases Reutilizables

En `globals.css` bajo `@layer components`:

### Botones

```html
<!-- Botón Primario -->
<button class="btn-primary">Click me</button>

<!-- Botón Primario Dark -->
<button class="btn-primary-dark">Click me</button>

<!-- Botón Outline -->
<button class="btn-outline">Click me</button>
```

### Tarjetas

```html
<div class="card">
  Contenido con sombra hover y bordes
</div>
```

### Secciones

```html
<section class="section">
  py-16 sm:py-24 lg:py-32
</section>

<h1 class="heading-section">
  Título grande (4xl - 6xl)
</h1>

<p class="subheading">
  Subtítulo (lg - xl)
</p>
```

## Páginas Existentes

### page.jsx (Inicio)

**Secciones:**
1. Hero con gradiente
2. Stats grid (3 columnas)
3. Features grid (6 items en 3 columnas)
4. CTA final

**Animaciones:**
- Container stagger en hero
- Scroll triggers en features
- Hover scale en stats

### nosotros/page.jsx

**Secciones:**
1. Intro
2. MVV (Misión, Visión, Valores)
3. Timeline historia
4. Team grid

### empaques/page.jsx

**Secciones:**
1. Hero
2. Filter buttons (dinámicos)
3. Product grid (8 items)
4. CTA

**Lógica:**
```javascript
const [filter, setFilter] = useState('todos');

const filteredProducts = 
  filter === 'todos' 
    ? products 
    : products.filter(p => p.category === filter);
```

### contacto/page.jsx

**Secciones:**
1. Hero
2. Contact Info + Social (2 columnas)
3. Contact Form (con validación)
4. Success message temporal

**Estados:**
```javascript
const [formData, setFormData] = useState({...});
const [submitted, setSubmitted] = useState(false);
```

## Agregar Nueva Página

### Step 1: Crear archivo

`app/nueva-pagina/page.jsx`

```jsx
'use client';

import { useTheme } from '../context/ThemeContext';

export default function NuevaPagina() {
  const { isDark } = useTheme();
  
  return (
    <main className={`min-h-screen ${isDark ? 'bg-dark-900' : 'bg-white'}`}>
      {/* Contenido */}
    </main>
  );
}
```

### Step 2: Agregar link

En `Header.jsx` navItems:
```javascript
const navItems = [
  // ... existentes
  { href: '/nueva-pagina', label: 'Nueva Página' },
];
```

## Variables y Patrones

### Dark Mode Condicional

```jsx
className={`
  ${isDark ? 'bg-dark-800 text-gray-100' : 'bg-white text-gray-900'}
`}
```

### Framer Motion Patterns

**Fade y slide:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>
```

**Stagger Children:**
```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {/* Children animan uno tras otro */}
</motion.div>
```

**Hover Effects:**
```jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive element
</motion.div>
```

**Scroll Trigger:**
```jsx
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
  Anima cuando entra al viewport
</motion.div>
```

## Integración de Funcionalidades

### Google Maps

```jsx
// En contacto/page.jsx
<div className="w-full h-80">
  <iframe
    src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    loading="lazy"
  />
</div>
```

### Email Service

```javascript
// Crear API route: app/api/contacto/route.js
import nodemailer from 'nodemailer';

export async function POST(request) {
  const formData = await request.json();
  
  // Enviar email
  // ...
  
  return Response.json({ success: true });
}
```

### Analytics

```jsx
// En layout.jsx
import Script from 'next/script';

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=GA_ID`}
  strategy="afterInteractive"
/>
```

## Performance

### Image Optimization

```jsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  quality={75}
/>
```

### Code Splitting

Next.js automáticamente separa el código por ruta.

### CSS Classes

Tailwind genera solo las clases usadas en producción.

## Deployment

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Otros Hosts

```bash
npm run build
npm run start
```

## Testing

### Instalación
```bash
npm install --save-dev jest @testing-library/react
```

### Ejemplo Test
```javascript
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

test('Header renders navigation', () => {
  render(<Header />);
  expect(screen.getByText('Inicio')).toBeInTheDocument();
});
```

## Troubleshooting

### Tema no cambia en botón
- Verifica que `ThemeProvider` envuelve la app
- Comprueba localStorage está habilitado

### Animaciones lentas
- Reduce cantidad de elementos animados
- Usa `will-change` en CSS
- Optimiza imágenes

### Responsive no funciona
- Usa solo clases Tailwind
- Mobile first (sm: para desktop)
- Testea en DevTools

---

**Última actualización:** Marzo 2026

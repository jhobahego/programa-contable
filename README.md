# FinanzApp - Sistema de Gestión Contable

Aplicación web para la gestión y cálculo de deducciones de empleados (pensión y salud), desarrollada con Vue 3 y Vite.

Api para ser consumida por este [Frontend](https://github.com/jhobahego/programa-contable)

## ✨ Características

- 📋 Gestión completa de empleados
- 💰 Cálculo automático de deducciones (pensión y salud)
- 🔍 Búsqueda y filtrado de empleados
- 📱 Interfaz responsive con tema claro/oscuro
- 🚀 Notificaciones toast integradas

## 🛠️ Tecnologías

- **Vue 3** - Framework principal
- **Vue Router** - Navegación
- **Vite** - Build tool y dev server
- **Vue Toastification** - Sistema de notificaciones

## ⚡ Instalación

1. Instalar dependencias:
```bash
pnpm install
```

2. Configurar variables de entorno:
```bash
# Crear archivo .env
VITE_API_URL=http://localhost:3000
```

3. Ejecutar en desarrollo:
```bash
pnpm dev
```

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build para producción |
| `pnpm preview` | Vista previa del build |
| `pnpm lint` | Linter con ESLint |

## 🏗️ Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── views/         # Páginas principales
├── services/      # Servicios de API
├── composables/   # Lógica reutilizable
└── router/        # Configuración de rutas
```

## 🔧 Configuración Recomendada

**Editor:** [VSCode](https://code.visualstudio.com/) + [Vue Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

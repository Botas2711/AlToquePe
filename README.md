# ⚡ AlToquePe

AlToquePe es una app móvil de e-commerce para el mercado latinoamericano, construida con React Native y Expo. Permite explorar productos, gestionar el carrito, confirmar pedidos con GPS y ver el historial de compras. Integra Firebase, Redux Toolkit y Google Maps API.

---

## Tecnologías utilizadas

- **React Native** con **Expo**
- **Redux Toolkit** + **RTK Query** para manejo de estado y peticiones
- **Firebase Authentication** para autenticación de usuarios
- **Firebase Realtime Database** para almacenamiento de datos
- **React Navigation** (Stack + Bottom Tabs)
- **Expo Location** para geolocalización
- **React Native Maps** para visualización de mapas
- **Google Places API** para búsqueda de direcciones
- **Expo Image** para soporte de GIFs
- **React Native Toast Message** para notificaciones

---

## Funcionalidades

### Autenticación
- Registro de usuarios con validaciones
- Inicio de sesión con correo y contraseña
- Cierre de sesión

### Catálogo
- Listado de productos por categoría
- Slider de ofertas destacadas
- Búsqueda de productos por nombre o marca
- Detalle de producto con rating y descripción

###  Carrito
- Agregar, aumentar, disminuir y eliminar productos
- Cálculo automático del total
- Modal de confirmación de pedido

### Pedidos
- Confirmación de orden con resumen
- Animación de entrega con seguimiento por pasos
- Historial de pedidos
- Detalle de cada pedido

### Direcciones
- Geolocalización GPS
- Búsqueda de direcciones con Google Places API
- Mapa interactivo con marker arrastrable
- Gestión de múltiples direcciones (Casa, Trabajo, Otro)
- Selección de dirección activa desde el Header

### Perfil
- Foto de perfil con cámara
- Avatar con inicial y color único por usuario
- Información personal
- Gestión de direcciones
- Historial de pedidos

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Botas2711/AlToquePe.git

# Instalar dependencias
cd AlToquePe
npm install

# Iniciar el proyecto
npx expo start
```

---

## Sistema de diseño responsive

El proyecto usa un sistema de layout centralizado en `Global/layout.js` que adapta tamaños, márgenes y tipografía a cualquier tamaño de pantalla.

| Categoría | Ancho (dp) | Dispositivos |
|-----------|-----------|--------------|
| Pequeño | 320 - 375 | iPhone SE |
| Estándar | 376 - 414 | Galaxy A56, Redmi, iPhone 16 |
| Grande | 415 - 440 | Galaxy S24 Ultra, iPhone Plus |

---

## 👨‍💻 Autor

**Agustín Alejandro Aguilar Lindo**
Estudiante de Ingenieria de Sistemas de Información | UPC

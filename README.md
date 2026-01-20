# Angular 17 Standalone - Ejemplo

Este repositorio contiene una aplicacion de ejemplo de Angular 17 standalone. El proyecto demuestra varias caracteristicas como gestion de estado, integracion con API REST, configuraciones de entorno, guards de rutas, servicio de cookies, servicio de almacenamiento e integracion con Angular Material.

## Tabla de Contenidos
- Comenzando
- Estructura del Proyecto
- Caracteristicas
  - Gestion de Estado
  - Integracion con API REST
  - Configuraciones de Entorno
  - Guards de Rutas
  - Servicio de Cookies
  - Servicio de Almacenamiento
  - Integracion con Angular Material
  - Simulacion Bancaria (BancoDigital)
- Ejecutando el Proyecto
- Configuracion de Credenciales de Demo
- Contribuciones
- Licencia

## Comenzando
Para obtener una copia local del proyecto en funcionamiento, sigue estos pasos.

### Prerrequisitos
- Node.js (v14.x o posterior)
- Angular CLI (v17.x)

### Instalacion
1. Clona el repositorio:
```sh
git clone https://github.com/your-username/angular-17-standalone.git
```

2. Navega al directorio del proyecto:
```sh
cd angular-17-standalone
```

3. Instala las dependencias:
```sh
npm install
```

## Estructura del Proyecto
Aqui hay una breve descripcion de la estructura del proyecto:

```sh
src/
├── app/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── bank/          # Componente de simulacion bancaria
│   │   │   ├── dashboard/
│   │   │   └── user/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── others/
│   ├── guards/
│   ├── services/
│   ├── state/
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
├── environments/
│   ├── environment.ts
│   ├── environment.dev.ts
├── index.html
└── main.ts
```

## Caracteristicas

### Gestion de Estado
El proyecto utiliza una solucion simple de gestion de estado para manejar el estado de la aplicacion. El estado se gestiona usando servicios y observables. Puedes encontrar la logica de gestion de estado en el directorio src/app/state/.

### Integracion con API REST
La integracion con API REST se maneja usando el HttpClientModule de Angular. Los servicios para realizar solicitudes HTTP se encuentran en el directorio src/app/services/.

### Configuraciones de Entorno
Las configuraciones especificas del entorno se almacenan en el directorio src/environments/. Esto te permite gestionar diferentes configuraciones para compilaciones de desarrollo y produccion.

### Guards de Rutas
Los guards de rutas se utilizan para proteger ciertas rutas y asegurar que solo los usuarios autorizados puedan acceder a ellas. Puedes encontrar las implementaciones de guards en el directorio src/app/guards/.

### Servicio de Cookies
El proyecto incluye un servicio de cookies para gestionar cookies. Este servicio se puede encontrar en el archivo src/app/services/cookie.service.ts.

### Servicio de Almacenamiento
Se incluye un servicio de almacenamiento para abstraer las interacciones con el almacenamiento local y de sesion. Este servicio se encuentra en el archivo src/app/services/storage.service.ts.

### Integracion con Angular Material
El proyecto utiliza Angular Material para mejorar la interfaz de usuario con componentes de diseno moderno. Los modulos de Angular Material se importan y configuran en el archivo src/app/app.config.ts. Puedes personalizar el tema y los componentes de Angular Material segun sea necesario.

Para instalar Angular Material, usa los siguientes comandos:

```sh
ng add @angular/material
```

### Simulacion Bancaria (BancoDigital)
El proyecto incluye una pagina de simulacion bancaria completa con las siguientes caracteristicas:
- Tarjetas de resumen de balance de cuentas (Ahorros, Corriente, Inversiones)
- Historial de transacciones con tabla interactiva
- Acciones rapidas: Transferir dinero, Depositar, Pagar servicios, Solicitar tarjeta
- Modal de transferencia funcional con validacion de formulario
- Diseno responsive con Bootstrap 5 y Bootstrap Icons

## Ejecutando el Proyecto
Para ejecutar el proyecto localmente, usa el siguiente comando:

```sh
ng serve
```
Navega a http://localhost:4200/ en tu navegador para ver la aplicacion en funcionamiento.

## Configuracion de Credenciales de Demo
Para habilitar el inicio de sesion con credenciales de demo, agrega la siguiente configuracion en `src/environments/environment.dev.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://dummyjson.com',
  demoUsers: [
    {
      username: 'Eduardo',
      code: '1234',
      name: 'Eduardo Sanchez',
      email: 'eduardo@banco.com'
    }
  ]
};
```

Despues de configurar, ejecuta `npm start` y podras iniciar sesion con:
- Usuario: `Eduardo`
- Contrasena: `1234`

## Contribuciones
Las contribuciones no estan permitidas en este momento para ningun cambio.

## Licencia
Este proyecto esta licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para mas detalles.

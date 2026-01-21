# Reporte QA Final - AuthService

## Informacion General

- **Archivo bajo prueba:** `src/app/services/auth.service.ts`
- **Archivo de pruebas:** `src/app/services/auth.service.spec.ts`
- **Fecha de ejecucion:** 21 de Enero de 2026
- **Framework de pruebas:** Jasmine + Karma
- **Navegador:** Chrome Headless 144.0.0.0 (Linux x86_64)
- **Total de pruebas:** 14
- **Pruebas exitosas:** 14
- **Pruebas fallidas:** 0

## Resumen de Ejecucion

```
TOTAL: 14 SUCCESS
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 14 of 14 SUCCESS (0.054 secs / 0.039 secs)
```

## Tabla de Casos de Prueba

| ID de caso | Caso de prueba | Descripcion | Paso a paso | Resultado esperado | Resultado obtenido | Evidencia |
|------------|----------------|-------------|-------------|--------------------|--------------------|-----------|
| TC-001 | should be created | Verifica que el servicio AuthService se crea correctamente mediante inyeccion de dependencias | 1. Configurar TestBed con mocks de dependencias, 2. Inyectar AuthService, 3. Verificar que la instancia existe | El servicio debe ser una instancia valida (truthy) | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 1 of 14 SUCCESS` |
| TC-002 | should subscribe to store and update properties when store emits new values | Verifica que el constructor suscribe al store y actualiza las propiedades cuando el store emite nuevos valores | 1. Crear BehaviorSubject con estado inicial, 2. Emitir nuevo estado con isLoggedIn=true, token y data, 3. Verificar que las propiedades del servicio se actualizan | Las propiedades isLoggedIn, userToken y userData deben actualizarse con los valores del store | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 2 of 14 SUCCESS` |
| TC-003 | should dispatch addUser action with correct payload when valid data is provided | Verifica que setLoginData despacha la accion addUser con el payload correcto cuando se proporcionan datos validos | 1. Crear objeto loginData con token valido, 2. Llamar setLoginData(loginData), 3. Verificar que store.dispatch fue llamado con addUser y payload correcto | Se debe despachar addUser con payload conteniendo data, token e isLoggedIn=true | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 3 of 14 SUCCESS` |
| TC-004 | should set X-Auth-Token cookie with correct parameters when valid data is provided | Verifica que setLoginData establece la cookie X-Auth-Token con los parametros correctos | 1. Crear objeto loginData con token, 2. Llamar setLoginData(loginData), 3. Verificar que cookieService.set fue llamado con los parametros correctos (nombre, valor, expiracion, path, domain, secure, sameSite) | La cookie debe establecerse con nombre 'X-Auth-Token', valor del token, 30 dias, path '/', secure=true, sameSite='Lax' | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 4 of 14 SUCCESS` |
| TC-005 | should navigate to /admin and replace state when valid data is provided | Verifica que setLoginData navega a /admin y reemplaza el estado de la URL | 1. Crear objeto loginData con token, 2. Llamar setLoginData(loginData), 3. Verificar que router.navigateByUrl y location.replaceState fueron llamados con '/admin' | Debe navegar a '/admin' y reemplazar el estado de la URL a '/admin' | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 5 of 14 SUCCESS` |
| TC-006 | should not dispatch action, set cookie, or navigate when data is null | Verifica que setLoginData retorna temprano sin ejecutar acciones cuando data es null (escenario negativo) | 1. Llamar setLoginData(null), 2. Verificar que store.dispatch NO fue llamado, 3. Verificar que cookieService.set NO fue llamado, 4. Verificar que router.navigateByUrl NO fue llamado | No debe despachar acciones, establecer cookies ni navegar | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 6 of 14 SUCCESS` |
| TC-007 | should not dispatch action, set cookie, or navigate when data.token is undefined | Verifica que setLoginData retorna temprano sin ejecutar acciones cuando data.token no existe (escenario negativo) | 1. Crear objeto sin propiedad token, 2. Llamar setLoginData(dataWithoutToken), 3. Verificar que ninguna accion fue ejecutada | No debe despachar acciones, establecer cookies ni navegar cuando falta el token | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 7 of 14 SUCCESS` |
| TC-008 | should set isLoggedIn to false when logout is called | Verifica que logout establece isLoggedIn a false | 1. Establecer service.isLoggedIn = true, 2. Llamar service.logout(), 3. Verificar que isLoggedIn es false | La propiedad isLoggedIn debe ser false despues de logout | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 8 of 14 SUCCESS` |
| TC-009 | should set userToken to null when logout is called | Verifica que logout establece userToken a null | 1. Establecer service.userToken = 'some-token', 2. Llamar service.logout(), 3. Verificar que userToken es null | La propiedad userToken debe ser null despues de logout | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 9 of 14 SUCCESS` |
| TC-010 | should dispatch clearUser action when logout is called | Verifica que logout despacha la accion clearUser | 1. Llamar service.logout(), 2. Verificar que store.dispatch fue llamado con clearUser() | Se debe despachar la accion clearUser | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 10 of 14 SUCCESS` |
| TC-011 | should delete X-Auth-Token cookie when logout is called | Verifica que logout elimina la cookie X-Auth-Token | 1. Llamar service.logout(), 2. Verificar que cookieService.delete fue llamado con 'X-Auth-Token' | La cookie X-Auth-Token debe ser eliminada | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 11 of 14 SUCCESS` |
| TC-012 | should navigate to root and replace state when logout is called | Verifica que logout navega a la raiz y reemplaza el estado de la URL | 1. Llamar service.logout(), 2. Verificar que router.navigateByUrl fue llamado con '/', 3. Verificar que location.replaceState fue llamado con '/' | Debe navegar a '/' y reemplazar el estado de la URL a '/' | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 12 of 14 SUCCESS` |
| TC-013 | should navigate to /admin and replace state when user is logged in | Verifica que checkLogin navega a /admin cuando el usuario esta logueado | 1. Establecer service.isLoggedIn = true, 2. Llamar service.checkLogin(), 3. Verificar que router.navigateByUrl y location.replaceState fueron llamados con '/admin' | Debe navegar a '/admin' y reemplazar el estado cuando isLoggedIn es true | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 13 of 14 SUCCESS` |
| TC-014 | should not navigate when user is not logged in | Verifica que checkLogin no navega cuando el usuario no esta logueado (escenario negativo) | 1. Establecer service.isLoggedIn = false, 2. Llamar service.checkLogin(), 3. Verificar que router.navigateByUrl NO fue llamado | No debe navegar cuando isLoggedIn es false | Exitoso / Paso | `Chrome Headless 144.0.0.0 (Linux x86_64): Executed 14 of 14 SUCCESS` |

## Cobertura de Pruebas

### Metodos Probados

1. **Constructor**
   - Suscripcion al store y actualizacion de propiedades (TC-002)

2. **setLoginData(data: any)**
   - Escenario positivo: Despachar accion addUser (TC-003)
   - Escenario positivo: Establecer cookie (TC-004)
   - Escenario positivo: Navegar a /admin (TC-005)
   - Escenario negativo: Data null (TC-006)
   - Escenario negativo: Token faltante (TC-007)

3. **logout()**
   - Establecer isLoggedIn a false (TC-008)
   - Establecer userToken a null (TC-009)
   - Despachar accion clearUser (TC-010)
   - Eliminar cookie (TC-011)
   - Navegar a raiz (TC-012)

4. **checkLogin()**
   - Escenario positivo: Navegar cuando logueado (TC-013)
   - Escenario negativo: No navegar cuando no logueado (TC-014)

### Dependencias Mockeadas

- `CookieService` (ngx-cookie-service)
- `Store` (@ngrx/store)
- `Router` (@angular/router)
- `Location` (@angular/common)

## Conclusion

Todas las 14 pruebas unitarias del servicio AuthService pasaron exitosamente. El archivo de pruebas cubre tanto escenarios positivos como negativos para todos los metodos publicos del servicio, asegurando una cobertura robusta de la logica de autenticacion.

## Log Completo de Ejecucion

```
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 0 of 14 SUCCESS (0 secs / 0 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 1 of 14 SUCCESS (0 secs / 0.013 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 2 of 14 SUCCESS (0 secs / 0.016 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 3 of 14 SUCCESS (0 secs / 0.019 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 4 of 14 SUCCESS (0 secs / 0.021 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 5 of 14 SUCCESS (0 secs / 0.023 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 6 of 14 SUCCESS (0 secs / 0.025 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 7 of 14 SUCCESS (0 secs / 0.027 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 8 of 14 SUCCESS (0 secs / 0.029 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 9 of 14 SUCCESS (0 secs / 0.032 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 10 of 14 SUCCESS (0 secs / 0.034 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 11 of 14 SUCCESS (0 secs / 0.036 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 12 of 14 SUCCESS (0 secs / 0.037 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 13 of 14 SUCCESS (0 secs / 0.038 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 14 of 14 SUCCESS (0 secs / 0.039 secs)
Chrome Headless 144.0.0.0 (Linux x86_64): Executed 14 of 14 SUCCESS (0.054 secs / 0.039 secs)
TOTAL: 14 SUCCESS
```

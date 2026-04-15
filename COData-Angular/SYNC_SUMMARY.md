# Sincronización de Interfaces - Angular con APIs Backend

## Resumen de Cambios Realizados

### 📋 Archivos Modificados

#### 1. **login.component.ts**
- ✅ Renombrado: `export class addComponent` → `export class LoginComponent`
- ✅ Agregado: `standalone: true` para compatibilidad con Angular 21
- ✅ Mejorado: Formato de decorador con espaciado consistente

#### 2. **app.ts** 
- ✅ Convertido de NgModule a componente standalone
- ✅ Importado `RouterOutlet` y `LoginComponent`
- ✅ Eliminada configuración innecesaria de módulos

#### 3. **notificaciones.ts**
- ✅ **Creada interfaz vacía** - Ahora incluye:
  ```typescript
  export interface Notificaciones {
    notificacionId: number;
    usuarioId: number;
    titulo: string;
    mensaje: string;
    leida: boolean;
    fechaCreacion: Date;
    usuario?: Usuario;
  }
  ```

#### 4. **reportes.ts**
- ✅ Actualizado: `fechaCreacion` → `fecha_Creacion` (preservando underscore del backend)
- ✅ Actualizado: `fechaCierre` → `fecha_Cierre` (nullable)
- ✅ Hecho opcionales: relaciones (usuario?, categoria?, ubicacion?)

#### 5. **historial-reportes.ts**
- ✅ Actualizado: nombres con guiones bajos (historial_id, reporte_id, usuario_id)
- ✅ Mantenidos: campo_modificado, valor_anterior, valor_nuevo
- ✅ Hecho opcionales: relaciones

#### 6. **evidencias.ts**
- ✅ Actualizado: relación `reporte` como opcional

### 📊 Sincronización con Backend

#### Regla de Serialización JSON
**ASP.NET Core usa camelCase por defecto:**
- C# `PascalCase` → JSON `camelCase`
- C# `Fecha_Creacion` → JSON `fecha_Creacion` (underscore preservado)
- C# `Historial_id` → JSON `historial_id` (todo lowercase)

#### Mapeo Confirmado

| Interfaz | Estado | Notas |
|----------|--------|-------|
| Usuario | ✅ Correcto | Todos los campos mapeados correctamente |
| Categorias | ✅ Correcto | Todos los campos mapeados correctamente |
| Ubicaciones | ✅ Correcto | Solo propiedades simples |
| Reportes | ✅ Actualizado | Fechas con underscore, relaciones opcionales |
| Evidencias | ✅ Actualizado | Relación opcional |
| HistorialReportes | ✅ Actualizado | IDs con underscore, relaciones opcionales |
| Notificaciones | ✅ Creado | Interfaz completamente nueva |

---

### 🔌 API Endpoints Disponibles

```
Base URL: http://localhost:7099/api

GET    /Categorias           - Obtener todas las categorías
POST   /Categorias           - Crear categoría
GET    /Categorias/{id}      - Obtener una categoría
PUT    /Categorias/{id}      - Actualizar categoría
DELETE /Categorias/{id}      - Eliminar categoría

GET    /Evidencias           - Obtener todas las evidencias
POST   /Evidencias           - Crear evidencia (FormData)
GET    /Evidencias/{id}      - Obtener una evidencia
PUT    /Evidencias/{id}      - Actualizar evidencia
DELETE /Evidencias/{id}      - Eliminar evidencia

GET    /HistorialReportes    - Obtener historial
POST   /HistorialReportes    - Crear registro historial
GET    /HistorialReportes/{id} - Obtener un registro
PUT    /HistorialReportes/{id} - Actualizar registro
DELETE /HistorialReportes/{id} - Eliminar registro

GET    /Notificaciones       - Obtener todas las notificaciones
POST   /Notificaciones       - Crear notificación
GET    /Notificaciones/{id}  - Obtener una notificación
PUT    /Notificaciones/{id}  - Actualizar notificación
DELETE /Notificaciones/{id}  - Eliminar notificación

GET    /Reportes            - Obtener todos los reportes
POST   /Reportes            - Crear reporte
GET    /Reportes/{id}       - Obtener un reporte
PUT    /Reportes/{id}       - Actualizar reporte
DELETE /Reportes/{id}       - Eliminar reporte

GET    /Ubicaciones         - Obtener todas las ubicaciones
POST   /Ubicaciones         - Crear ubicación
GET    /Ubicaciones/{id}    - Obtener una ubicación
PUT    /Ubicaciones/{id}    - Actualizar ubicación
DELETE /Ubicaciones/{id}    - Eliminar ubicación
GET    /Ubicaciones/buscar-direccion?direccion={query} - Buscar por dirección

GET    /Usuario             - Obtener todos los usuarios
POST   /Usuario             - Crear usuario
GET    /Usuario/{id}        - Obtener un usuario
PUT    /Usuario/{id}        - Actualizar usuario
DELETE /Usuario/{id}        - Eliminar usuario
```

---

### ✨ Estado Actual

- ✅ **No hay errores de compilación**
- ✅ **Todas las interfaces sincronizadas con el backend**
- ✅ **ApiService completamente implementado y funcional**
- ✅ **Componentes standalone listos para Angular 21**
- ✅ **Documentación de mapeo creada (API_MAPPING.md)**

---

### 📚 Archivos de Documentación

1. **API_MAPPING.md** - Mapeo detallado de backend a Angular
2. **SYNC_SUMMARY.md** (este archivo) - Resumen de cambios

---

### 🚀 Próximos Pasos Recomendados

1. **Implementar autenticación** - Añadir login y JWT tokens
2. **Configurar rutas** - Definir las rutas de la aplicación en `app.routes.ts`
3. **Crear componentes** - Componentes CRUD para cada entidad
4. **Interceptores HTTP** - Para manejo automático de errores y tokens
5. **Guards de rutas** - Para proteger rutas autenticadas
6. **Manejo de errores** - Implementar gestión centralizada de errores

---

### ⚠️ Consideraciones Especiales

1. **Tipos Date**: JavaScript lee los strings ISO8601 como Date automáticamente. Si hay problemas, usar pipes como `date` en templates.

2. **Relaciones Opcionales**: Las relaciones (usuario, categoria, etc.) son opcionales porque no siempre se retornan pobladas del backend.

3. **Tipos Nullable**: `fecha_Cierre?: Date | null` maneja tanto valores null como undefined.

4. **FormData en Evidencias**: El endpoint de evidencias espera `FormData` para subir archivos.

5. **Búsqueda de Ubicaciones**: El endpoint `/Ubicaciones/buscar-direccion` usa OpenStreetMap (nominatim) en el backend.

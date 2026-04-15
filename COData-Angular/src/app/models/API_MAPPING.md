# API Mapping Documentation

## Backend to Angular Interface Mapping

This document maps the backend C# models to Angular TypeScript interfaces.
The backend uses **camelCase** serialization by default (ASP.NET Core default behavior).

### Serialization Rules
- C# PascalCase → JSON camelCase
- Underscores are preserved: `Fecha_Creacion` → `fecha_Creacion`
- DateTime objects are serialized as ISO 8601 strings

---

## Interface Mappings

### 1. Usuario
```
Backend Model (C#)          →  Angular Interface (TypeScript)
UsuarioId                   →  usuarioId: number
Nombre                      →  nombre: string
Email                       →  email: string
Contraseña                  →  contraseña: string
FechaRegistro              →  fechaRegistro: Date
```

### 2. Categorias
```
Backend Model (C#)          →  Angular Interface (TypeScript)
CategoriaId                 →  categoriaId: number
NombreCategoria            →  nombreCategoria: string
Descripcion                →  descripcion: string
```

### 3. Ubicaciones
```
Backend Model (C#)          →  Angular Interface (TypeScript)
UbicacionId                 →  ubicacionId: number
Direccion                   →  direccion: string
Ciudad                      →  ciudad: string
Latitud (decimal)          →  latitud: number
Longitud (decimal)         →  longitud: number
```

### 4. Reportes
```
Backend Model (C#)          →  Angular Interface (TypeScript)
ReporteId                   →  reporteId: number
UsuarioId                   →  usuarioId: number
CategoriaId                 →  categoriaId: number
UbicacionId                 →  ubicacionId: number
Titulo                      →  titulo: string
Descripcion                 →  descripcion: string
Estado                      →  estado: string
Prioridad                   →  prioridad: string
Fecha_Creacion             →  fecha_Creacion: Date  ⚠️ NOTE: underscore preserved!
Fecha_Cierre (nullable)    →  fecha_Cierre?: Date | null
Usuario (relation)         →  usuario?: Usuario (optional)
Categoria (relation)       →  categoria?: Categorias (optional)
Ubicacion (relation)       →  ubicacion?: Ubicaciones (optional)
```

### 5. Evidencias
```
Backend Model (C#)          →  Angular Interface (TypeScript)
EvidenciaId                 →  evidenciaId: number
ReporteId                   →  reporteId: number
TipoArchivo                 →  tipoArchivo: string
RutaArchivo                 →  rutaArchivo: string
FechaSubida                 →  fechaSubida: Date
Reporte (relation)         →  reporte?: Reportes (optional)
```

### 6. HistorialReportes
```
Backend Model (C#)          →  Angular Interface (TypeScript)
Historial_id               →  historial_id: number  ⚠️ NOTE: underscore preserved!
Reporte_id                 →  reporte_id: number   ⚠️ NOTE: underscore preserved!
Usuario_id                 →  usuario_id: number   ⚠️ NOTE: underscore preserved!
Campo_Modificado           →  campo_Modificado: string
Valor_Anterior             →  valor_Anterior: string
Valor_Nuevo                →  valor_Nuevo: string
Fecha                      →  fecha: Date
Reporte (relation)         →  reporte?: Reportes (optional)
Usuario (relation)         →  usuario?: Usuario (optional)
```

### 7. Notificaciones
```
Backend Model (C#)          →  Angular Interface (TypeScript)
NotificacionId              →  notificacionId: number
UsuarioId                   →  usuarioId: number
titulo ⚠️                   →  titulo: string  (NOTE: lowercase in backend!)
Mensaje                     →  mensaje: string
Leida                       →  leida: boolean
FechaCreacion              →  fechaCreacion: Date
Usuario (relation)         →  usuario?: Usuario (optional)
```

---

## Important Notes

1. **Optional Relations**: Relations (Usuario, Categorias, etc.) are marked as optional (`?`) because they may not always be populated when the API returns data.

2. **Nullable Dates**: Fields like `Fecha_Cierre` use `Date | null` to handle both null values and actual dates.

3. **Underscore Preservation**: Properties with underscores like `Fecha_Creacion` are converted to `fecha_Creacion` (first letter lowercased, underscore maintained).

4. **API Base URL**: `http://localhost:7099/api/`

5. **Endpoints**:
   - `/api/Usuario`
   - `/api/Categorias`
   - `/api/Ubicaciones`
   - `/api/Reportes`
   - `/api/Evidencias`
   - `/api/HistorialReportes`
   - `/api/Notificaciones`

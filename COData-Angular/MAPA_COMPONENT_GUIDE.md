# Componente Mapa - Documentación

## Descripción

El componente **MapaComponent** es una integración completa de visualización de reportes municipales en un mapa interactivo usando **Leaflet.js**. Permite:

✅ Ver todos los reportes en un mapa interactivo
✅ Filtrar reportes por estado (crítico, pendiente, en proceso, completado)
✅ Expandir/colapsar tarjetas de reportes
✅ Navegar a ubicaciones específicas en el mapa
✅ Ver información detallada de cada reporte
✅ Actualizar y eliminar reportes

---

## Instalación de Dependencias

### 1. Instalar Leaflet

```bash
npm install leaflet
npm install @types/leaflet --save-dev
```

### 2. Importar Estilos en `styles.css`

Agregar al archivo `src/styles.css`:

```css
@import 'leaflet/dist/leaflet.css';
```

O en `angular.json` en la sección de `styles`:

```json
"styles": [
  "src/styles.css",
  "node_modules/leaflet/dist/leaflet.css"
]
```

### 3. (Opcional) Instalar Leaflet Cluster para agrupar marcadores

```bash
npm install leaflet.markercluster
npm install @types/leaflet.markercluster --save-dev
```

---

## Configuración en Angular

### 1. Importar en `app.config.ts`

El componente es **standalone**, no necesita configuración adicional en el config.

### 2. Agregar ruta en `app.routes.ts`

```typescript
import { MapaComponent } from './components/mapa/mapa.component';

export const routes: Routes = [
  {
    path: 'mapa',
    component: MapaComponent,
  },
  // ... otras rutas
];
```

### 3. Usar en template

```html
<app-mapa></app-mapa>
```

---

## API Integration

### Endpoints Requeridos

El componente espera estos endpoints del backend:

#### GET - Obtener todos los reportes
```
GET /api/Reportes
Response: Reporte[]
```

#### DELETE - Eliminar un reporte
```
DELETE /api/Reportes/{id}
```

### Datos esperados

El componente carga reportes con ubicaciones. Espera la estructura:

```typescript
interface Reporte {
  reporteId: number;
  titulo: string;
  descripcion: string;
  estado: 'critical' | 'pending' | 'in-process' | 'completed';
  prioridad: string;
  fecha_Creacion: Date;
  ubicacion?: {
    latitud: number;
    longitud: number;
    direccion: string;
    ciudad: string;
  };
  usuario?: {
    nombre: string;
  };
  categoria?: {
    nombreCategoria: string;
  };
}
```

---

## Características

### 🗺️ Mapa Interactivo
- Usa **OpenStreetMap** como proveedor de tiles
- Zoom y pan personalizables
- Marcadores coloreados por estado
- Popups con información de reportes

### 🎨 Estados de Reportes
| Estado | Color | Icono |
|--------|-------|-------|
| Crítico | 🔴 Rojo (#dc2626) | ⚠️ |
| Pendiente | 🟡 Amarillo (#eab308) | ⏳ |
| En Proceso | 🔵 Azul (#3b82f6) | ⚙️ |
| Completado | 🟢 Verde (#16a34a) | ✓ |

### 📱 Responsivo
- **Desktop**: Mapa en derecha, lista en izquierda (50/50)
- **Tablet**: Layout apilado
- **Mobile**: Solo lista de reportes (mapa oculto)

### 🔍 Filtrado
- Filtrar por estado
- Estadísticas en tiempo real
- Búsqueda por nombre (preparado)

---

## Estructura del Código

### `mapa.component.ts`
```typescript
export class MapaComponent implements OnInit {
  // Propiedades principales
  reportes: ReporteConUbicacion[] = [];
  filteredReportes: ReporteConUbicacion[] = [];
  map: L.Map | null = null;
  
  // Métodos principales
  loadReportes()           // Carga reportes desde API
  applyFilters()           // Filtra por estado
  initializeMap()          // Inicializa mapa Leaflet
  updateMapMarkers()       // Actualiza marcadores
  viewMapLocation()        // Navega a ubicación en mapa
  deleteReporte()          // Elimina un reporte
}
```

### `mapa.component.html`
- Sidebar con filtros y lista de reportes
- Mapa principal con marcadores
- Leyenda de estados
- Tarjetas expandibles

### `mapa.component.scss`
- Estilos profesionales
- Animations suaves
- Diseño responsivo completo

---

## Uso

### Cargar Reportes
```typescript
// Se ejecuta automáticamente en ngOnInit
this.loadReportes();
```

### Filtrar por Estado
```typescript
// El componente maneja esto automáticamente
selectedStatus = 'critical'; // 'all', 'pending', 'in-process', 'completed'
```

### Ver Ubicación en Mapa
```typescript
// Al hacer click en "Ver en Mapa" en una tarjeta
viewMapLocation(reporte);
// El mapa se centra y abre un popup
```

### Eliminar Reporte
```typescript
deleteReporte(reporteId);
// Solicita confirmación y elimina vía API
```

---

## Estados y Manejo de Errores

### Loading
- Muestra spinner mientras carga datos
- Desactiva interacciones durante carga

### Errores
- Si la API falla, muestra datos mock para demostración
- Botón para reintentar carga
- Logs en consola para debug

### Empty State
- Muestra mensaje cuando no hay reportes
- Útil cuando filtros no coinciden

---

## Personalización

### Cambiar Proveedor de Tiles

En `createLeafletMap()`:

```typescript
// Cambiar de OpenStreetMap a Mapbox:
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}', {
  maxZoom: 19,
  id: 'mapbox/streets-v11',
  accessToken: 'YOUR_MAPBOX_TOKEN'
})
```

### Cambiar Colores
Editar en `statusConfig`:

```typescript
statusConfig = {
  critical: { label: 'Crítica', color: '#dc2626', icon: 'fa-exclamation-circle' },
  // ...
}
```

### Agregar Más Filtros
```typescript
// En applyFilters()
// Agregar más lógica de filtrado
```

---

## Troubleshooting

### 1. Mapa no carga
**Solución**: Verificar que `#mapContainer` exista en el DOM antes de inicializar

### 2. Marcadores no aparecen
**Solución**: Verificar que `ubicacionData` existe en los reportes y tiene `latitud`/`longitud`

### 3. Leaflet no encontrado
**Solución**: 
```bash
npm install leaflet
npm install @types/leaflet --save-dev
```

### 4. Error de estilos CSS
**Solución**: Agregar a `angular.json`:
```json
"styles": [
  "node_modules/leaflet/dist/leaflet.css"
]
```

---

## Próximas Mejoras

- [ ] Búsqueda de reportes por nombre/dirección
- [ ] Clustering de marcadores en zoom lejano
- [ ] Exportar reportes a PDF
- [ ] Modo oscuro/claro
- [ ] Capas de mapa seleccionables
- [ ] Animación de marcadores al filtrar
- [ ] Recálculo de límites automático al filtrar

---

## Licencias

- **Leaflet**: BSD 2-Clause
- **OpenStreetMap**: ODbL 1.0

---

## Documentación Oficial

- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [OpenStreetMap](https://www.openstreetmap.org/)


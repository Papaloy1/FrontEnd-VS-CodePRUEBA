# Reportes Component Guide - Complete Documentation

## 📋 Overview

The **Reportes Component** is a comprehensive report management interface built with Angular 21 standalone components and reactive forms. It provides advanced filtering, sorting, pagination, and multi-view display options for managing reports across the platform.

---

## ✨ Features

### 1. **Multi-View Display**
- **Grid View**: Card-based layout with expandable details (default)
- **List View**: Horizontal list layout with quick actions and selection
- **Table View**: Tabular format with sortable columns for data-heavy scenarios

### 2. **Advanced Filtering**
- **Search**: Full-text search across title, description, and user names (debounced)
- **Category Filter**: Filter reports by category from dropdown
- **Status Filter**: Filter by 5 different statuses (Abierto, Pendiente, En-Proceso, Resuelto, Cerrado)
- **Priority Filter**: Filter by 4 priority levels (Baja, Media, Alta, Crítica)

### 3. **Smart Sorting**
- Sort by: Creation Date, Title, Priority, Status
- Toggle sort direction (Ascending/Descending)
- Persistent sort preferences during session

### 4. **Pagination**
- Configurable page size (9, 15, 30, 50 items per page)
- Page navigation with smart pagination buttons
- Direct page jump input
- Real-time pagination info display

### 5. **Dynamic Styling**
- Status-based color coding (badges with icons)
- Priority-based color indicators
- Responsive design (desktop, tablet, mobile)
- Smooth animations and transitions
- Dark mode ready (with SCSS variables)

### 6. **Report Management Actions**
- **View**: Open detailed view of a report
- **Edit**: Edit report information
- **Delete**: Remove report with confirmation

### 7. **Rich Report Display**
- Expandable card headers (grid view)
- Report duration display (time ago)
- User and category information
- Location/address reference
- Creation and closure dates
- Detailed descriptions

---

## 📁 File Structure

```
src/app/components/reportes/
├── reportes.component.ts       # Component logic (531 lines)
├── reportes.component.html     # Template (297 lines)
├── reportes.component.scss     # Styling (850+ lines)
└── REPORTES_COMPONENT_GUIDE.md # Documentation
```

---

## 🏗️ Component Architecture

### TypeScript Component (`reportes.component.ts`)

#### **Interfaces**
```typescript
// Extended reporte with relational data
interface ReporteWithRelations extends Reportes {
  usuarioNombre?: string;
  categoriaNombre?: string;
  ubicacionDireccion?: string;
}

// Pagination state management
interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
```

#### **Key Properties**

```typescript
// Data
reportes: ReporteWithRelations[] = [];              // All reports
filteredReportes: ReporteWithRelations[] = [];      // After filters
displayedReportes: ReporteWithRelations[] = [];     // Current page

// UI State
isLoading = true;
error: string | null = null;
selectedReporte: ReporteWithRelations | null = null;
expandedCards: Set<number> = new Set();
viewMode: 'grid' | 'list' | 'table' = 'grid';

// Filtering
filterForm!: FormGroup;
selectedCategory: number | null = null;
selectedStatus: string = 'all';
selectedPriority: string = 'all';
currentSearchTerm = '';

// Sorting
sortField: SortField = 'fecha_Creacion';
sortDirection: SortDirection = 'desc';

// Pagination
pagination: PaginationState = {
  currentPage: 1,
  pageSize: 9,
  totalItems: 0,
  totalPages: 0,
};
```

#### **Status Configuration**

```typescript
statusConfig = {
  abierto: { label: 'Abierto', color: '#3b82f6', icon: 'fa-folder-open', badge: 'info' },
  pendiente: { label: 'Pendiente', color: '#eab308', icon: 'fa-hourglass-half', badge: 'warning' },
  'en-proceso': { label: 'En Proceso', color: '#8b5cf6', icon: 'fa-spinner', badge: 'primary' },
  resuelto: { label: 'Resuelto', color: '#16a34a', icon: 'fa-check-circle', badge: 'success' },
  cerrado: { label: 'Cerrado', color: '#6b7280', icon: 'fa-lock', badge: 'secondary' },
};
```

#### **Priority Configuration**

```typescript
priorityConfig = {
  baja: { label: 'Baja', color: '#10b981', severity: 'low' },
  media: { label: 'Media', color: '#f59e0b', severity: 'medium' },
  alta: { label: 'Alta', color: '#ef4444', severity: 'high' },
  crítica: { label: 'Crítica', color: '#7c2d12', severity: 'critical' },
};
```

### **Key Methods**

#### **Lifecycle**
```typescript
ngOnInit()                  // Initialize component and load data
ngOnDestroy()              // Cleanup subscriptions
```

#### **Data Loading**
```typescript
loadReportes()             // Fetch reports from API
loadCategorias()           // Fetch categories for filters
loadUbicaciones()          // Fetch locations for reference
loadMockData()             // Demo data fallback
```

#### **Filtering & Sorting**
```typescript
applyFilters()             // Apply all active filters and sorting
onSearchChange(value)      // Handle search input with debounce
onCategoryChange(event)    // Filter by category
onStatusChange(event)      // Filter by status
onPriorityChange(event)    // Filter by priority
onSortChange(event)        // Change sort field
toggleSortDirection()      // Toggle sort direction
clearFilters()             // Reset all filters to defaults
```

#### **Pagination**
```typescript
updateDisplayedReportes()  // Update displayed items based on page
goToPage(page)             // Navigate to specific page
nextPage()                 // Go to next page
previousPage()             // Go to previous page
changePageSize(size)       // Change items per page
```

#### **UI Actions**
```typescript
toggleCardExpand(reporteId) // Expand/collapse card (grid view)
selectReporte(reporte)      // Select report for view
changeViewMode(mode)        // Switch between grid/list/table
viewReporteDetails(id)      // Navigate to detail view
editReporte(id)             // Navigate to edit form
deleteReporte(id)           // Delete with confirmation dialog
```

#### **Display Helpers**
```typescript
getStatusBadgeClass(estado)     // Get badge CSS class for status
getPriorityColor(prioridad)     // Get color for priority level
getDurationSinceCreation(fecha) // Format time ago (e.g., "Hace 2d")
```

---

## 📱 Template Structure

### **Header Section**
- Title: "Gestión de Reportes"
- Subtitle
- Statistics cards showing:
  - Filtered report count
  - Total report count

### **Filters Section**

#### Search Bar
- Full-text search input with debounce (300ms)
- Search across: title, description, user names
- Icon indicator

#### Filter Controls
- **Category Dropdown**: Dynamic options from API
- **Status Dropdown**: 5 predefined statuses
- **Priority Dropdown**: 4 priority levels
- **Clear Filters Button**: Red button to reset all filters

#### Controls Row
- **View Controls**: Toggle grid/list/table view
- **Sort Controls**: Select sort field + direction toggle
- **Page Size Control**: Choose items per page

### **Content Area**

#### Loading State
- Spinner animation
- "Cargando reportes..." message

#### Error State
- Error icon
- Error message
- Retry button

#### Empty State
- Empty inbox icon
- "No hay reportes" message
- Suggestion to adjust filters

#### Grid View (Card Layout)
- **Card Header**: 
  - Title (expandable)
  - Status and Priority badges
  - Time ago display
  - Expand/collapse toggle
  
- **Card Body** (Expandable):
  - Full description
  - Detail rows:
    - Reported by
    - Category
    - Location
    - Creation date
    - Closure date
  
- **Card Footer**:
  - View button (blue)
  - Edit button (yellow)
  - Delete button (red)

#### List View (Horizontal Layout)
- Report title with badges
- Description preview (2 lines)
- Meta information (user, location, time)
- Quick action buttons (view, edit, delete)
- Click to select functionality

#### Table View
- Scrollable table with columns:
  - Title
  - Description (50 chars preview)
  - Status
  - Priority
  - Reported by
  - Location
  - Date
  - Actions (view, edit, delete)
- Hover highlighting
- Dark header with gradient

### **Pagination Section**
- Shows: "Mostrando 9 de 47 reportes"
- Pagination buttons:
  - Previous/Next arrows
  - Page number buttons (max 5 visible)
  - Active page highlighting
- Direct page jump input

---

## 🎨 Styling System

### **Color Palette** (SCSS Variables)

```scss
$primary-color: #3b82f6;        // Blue
$secondary-color: #6b7280;      // Gray
$success-color: #10b981;        // Green
$warning-color: #eab308;        // Yellow
$danger-color: #ef4444;         // Red
$info-color: #0ea5e9;           // Cyan
$dark-color: #1f2937;           // Dark Gray
$light-color: #f3f4f6;          // Light Gray
```

### **Shadow System**

```scss
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

### **Responsive Breakpoints**

```scss
@media (max-width: 1024px)  // Tablets
@media (max-width: 768px)   // iPad/Large phones
@media (max-width: 480px)   // Mobile phones
```

---

## 📊 Data Flow

```
API Service
    ↓
loadReportes() Subscription
    ↓
reportes[] Array
    ↓
applyFilters()
    ├─ Search filter
    ├─ Category filter
    ├─ Status filter
    ├─ Priority filter
    └─ Sorting
    ↓
filteredReportes[] Array
    ↓
updateDisplayedReportes()
    ↓
displayedReportes[] Array (Current Page)
    ↓
Template Rendering (*ngFor)
```

---

## 🔌 API Integration

### **Dependencies**
- `ApiService` from `../../services/api.service`
- `HttpClient` module (must be provided in app config)
- `CommonModule` for *ngIf, *ngFor, etc.
- `ReactiveFormsModule` for FormBuilder

### **API Endpoints Used**

```typescript
// Get all reports with relations populated
GET /api/Reportes → Observable<Reportes[]>

// Get all categories for filter dropdown
GET /api/Categorias → Observable<Categorias[]>

// Get all locations
GET /api/Ubicaciones → Observable<Ubicaciones[]>

// Delete a report
DELETE /api/Reportes/{id} → Observable<void>
```

### **Data Models**

#### Reportes Interface
```typescript
interface Reportes {
  reporteId: number;
  usuarioId: number;
  categoriaId: number;
  ubicacionId: number;
  titulo: string;
  descripcion: string;
  estado: string;              // 'abierto', 'pendiente', 'en-proceso', 'resuelto', 'cerrado'
  prioridad: string;           // 'baja', 'media', 'alta', 'crítica'
  fecha_Creacion: Date;
  fecha_Cierre?: Date | null;
  usuario?: Usuario;           // Relation
  categoria?: Categorias;      // Relation
  ubicacion?: Ubicaciones;     // Relation
}
```

---

## 🚀 Integration Steps

### **1. Import Component in Routes**

```typescript
// app.routes.ts
import { ReportesComponent } from './components/reportes/reportes.component';

export const routes: Routes = [
  // ... other routes
  {
    path: 'reportes',
    component: ReportesComponent,
  },
  // ... rest of routes
];
```

### **2. Add Menu Link** (Optional)

```html
<!-- menu-principal.component.html -->
<a routerLink="/reportes" [routerLinkActive]="'active'">
  <i class="fas fa-file-alt"></i>
  Reportes
</a>
```

### **3. Guard Authentication** (Recommended)

```typescript
// Create an auth guard
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('usuarioActual');
  
  if (user) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};

// Apply to route
{
  path: 'reportes',
  component: ReportesComponent,
  canActivate: [authGuard],
}
```

---

## 🔧 Customization Guide

### **Change Default Page Size**

```typescript
// In reportes.component.ts
pagination: PaginationState = {
  currentPage: 1,
  pageSize: 15,  // Change from 9 to 15
  totalItems: 0,
  totalPages: 0,
};
```

### **Modify Status Options**

```typescript
statusConfig = {
  custom: { label: 'Custom', color: '#some-color', icon: 'fa-icon-name', badge: 'badge-class' },
  // ... more statuses
};

statusOptions = [
  { value: 'custom', label: 'Custom Status' },
  // ... more options
];
```

### **Add More Sort Options**

```typescript
sortOptions = [
  { value: 'fecha_Creacion', label: 'Fecha (más reciente)' },
  { value: 'titulo', label: 'Título (A-Z)' },
  { value: 'estado', label: 'Estado' },
  { value: 'usuarioNombre', label: 'Usuario Reportador' }, // NEW
];
```

### **Change Primary Color Theme**

```scss
// In reportes.component.scss
$primary-color: #your-color;
```

### **Disable Auto-Delete Confirmation**

```typescript
deleteReporte(reporteId: number): void {
  // Remove the confirmation check
  this.apiService.eliminarReporte(reporteId).subscribe({
    next: () => this.loadReportes(),
    error: (error) => console.error('Error:', error),
  });
}
```

---

## ⚠️ Common Issues & Solutions

### **Issue: Reports Not Loading (API 404)**
**Solution**: Check that the backend API is running
```bash
# Verify API is accessible
curl http://localhost:7099/api/Reportes
```

### **Issue: Empty Report List But API Returns Data**
**Solution**: Check that API response includes relational data (usuario, categoria, ubicacion)

### **Issue: Search Not Working**
**Solution**: Entire component uses debounced search with 300ms delay. Wait a moment after typing.

### **Issue: Pagination Not Working**
**Solution**: Ensure `pagination.totalPages` is calculated correctly after filtering:
```typescript
this.pagination.totalPages = Math.ceil(
  this.filteredReportes.length / this.pagination.pageSize
);
```

### **Issue: View Mode Toggle Not Working**
**Solution**: Reset expanded cards when changing view:
```typescript
changeViewMode(mode: 'grid' | 'list' | 'table'): void {
  this.viewMode = mode;
  this.expandedCards.clear();  // Important!
}
```

---

## 📈 Performance Optimization

### **Search Debouncing**
- Debounce time: 300ms
- Prevents excessive filtering on each keystroke
- Uses RxJS `debounceTime` operator

### **OnDestroy Cleanup**
- All subscriptions use `takeUntil(destroy$)`
- Prevents memory leaks
- Properly unsubscribes on component destruction

### **Lazy Loading Considerations**
- Reports loaded immediately on init
- Consider implementing virtual scrolling for 1000+ items
- Use pagination to reduce DOM elements

### **Change Detection**
- Uses default OnPush detection (standalone component)
- DOM updates only when necessary
- Efficient animation performance

---

## 🧪 Testing Recommendations

### **Unit Test Examples**

```typescript
// Test filter application
it('should filter reports by status', () => {
  component.selectedStatus = 'pendiente';
  component.applyFilters();
  
  expect(component.filteredReportes.every(r => r.estado === 'pendiente')).toBe(true);
});

// Test pagination
it('should update displayed reportes on page change', () => {
  component.goToPage(2);
  
  expect(component.pagination.currentPage).toBe(2);
  expect(component.displayedReportes.length).toBeLessThanOrEqual(component.pagination.pageSize);
});

// Test sort functionality
it('should sort reports by title', () => {
  component.sortField = 'titulo';
  component.sortDirection = 'asc';
  component.applyFilters();
  
  const titles = component.filteredReportes.map(r => r.titulo);
  expect(titles).toEqual([...titles].sort());
});
```

---

## 🎯 Enhancement Ideas

### Future Improvements
1. **Bulk Actions**: Select multiple reports for batch delete/status change
2. **Report Export**: Export filtered reports to Excel/CSV
3. **Advanced Filters**: Date range, custom field filters
4. **Real-time Updates**: WebSocket integration for live report updates
5. **Report Details Modal**: Modal instead of navigation for quick view
6. **Drag & Drop**: Reorder priority or change status via drag
7. **Custom Columns**: Allow users to show/hide columns in table view
8. **Favorites**: Mark reports as favorite
9. **Report History**: View changelog of report modifications
10. **Comments/Notes**: Add discussion threads to reports

---

## 📞 Support & Troubleshooting

### **Common Commands**

```bash
# Check for TypeScript errors
ng build

# Run tests
ng test

# Lint code
ng lint

# Format code
npm run format
```

### **Debug Tips**

```typescript
// Add console logging
console.log('Filtered reportes:', this.filteredReportes);
console.log('Current pagination:', this.pagination);
console.log('Active filters:', {
  search: this.currentSearchTerm,
  category: this.selectedCategory,
  status: this.selectedStatus,
  priority: this.selectedPriority,
});
```

---

## 📚 Related Files

- `src/app/models/reportes.ts` - Data interface
- `src/app/services/api.service.ts` - API calls
- `src/app/models/usuario.ts` - User interface
- `src/app/models/categorias.ts` - Category interface
- `src/app/models/ubicaciones.ts` - Location interface

---

**Component Version**: 1.0.0  
**Angular Version**: 21.x  
**Last Updated**: 2026-03-22  
**Status**: ✅ Production Ready

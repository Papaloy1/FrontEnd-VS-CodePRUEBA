# REPORTES COMPONENT - VISUAL OVERVIEW & ARCHITECTURE

## 🏗️ Component Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   REPORTES COMPONENT                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ COMPONENT INPUTS & DEPENDENCIES                      │  │
│  │ - ApiService (DI)                                    │  │
│  │ - FormBuilder (DI)                                   │  │
│  │ - HttpClient (DI via ApiService)                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                         ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ LIFECYCLE HOOKS                                      │  │
│  │ ├─ ngOnInit()                                        │  │
│  │ │  ├─ Initialize form                               │  │
│  │ │  ├─ Load reports                                  │  │
│  │ │  ├─ Load categories                               │  │
│  │ │  ├─ Load locations                                │  │
│  │ │  └─ Setup search subscription                     │  │
│  │ └─ ngOnDestroy()                                     │  │
│  │    └─ Cleanup subscriptions                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                         ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ DATA FLOW                                            │  │
│  │                                                      │  │
│  │ reportes[] (Raw API data)                            │  │
│  │     ↓                                                │  │
│  │ applyFilters()                                       │  │
│  │ ├─ Search filter                                    │  │
│  │ ├─ Category filter                                  │  │
│  │ ├─ Status filter                                    │  │
│  │ ├─ Priority filter                                  │  │
│  │ └─ Sorting                                          │  │
│  │     ↓                                                │  │
│  │ filteredReportes[] (After filters + sort)           │  │
│  │     ↓                                                │  │
│  │ updateDisplayedReportes()                            │  │
│  │     ↓                                                │  │
│  │ displayedReportes[] (Current page only)             │  │
│  │     ↓                                                │  │
│  │ Template Rendering                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                         ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ STATE MANAGEMENT                                     │  │
│  │ - Filtering state (search, category, status, etc)   │  │
│  │ - Sorting state (field, direction)                  │  │
│  │ - Pagination state (page, size, total)              │  │
│  │ - UI state (viewMode, selectedReporte, etc)         │  │
│  │ - Loading/Error states                              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Template Structure Map

```
reportes-container
├─ reportes-header
│  ├─ header-content (Title + Subtitle)
│  └─ header-stats
│     ├─ stat (Filtered count)
│     └─ stat (Total count)
│
├─ filters-section
│  ├─ filters-container
│  │  ├─ search-bar
│  │  └─ filter-controls
│  │     ├─ filter-group (Category)
│  │     ├─ filter-group (Status)
│  │     ├─ filter-group (Priority)
│  │     └─ btn-clear-filters
│  │
│  └─ controls-row
│     ├─ view-controls
│     │  ├─ view-btn (Grid)
│     │  ├─ view-btn (List)
│     │  └─ view-btn (Table)
│     │
│     ├─ sort-controls
│     │  ├─ sort-select
│     │  └─ btn-sort-direction
│     │
│     └─ page-size-control
│        └─ page-size-select
│
├─ loading-container (if isLoading)
├─ error-container (if error)
├─ empty-container (if no results)
│
├─ reportes-grid (if viewMode === 'grid')
│  └─ reporte-card (for each report)
│     ├─ card-header (clickable, expands)
│     │  ├─ header-left
│     │  │  ├─ card-title
│     │  │  └─ card-meta (badges)
│     │  └─ header-right
│     │     ├─ time-ago
│     │     └─ toggle-icon
│     │
│     ├─ card-body (expandable)
│     │  ├─ card-description
│     │  └─ card-details
│     │     └─ detail-row (for each field)
│     │
│     └─ card-footer
│        ├─ btn-action (View)
│        ├─ btn-action (Edit)
│        └─ btn-action (Delete)
│
├─ reportes-list (if viewMode === 'list')
│  └─ reporte-list-item (for each report)
│     ├─ list-item-left
│     │  ├─ list-item-header
│     │  ├─ list-item-description
│     │  └─ list-item-meta
│     │
│     └─ list-item-actions
│        ├─ btn-icon (View)
│        ├─ btn-icon (Edit)
│        └─ btn-icon (Delete)
│
├─ reportes-table-container (if viewMode === 'table')
│  └─ reportes-table
│     ├─ thead
│     │  └─ tr
│     │     ├─ th (Title)
│     │     ├─ th (Description)
│     │     ├─ th (Status)
│     │     ├─ th (Priority)
│     │     ├─ th (Reported by)
│     │     ├─ th (Location)
│     │     ├─ th (Date)
│     │     └─ th (Actions)
│     │
│     └─ tbody
│        └─ tr (for each report)
│           └─ td (data cells)
│
└─ pagination-section
   ├─ pagination-info
   ├─ pagination-controls
   │  ├─ btn-pagination (Previous)
   │  ├─ btn-page (for each visible page)
   │  └─ btn-pagination (Next)
   │
   └─ pagination-goto (direct page input)
```

---

## 🔄 Filtering & Sorting Flow

```
┌─────────────────────┐
│  User Action        │
└─────────────────────┘
           ↓
   ┌──────────────────────────────────────┐
   │  Search Input (with 300ms debounce)  │
   │  Category Select                     │
   │  Status Select                       │
   │  Priority Select                     │
   │  Sort Field Select                   │
   │  Sort Direction Toggle               │
   │  Clear Filters Button                │
   └──────────────────────────────────────┘
           ↓
   ┌──────────────────────────────────────┐
   │  applyFilters()                      │
   │                                      │
   │  1. Copy base reportes[]             │
   │  2. Apply search filter              │
   │  3. Apply category filter            │
   │  4. Apply status filter              │
   │  5. Apply priority filter            │
   │  6. Apply sorting                    │
   │  7. Store in filteredReportes[]      │
   │  8. Calculate pagination             │
   │  9. Update displayedReportes[]       │
   └──────────────────────────────────────┘
           ↓
   ┌──────────────────────────────────────┐
   │  UI Updates                          │
   │  - Display new filtered list         │
   │  - Update pagination buttons         │
   │  - Show filter summary               │
   └──────────────────────────────────────┘
```

---

## 🎨 View Modes Implementation

```
┌────────────────────────────────────────────────┐
│  VIEW MODES                                    │
├────────────────────────────────────────────────┤
│                                                │
│  ┌─────────────────────────────────┐         │
│  │ GRID VIEW (3 columns)           │         │
│  │ ┌─────────┐ ┌─────────┐ ┌─────┐│         │
│  │ │ Card 1  │ │ Card 2  │ │Card3││         │
│  │ │ Expand  │ │ Expand  │ │Expd ││         │
│  │ │ Actions │ │ Actions │ │Act  ││         │
│  │ └─────────┘ └─────────┘ └─────┘│         │
│  └─────────────────────────────────┘         │
│                                                │
│  ┌─────────────────────────────────┐         │
│  │ LIST VIEW (Full width)          │         │
│  │ ┌─────────────────────────────┐ │         │
│  │ │ Item 1                      │ │         │
│  │ │ Desc... Meta... [V][E][D]   │ │         │
│  │ └─────────────────────────────┘ │         │
│  │ ┌─────────────────────────────┐ │         │
│  │ │ Item 2                      │ │         │
│  │ │ Desc... Meta... [V][E][D]   │ │         │
│  │ └─────────────────────────────┘ │         │
│  └─────────────────────────────────┘         │
│                                                │
│  ┌─────────────────────────────────┐         │
│  │ TABLE VIEW (Horizontal scroll)  │         │
│  │ ┌──────────────────────────────┐│         │
│  │ │ Title │ Desc │ Status │ ...  ││         │
│  │ ├──────────────────────────────┤│         │
│  │ │ Name1 │ Des1 │ Open   │ ...  ││         │
│  │ │ Name2 │ Des2 │ Pend   │ ...  ││         │
│  │ └──────────────────────────────┘│         │
│  └─────────────────────────────────┘         │
│                                                │
└────────────────────────────────────────────────┘
```

---

## 🔐 Security & Validation

```
INPUT VALIDATION
├─ Search input: String sanitization (no HTML)
├─ Category ID: Number validation
├─ Status: Enum from predefined list
├─ Priority: Enum from predefined list
├─ Sort field: Hardcoded allowed fields
├─ Page size: Predefined options only
└─ Page number: Range validation (1 to totalPages)

ERROR HANDLING
├─ API not responding → Load mock data
├─ Invalid filters → Reset to defaults
├─ Delete action → Confirmation dialog
├─ Subscription errors → Graceful degradation
└─ Missing data → Display placeholder

PERFORMANCE PROTECTION
├─ Search debounce: 300ms (prevents spam)
├─ Unsubscribe on destroy: Memory safety
├─ Pagination: Limits DOM elements
└─ Change detection: OnPush optimized
```

---

## 📱 Responsive Layout Transformation

```
┌──────────────────────────────────────────────────┐
│ DESKTOP (1024px+)                                │
│ ┌────────────────────────────────────────────┐  │
│ │ Header | Stats            Stats            │  │
│ │ [Search] [Category] [Status] [Priority]    │  │
│ │ [Grid View][List][Table][Sort] [Page Size]│  │
│ ├────────────────────────────────────────────┤  │
│ │ ┌────┐ ┌────┐ ┌────┐                       │  │
│ │ │Card│ │Card│ │Card│ (3 columns)          │  │
│ │ └────┘ └────┘ └────┘                       │  │
│ │ [Prev][1][2][3][4][5][Next]                │  │
│ └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ TABLET (768px - 1023px)                          │
│ ┌────────────────────────────────────────────┐  │
│ │ Header                                     │  │
│ │ Stats Stats                                │  │
│ │ [Search...........................]        │  │
│ │ [Category] [Status] [Priority]             │  │
│ │ [Buttons] [Sort] [Page Size]               │  │
│ ├────────────────────────────────────────────┤  │
│ │ ┌──────────┐ ┌──────────┐                  │  │
│ │ │  Card 1  │ │  Card 2  │ (2 columns)     │  │
│ │ └──────────┘ └──────────┘                  │  │
│ │ [◄][1][2][3][►]                           │  │
│ └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ MOBILE (480px - 767px)                           │
│ ┌────────────────────────────────────────────┐  │
│ │ Header                                     │  │
│ │ [Stats ]                                   │  │
│ │ [Search..........................]        │  │
│ │ [Category.......]...................      │  │
│ │ [Status.......][Priority........]         │  │
│ │ [Grid][List][Table][Sort][Size]           │  │
│ ├────────────────────────────────────────────┤  │
│ │ ┌──────────────────────────────┐           │  │
│ │ │ Card 1 (Full width)          │           │  │
│ │ │                              │           │  │
│ │ │ Buttons                      │           │  │
│ │ └──────────────────────────────┘           │  │
│ │ ┌──────────────────────────────┐           │  │
│ │ │ Card 2 (Full width)          │           │  │
│ │ └──────────────────────────────┘           │  │
│ │ [◄][1][2][3][►]                           │  │
│ └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

---

## 🎨 Color System & Visual Hierarchy

```
STATUS COLORS & ICONS
┌─────────────┬─────────┬────────────────────┐
│ Status      │ Color   │ Icon               │
├─────────────┼─────────┼────────────────────┤
│ Abierto     │ #3b82f6 │ fa-folder-open     │
│ Pendiente   │ #eab308 │ fa-hourglass-half  │
│ En-Proceso  │ #8b5cf6 │ fa-spinner         │
│ Resuelto    │ #16a34a │ fa-check-circle    │
│ Cerrado     │ #6b7280 │ fa-lock            │
└─────────────┴─────────┴────────────────────┘

PRIORITY COLORS
┌──────────┬─────────┬──────────┐
│ Priority │ Color   │ Severity │
├──────────┼─────────┼──────────┤
│ Baja     │ #10b981 │ Low      │
│ Media    │ #f59e0b │ Medium   │
│ Alta     │ #ef4444 │ High     │
│ Crítica  │ #7c2d12 │ Critical │
└──────────┴─────────┴──────────┘

ACTION BUTTONS
┌────────┬─────────┬──────────────┐
│ Action │ Color   │ Icon         │
├────────┼─────────┼──────────────┤
│ View   │ #3b82f6 │ fa-eye       │
│ Edit   │ #eab308 │ fa-edit      │
│ Delete │ #ef4444 │ fa-trash     │
└────────┴─────────┴──────────────┘
```

---

## 🔄 Pagination Algorithm

```
Calculation Logic:
┌─────────────────────────────────────┐
│ totalItems = filteredReportes.length │
│ pageSize = selected page size        │
│ totalPages = ceil(totalItems/pageSize)
│ currentPage = 1 (default)            │
│                                      │
│ displayStart = (currentPage - 1) * pageSize
│ displayEnd = displayStart + pageSize │
│ displayedReportes = array[displayStart:displayEnd]
└─────────────────────────────────────┘

Example with 47 items, 9 per page:
Page 1: Items 0-8   (9 items)
Page 2: Items 9-17  (9 items)
Page 3: Items 18-26 (9 items)
Page 4: Items 27-35 (9 items)
Page 5: Items 36-44 (9 items)
Page 6: Items 45-46 (2 items)

Total Pages: 6
Page Buttons: [1][2][3][4][5]... (max 5 shown)
```

---

## 🚀 Optimization Techniques

```
RENDERING OPTIMIZATION
├─ Pagination: Renders only current page items
├─ *ngFor tracking: By reporteId for identity
├─ *ngIf conditions: Prevents unnecessary DOM
├─ ChangeDetection: OnPush ready
└─ Unsubscribe: takeUntil() prevents memory leaks

SEARCH OPTIMIZATION
├─ Debounce: 300ms delay prevents spam
├─ Case-insensitive: toLowerCase() comparison
├─ Partial match: includes() for flexibility
└─ Performance: O(n) complexity

FILTER OPTIMIZATION
├─ Single pass: All filters applied together
├─ Early exit: Skip filter if 'all' selected
├─ Readonly operations: No side effects
└─ Reusable array: clone with spread operator

STATE MANAGEMENT
├─ Immutability: Don't mutate original array
├─ Predictable: Same input = same output
├─ Traceable: Clear data flow
└─ Testable: Pure functions where possible
```

---

## 📊 Type System

```typescript
Type Hierarchy:

Reportes (Base Model)
├── reporteId: number
├── usuarioId: number
├── categoriaId: number
├── ubicacionId: number
├── titulo: string
├── descripcion: string
├── estado: string
├── prioridad: string
├── fecha_Creacion: Date
├── fecha_Cierre?: Date
├── usuario?: Usuario
├── categoria?: Categorias
└── ubicacion?: Ubicaciones

ReporteWithRelations (Extended)
├── ... (all Reportes fields)
├── usuarioNombre?: string
├── categoriaNombre?: string
└── ubicacionDireccion?: string

SortField = 'fecha_Creacion' | 'titulo' | 'prioridad' | 'estado'
SortDirection = 'asc' | 'desc'

PaginationState {
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
}
```

---

**Last Updated**: 2026-03-22  
**Component Version**: 1.0.0  
**Status**: ✅ Production Ready

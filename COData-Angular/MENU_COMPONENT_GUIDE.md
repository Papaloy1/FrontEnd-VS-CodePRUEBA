# MenuPrincipal Component Integration

## Overview

The **MenuPrincipalComponent** is the main navigation header for the COData application. It provides:
- Navigation to main sections (Principal, Seguimiento, Mapa, Fotos/Videos, Notificaciones, Configuración)
- User profile display with avatar and email
- User dropdown menu with profile, settings, and logout options
- Mobile-responsive hamburger menu
- Font Awesome icon integration
- Active route highlighting

## Component Structure

### Files Created
- `src/app/components/menu-principal/menu-principal.component.ts` - Component logic
- `src/app/components/menu-principal/menu-principal.component.html` - Template
- `src/app/components/menu-principal/menu-principal.component.scss` - Styling

### Key Features

#### 1. **Main Navigation Items**
- **Principal** - Dashboard/home page
- **Seguimiento** - Report tracking
- **Mapa** - Interactive map view
- **Fotos/Videos** - Media gallery
- **Notificaciones** - User notifications
- **Configuración** - Settings

#### 2. **User Menu**
- Avatar with user initials
- User name and email display
- Dropdown with:
  - Mi Perfil (Profile)
  - Configuración (Settings)
  - Cerrar Sesión (Logout)

#### 3. **Responsive Design**
- **Desktop**: Full horizontal navigation with user menu
- **Tablet**: Navigation icons only (text hidden)
- **Mobile**: Hamburger menu with slide-out navigation

#### 4. **Mobile Features**
- Animated hamburger icon (X on open)
- Slide-out navigation panel
- Touch-friendly spacing
- Auto-close menus on navigation

## Integration with App

### App Component Structure

The menu is now integrated into the main app layout:

```
app-root (app.ts)
├── app-menu-principal (header with navigation)
├── main (main-content)
│   └── router-outlet (page content)
```

### Updated Files

#### `app.ts`
- Imports MenuPrincipalComponent
- Added to standalone imports

#### `app.html`
- MenuPrincipalComponent selector
- Main content wrapper with router-outlet

#### `app.css`
- Layout styles for app-root as flex column
- Main content scrolling behavior
- Custom scrollbar styling
- Responsive adjustments

## User Data Management

### Data Flow

1. **User Registration**
   - User fills signup form
   - ApiService.crearUsuario() creates user
   - User data stored in localStorage
   - Redirect to /mapa

2. **User Return Visits**
   - MenuPrincipalComponent checks localStorage for 'usuarioActual'
   - Loads user data on component init
   - Displays user info in header

3. **Logout**
   - Clears localStorage ('usuarioActual' and 'authToken')
   - Redirects to /login

### LocalStorage Keys

```javascript
{
  'usuarioActual': JSON.stringify(Usuario),  // Full user object
  'authToken': 'jwt-token-here'              // JWT token (when login implemented)
}
```

## Component Methods

### `loadUsuarioActual()`
Retrieves current user from localStorage and parses JSON.

**Usage**: Called on ngOnInit

### `toggleMenu()`
Opens/closes the mobile hamburger menu.

### `toggleUserMenu()`
Opens/closes the user dropdown menu.

### `closeMenus()`
Closes both menus simultaneously.

### `onNavigation()`
Called when user clicks a menu item - closes open menus.

### `logout()`
1. Clears localStorage
2. Resets usuarioActual
3. Navigates to /login

### `getInitials()`
Returns user's initials for avatar (e.g., "JD" for "John Doe").

## Routes Configuration

Routes are defined in `app.routes.ts`:

```typescript
{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'mapa',
  component: MapaComponent
},
{
  path: '**',
  redirectTo: '/login'
}
```

### Planned Routes

These routes are referenced in the menu but not yet implemented:
- `/principal` - Dashboard
- `/seguimiento` - Report tracking
- `/mapa` - Map view (EXISTS)
- `/galeria` - Media gallery
- `/notificaciones` - Notifications
- `/configuracion` - Settings
- `/perfil` - User profile

## Responsive Breakpoints

```scss
$mobile: 768px      // Mobile devices
$tablet: 1024px     // Tablets and small desktops
```

### Desktop (> 1024px)
- Full navigation with labels
- User menu with name and email visible
- Hamburger menu hidden

### Tablet (768px - 1024px)
- Navigation icons only (labels hidden)
- User menu with name and email visible
- Hamburger menu hidden

### Mobile (< 768px)
- Hamburger menu visible
- Slide-out navigation panel
- User avatar only in header
- Hamburger menu visible for user menu toggle

## Styling

### Colors
- **Primary**: #3b82f6 (Blue)
- **Primary Dark**: #1e40af
- **Text Dark**: #1f2937
- **Text Light**: #6b7280
- **Border**: #e5e7eb
- **Background Light**: #f9fafb
- **White**: #ffffff

### Key Classes

#### Header
- `.header` - Main header container
- `.header-container` - Content wrapper
- `.brand` - Logo/brand area
- `.nav-desktop` - Desktop navigation
- `.header-actions` - Right side actions

#### User Menu
- `.user-menu-container` - Wrapper
- `.user-button` - Avatar and user info button
- `.user-avatar` - Circular avatar with initials
- `.user-dropdown` - Dropdown menu
- `.dropdown-item` - Individual menu item

#### Mobile Menu
- `.menu-toggle-mobile` - Hamburger button
- `.nav-mobile` - Mobile nav panel
- `.mobile-nav-item` - Mobile menu item

## Next Steps

1. **Create Missing Page Components**
   - Create `/principal` component for dashboard
   - Create `/seguimiento` for report tracking
   - Create `/galeria` for media gallery
   - Create `/notificaciones` for notifications
   - Create `/configuracion` for settings
   - Create `/perfil` for user profile

2. **Implement Authentication**
   - Backend endpoint: `POST /api/Usuario/login`
   - Response: `{ token: string; usuario: Usuario }`
   - Update LoginComponent to use endpoint
   - Store JWT in localStorage and request headers

3. **Add Route Guards**
   - Create AuthGuard to protect authenticated routes
   - Redirect unauthenticated users to login
   - Return false if no token in localStorage

4. **API Interceptor** (Optional)
   - Auto-add JWT to request headers
   - Handle 401 Unauthorized responses
   - Auto-logout on token expiration

## Usage Example

### Display User After Login

```typescript
// In LoginComponent.onRegister()
this.apiService.crearUsuario(newUser).subscribe({
  next: (response) => {
    // Store user in localStorage
    localStorage.setItem('usuarioActual', JSON.stringify(response));
    
    // Navigate to mapa
    this.router.navigate(['/mapa']);
    
    // MenuPrincipalComponent will automatically load user data
  }
});
```

### Clear User on Logout

```typescript
logout() {
  localStorage.removeItem('usuarioActual');
  localStorage.removeItem('authToken');
  this.router.navigate(['/login']);
}
```

## Testing

### Manual Testing Checklist

- [ ] Sign up creates user and stores in localStorage
- [ ] Menu displays user name and email
- [ ] Avatar shows correct initials
- [ ] Active route is highlighted on desktop nav
- [ ] Hamburger menu opens/closes on mobile
- [ ] User dropdown menu works
- [ ] Logout clears localStorage and redirects
- [ ] Responsive design works at all breakpoints
- [ ] Navigation items route correctly

---

**Status**: ✅ Complete and integrated
**Next Priority**: Create remaining page components and implement login endpoint

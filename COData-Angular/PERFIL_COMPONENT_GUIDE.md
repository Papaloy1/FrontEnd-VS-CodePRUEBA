# Profile Component Documentation

## Overview
The Profile Component (Perfil Component) is an Angular 21 standalone component designed for managing user profile information, including personal details, password management, and avatar uploads.

## Location
- **Component**: `src/app/components/perfil/`
- **Files**:
  - `perfil.component.ts` - Component logic and validation
  - `perfil.component.html` - Template structure
  - `perfil.component.scss` - Styling

## Features

### 1. **View Mode**
- Display user profile information
- Shows avatar with initials
- Displays user name, email, and account creation date
- Clean, read-only view of account details
- Edit and Change Password buttons

### 2. **Edit Mode**
- Reactive form with comprehensive validation
- Fields include:
  - **Full Name** (required, 3-100 characters)
  - **Email Address** (required, valid email format)
  - **Phone Number** (optional, 7-15 digits)
  - **Role** (read-only, displays user role)
  - **Member Since** (read-only, displays registration date)
  - **New Password** (optional, min 6 characters)
  - **Confirm Password** (must match new password)

### 3. **Avatar Upload**
- Image selection with preview
- Supported formats: JPEG, PNG, GIF, WebP
- Maximum file size: 5MB
- Live preview of selected image
- Avatar preview shows user initials in view mode

### 4. **Form Validation**
- Real-time validation feedback
- Password match validation
- Email format validation
- Field-specific error messages
- Touch-based error display (shows errors only after user interaction)

### 5. **Data Persistence**
- Loads user data from localStorage (`usuarioActual` key)
- Updates user on successful form submission
- Persists changes to both API and localStorage
- Shows success/error messages with auto-dismiss

## Data Model

### Usuario Interface
```typescript
export interface Usuario {
  usuarioId: number;
  nombre: string;
  email: string;
  contraseña: string;
  fechaRegistro: Date;
  teléfono?: string;        // Optional phone number
  rol?: string;             // Optional user role
  avatar?: string;          // Optional profile picture (Base64 or URL)
}
```

## API Integration

### Methods Used
- `apiService.actualizarUsuario(id: number, usuario: Usuario)` - Updates user profile
- `apiService.getUsuarioById(id: number)` - Fetches user details

### API Endpoints
- **PUT** `/api/Usuario/{id}` - Update user profile
- **GET** `/api/Usuario/{id}` - Get user by ID

## Component Structure

### Properties
```typescript
profileForm: FormGroup              // Reactive form group
usuario: Usuario | null             // Current user data
isLoading: boolean                  // Loading state for API calls
isEditing: boolean                  // Toggle between view/edit mode
submitSuccess: boolean              // Success message flag
submitError: string | null          // Error message display
avatarPreview: string | null        // Base64 preview of selected image
selectedFile: File | null           // Selected image file
```

### Key Methods

#### `loadUserProfile()`
Loads user data from localStorage on component initialization.

#### `createForm(): FormGroup`
Creates the reactive form with validation rules.

#### `onAvatarSelected(event: Event)`
- Validates file type (JPEG, PNG, GIF, WebP)
- Validates file size (max 5MB)
- Creates base64 preview
- Displays validation errors

#### `toggleEditMode()`
Switches between view and edit modes. Resets form if exiting edit mode.

#### `submitForm()`
- Validates entire form
- Calls API to update user
- Updates localStorage
- Shows success/error messages
- Automatically exits edit mode on success

#### `passwordMatchValidator()`
Custom validator ensuring password and confirmation password match.

#### `getErrorMessage(fieldName: string): string`
Returns user-friendly error messages for form validation.

## Styling Features

### Color Scheme
- **Primary**: `#960e53` (Wine/Maroon)
- **Secondary**: `#3b82f6` (Blue)
- **Success**: `#16a34a` (Green)
- **Danger**: `#dc2626` (Red)
- **Background**: `#f5f5f5` (Light Gray)

### Responsive Design
- **Desktop**: Full layout with side-by-side elements
- **Tablet**: Optimized spacing and grid layout
- **Mobile**: Stack layout, full-width buttons, adjusted padding

### Key Classes
- `.perfil-container` - Main container
- `.profile-view` - View mode layout
- `.profile-edit` - Edit mode layout
- `.form-section` - Grouped form fields
- `.form-group` - Individual form control
- `.avatar-upload` - Avatar upload section
- `.alert` - Success/error messages
- `.btn` - Button styles (primary, secondary, variants)

## LocalStorage Integration

### Key: `usuarioActual`
Stores the current logged-in user as JSON:
```json
{
  "usuarioId": 1,
  "nombre": "John Doe",
  "email": "john@example.com",
  "contraseña": "hash...",
  "fechaRegistro": "2024-03-22T00:00:00",
  "teléfono": "1234567890",
  "rol": "Usuario"
}
```

## Form Validation Rules

| Field | Required | Rules |
|-------|----------|-------|
| Nombre | ✓ | Min 3, Max 100 characters |
| Email | ✓ | Valid email format |
| Teléfono | ✗ | 7-15 digits (if provided) |
| Contraseña | ✗ | Min 6 characters (if provided) |
| Confirmar Contraseña | ✗ | Must match password |

## Error Handling

### User-Friendly Messages
- Field validation errors show immediately on blur/touch
- API errors display in alert message
- Password mismatch detected with custom validator
- File upload errors for invalid types/sizes

### Auto-Dismiss Alerts
- Success messages disappear after 3 seconds
- Error messages persist until user closes or corrects

## Integration with Menu Component

The profile component is accessible via:
1. **User Menu Dropdown**: Click avatar → "Mi Perfil"
2. **Route**: Navigate to `/perfil`
3. **Menu Items**: Can be added to main navigation

## Responsive Behavior

### Mobile Optimizations
- Avatar and info stack vertically
- Form sections take full width
- Buttons stack in form actions
- Touch-friendly input sizes
- Adjusted font sizes for readability

### Tablet Optimizations
- Multi-column grid for details
- Optimized spacing
- Icon sizes maintained

## Dependencies

### Angular Modules
- `CommonModule` - Common directives (ngIf, ngFor)
- `ReactiveFormsModule` - Form building and validation

### Services
- `ApiService` - Backend API communication
- `FormBuilder` - Reactive form creation

### RxJS
- `Subject`, `takeUntil` - Subscription management

## Usage Example

```typescript
// In a parent component or routing module:
import { PerfilComponent } from './components/perfil/perfil.component';

// Add to routes:
{ path: 'perfil', component: PerfilComponent }

// Component is standalone, no module declaration needed
```

## Browser Compatibility
- Modern browsers with ES2020+ support
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## Performance Considerations
- Reactive form for efficient change detection
- OnPush change detection strategy compatible
- Memory cleanup with `takeUntil` pattern
- Lazy-loaded image preview

## Future Enhancements
- Profile picture upload to server/cloud storage
- Social media profile linking
- Account security settings (2FA)
- Login history
- Device management
- Account deletion option

## Testing Recommendations

### Unit Tests
- Form validation rules
- Error message generation
- Avatar file validation
- Password matching

### Integration Tests
- API call on form submission
- localStorage updates
- Mode toggling
- Form reset behavior

### E2E Tests
- Complete user flow from view to edit
- Form submission with validation
- Avatar file upload
- Success/error message display

## Troubleshooting

### Data not loading
- Check if localStorage has `usuarioActual` key
- Verify user is logged in
- Check browser console for errors

### Form not submitting
- Verify all required fields are filled
- Check form validation rules
- Ensure API endpoint is accessible

### Avatar preview not showing
- Ensure selected file is a valid image
- Check file size doesn't exceed 5MB
- Verify MIME type is in allowed list

## Security Considerations
- Passwords are sent to API (use HTTPS in production)
- LocalStorage is plaintext (don't store sensitive data)
- Add request interceptor for authentication tokens
- Implement CSRF protection
- Validate file uploads on backend

## Notes
- Component uses reactive forms for robust validation
- Standalone component requires no module imports
- Compatible with Angular 21+ standalone patterns
- Responsive design mobile-first approach

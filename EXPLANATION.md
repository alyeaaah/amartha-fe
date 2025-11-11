# Project Explanation

This project is a **React + TypeScript admin dashboard application** built with **Vite**, **Ant Design**, and **Tailwind CSS**. The goal was to create a comprehensive, well-tested, and maintainable frontend application demonstrating best practices in modern web development, API integration, and state management.

---

## 🎯 Architecture & Design Decisions

### 1. **React 18 with TypeScript**

**Why TypeScript?**
- Ensures type safety across the application
- Prevents runtime errors through compile-time checking
- Makes components self-documented through prop types and interfaces
- Improves developer experience with IDE autocomplete
- Facilitates refactoring with confidence

**React 18 Features Used:**
- Concurrent rendering for better performance
- Automatic batching of state updates
- Improved error boundaries

### 2. **Vite as Build Tool**

**Why Vite over Webpack/CRA?**
- ⚡ **Lightning-fast development** - Near-instant HMR (Hot Module Replacement)
- 🚀 **Faster builds** - Optimized production bundling
- 📦 **Lower overhead** - Simpler configuration
- 🧪 **Better testing** - Integrated with Vitest for faster tests
- 🔧 **Native ES modules** - Modern JavaScript features by default

**Vite Configuration:**
- React plugin for JSX support
- SVG import support (SVGR)
- Path aliases for cleaner imports
- CSS/SCSS preprocessing
- Support for environment-based basename configuration

### 3. **Component Architecture**

**Strategy: Separation of Concerns**

- **UI Components** (`components/`) - Reusable, presentational components
- **Page Components** (`pages/`) - Business logic and page-level state
- **Smart Components** - Connect to state management (Jotai, React Query)
- **Dumb Components** - Receive props, no side effects

**Benefits:**
- Easy testing and reusability
- Clear data flow
- Easier to maintain and debug
- Better code organization

### 4. **State Management: Jotai + React Query**

**Why Jotai?**
- Minimal, primitive-based state management
- Works seamlessly with React Suspense
- Lower bundle size compared to Redux
- No boilerplate - atoms are simple and composable
- Great TypeScript support

**Why React Query (TanStack Query)?**
- Handles server state separately from UI state
- Automatic caching and background refetching
- Built-in loading/error states
- Reduces boilerplate for data fetching
- Better performance through smart request deduplication
- **Automatic retry logic** - Intelligently retries failed requests up to 3 times with exponential backoff

**Architecture:**
```
Global State (Jotai)
    ↓
Page State (React Query + React Hook Form)
    ↓
Component Props
```

### 5. **Form Handling: React Hook Form + Zod**

**Why React Hook Form?**
- Minimal re-renders with performance optimization
- Small bundle size (~9kb)
- Easy integration with validation libraries
- Built-in form state management
- Great TypeScript support

**Why Zod?**
- TypeScript-first schema validation
- Generates TypeScript types from schemas
- Works perfectly with React Hook Form
- Comprehensive error handling
- Easy-to-use API

**Pattern:**
```tsx
const schema = z.object({ email: z.string().email() });
type FormData = z.infer<typeof schema>;
const form = useForm<FormData>({ resolver: zodResolver(schema) });
```

### 6. **UI Framework: Ant Design + Tailwind CSS**

**Ant Design:**
- Comprehensive component library
- Enterprise-grade design system
- Dark mode support
- Excellent accessibility
- Rich documentation

**Tailwind CSS:**
- Rapid UI development with utility classes
- Consistent design system
- Responsive design with breakpoints
- Can be used alongside Ant Design
- Smaller CSS footprint when used with PurgeCSS

**Integration:**
- Ant Design for structured components (forms, tables, modals)
- Tailwind for custom styling and layout
- Custom theme configuration in `tailwind.config.js`

### 7. **Routing: React Router v6**

**Why React Router v6?**
- Modern API with hooks (`useParams`, `useNavigate`, etc.)
- Better TypeScript support
- Nested route definitions
- Data loader capabilities
- Cleaner code patterns

**Structure:**
- Protected routes for authenticated pages
- Public layout for login/register
- Centralized route configuration
- Type-safe route paths with `typesafe-routes`

### 8. **Testing Strategy: Vitest + React Testing Library**

**Why Vitest?**
- ⚡ Fast test execution (uses Vite's transforms)
- 🔄 Hot module replacement in tests
- 📊 Built-in coverage reporting
- 🧪 Jest-compatible API
- 🎨 Interactive UI for test exploration

**Why React Testing Library?**
- Tests behavior, not implementation details
- Encourages accessibility-first development
- Better aligned with how users interact with apps
- Forces better component design

**Testing Approach:**
- Unit tests for utilities and hooks
- Component tests with mocked data
- MSW for API mocking
- Snapshot tests for static components
- Integration tests for complex flows

**Test Structure:**
```
src/__tests___/
├── components/        # Component tests
├── pages/            # Page tests
├── mocks/            # MSW handlers
├── store/            # State management tests
└── utils.tsx         # Test helpers
```

### 9. **Styling Architecture**

**CSS Organization:**
```
src/assets/css/
├── app.css                    # Global styles
├── components/base/           # Base element styles
│   ├── _global.css
│   ├── _box.css
│   └── ...
└── fonts/                     # Font imports
    ├── _roboto.css
    └── _nunito.css
```

**Approach:**
- Base styles for HTML elements
- Component-specific SCSS modules
- Tailwind utilities for responsive design
- CSS variables for theming
- Dark mode support with CSS classes

### 10. **API Integration Strategy**

The application demonstrates professional API integration patterns with two distinct use cases:

#### **A. Jikan Anime API (Primary Feature - Main Focus)**

**Purpose:** Browse, filter, and explore anime database

**Endpoints:**
- `GET /anime` - List anime with advanced filtering
- `GET /top/anime` - Top rated/trending anime
- `GET /anime/:id` - Detailed anime information
- `GET /anime/:id/recommendations` - Related anime
- `GET /anime/:id/relations` - Related entries
- `GET /genres/anime` - Available genres
- `GET /producers` - Anime producers

**Features:**
- Advanced search and filtering with real-time API calls
- Pagination support
- Genre and producer browsing
- Anime detail pages with related content
- Recommendation system
- Fully typed endpoints with Zodios

**Architecture:**
```
src/pages/Anime/
├── api/
│   ├── endpoints.ts       # Jikan API endpoints
│   ├── schema.ts          # Zod validation schemas
│   ├── index.ts           # API client configuration
│   └── anime-queries.ts   # React Query hooks
├── components/
│   ├── anime-filter.modal.tsx
│   ├── carousel-thumbnail.component.tsx
│   └── carousel-thumbnail-mini.component.tsx
├── Detail/
│   └── index.tsx          # Anime detail page
└── index.tsx              # Anime list page
```

#### **B. Swagger Pet Store API (CRUD Examples)**

**Purpose:** Demonstrate form validation and CRUD operations patterns

**Endpoints:**
- `GET /pet/findByStatus` - List pets by status
- `GET /pet/findByTags` - Filter pets by tags
- `GET /pet/:petId` - Get pet details
- `POST /pet` - Create new pet
- `PUT /pet` - Update pet (form validation example)
- `DELETE /pet/:petId` - Delete pet
- `POST /pet/:petId/uploadImage` - Upload pet image

**Features:**
- **Form Validation** - React Hook Form + Zod schema validation
- **Error Handling** - Graceful handling of API failures
- **Retry Logic** - TanStack Query automatically retries up to 3 times on failure
- **Transaction Management** - Optimistic updates and rollbacks
- **File Uploads** - Image upload with form submission

**Why This Endpoint?**
- Well-structured REST API
- Reliable for testing form validation patterns
- Occasionally returns HTTP 500 errors (testing resilience!)
- TanStack Query's automatic retry mechanism handles transient failures seamlessly

**Architecture:**
```
src/pages/Admin/Pet/
├── api/
│   ├── endpoints.ts       # Pet API endpoints
│   ├── schema.ts          # Pet validation schemas
│   ├── index.ts           # API client
│   └── pet-queries.ts     # React Query hooks
├── form.tsx               # Pet form with validation
├── detail.tsx             # Pet detail view
└── index.tsx              # Pet list with CRUD
```

**Retry Behavior:**
```typescript
// TanStack Query configuration with 1 retry
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
```

### 11. **Integration Patterns**

**Centralized Configuration:**
```typescript
// API clients configured in src/utils/axios.ts
// Jikan API: https://api.jikan.moe/v4/
// Pet Store API: https://petstore3.swagger.io/api/v3/
```

**Request Interceptors:**
- Automatic token injection for authenticated requests
- Error response standardization
- Request/response logging in development

**Response Handling:**
- Schema validation with Zod
- Type-safe responses
- Proper error boundaries

---

## 🏗 Component Structure & Patterns

### Smart Components (Page-Level)

Components connected to state management and APIs:

```tsx
// src/pages/Anime/index.tsx - Main anime listing
export const AnimePage = () => {

  const queryParams = useRouteParams(paths.animePage.index);
  const dateFormat = 'YYYY-MM-DD';
  const {
    limit,
    ...
    end_date
  } = queryParams;

  const [openFilter, setOpenFilter] = useState(false);

  const setQueryParams = (newParams: Partial<typeof queryParams>) => {
    navigate(paths.animePage.index({
      ...queryParams,
      ...newParams,
    }).$);
  }
  const { data: dataAnimeList, isLoading: dataAnimeListLoading } = AnimeApiHooks.useGetAnimeList({
    queries: {
      limit: limit || 25,
      ...
      end_date: end_date ? dayjs(end_date).format(dateFormat) : undefined,
    }
  }, { enabled: true });
  
  return (...);
}
```

### Dumb Components (Presentational)

Pure presentational components receiving all data via props:

```tsx
// src/pages/Anime/components/carousel-thumbnail.component.tsx
interface CarouselThumbnailComponentProps {
  bordered?: boolean;
  isLoading?: boolean;
  action?: React.ReactNode;
  className?: string;
  animeList: Anime[];
  title?: string;
  subtitle?: string;
  slideshow?: {
    autoplay?: boolean;
    slidesToShow?: number;
    slidesToScroll?: number;
    dots?: boolean;
    arrows?: boolean;
  }
}
export const CarouselThumbnailComponent = ({ action, animeList, title, subtitle, slideshow, bordered, isLoading, className }: CarouselThumbnailComponentProps) => {
    return (...)
}
```

### Custom Hooks Pattern

React Query hooks encapsulate API logic:

```typescript
// src/pages/Anime/api/anime-queries.ts
export function useAnimeList(params: AnimeListParams) {
  return useQuery({
    queryKey: ['anime.list', params],
    queryFn: () => api.getAnimeList(params),
  });
}

export function useAnimeDetail(id: string) {
  return useQuery({
    queryKey: ['anime.detail', id],
    queryFn: () => api.getAnimeDetail(id),
  });
}
```

### Form Components with Validation

Pet management forms demonstrate complete validation pattern:

```tsx
// src/pages/Admin/Pet/form.tsx
export function PetForm({ onSubmit }: PetFormProps) {
  const form = useForm<PetFormData>({
    resolver: zodResolver(petFormSchema),
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields with error handling */}
    </form>
  );
}
```

---

## 📊 Key Features Implemented

### Anime Browser (Jikan API)
- Advanced search with real-time filtering
- Browse top rated and trending anime
- Detailed anime pages with relations and recommendations
- Genre filtering
- Producer information

### Pet Management (Swagger API)
- Complete CRUD operations
- Form validation with React Hook Form + Zod
- Image upload functionality
- Status and tag-based filtering
- Error recovery with automatic retries

### Authentication System
- Login/Register pages with form validation
- Protected routes for admin pages
- Secure token storage
- Session management with Jotai

### Admin Dashboard
- Dashboard overview with analytics
- Pet management interface
- Order management
- User management
- Dark mode support

### Responsive Design
- Mobile-first approach
- Tailwind breakpoints (`sm`, `md`, `lg`, `xl`)
- Flexible grid layouts
- Mobile-friendly navigation

### Performance Optimizations
- Code splitting with React Router
- Image optimization
- Bundle size optimization with Vite
- Memoization of expensive components
- React Query caching

### Developer Experience
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Git hooks for code quality
- Comprehensive documentation

---

## 🧪 Testing Coverage

**Test Categories:**

1. **Unit Tests** - Individual functions and hooks
2. **Component Tests** - UI components with user interactions
3. **Integration Tests** - Multi-component workflows

**Recent Test Updates:**
- Enhanced anime listing tests
- Anime detail page tests
- Pet CRUD operation tests
- Form validation tests
- API retry logic verification

**Running Tests:**
```bash
pnpm test              # Watch mode
pnpm test --run        # CI mode
pnpm test:coverage     # Coverage report
pnpm test:ui           # Interactive UI
```

---

## 📦 Deployment Considerations

### Build Optimization
- Tree-shaking for unused code removal
- Code splitting for bundle optimization
- Minification of assets
- CSS purging with Tailwind

### Environment Configuration
- Environment variables via `.env.example`
- Different configs for dev/prod
- Secure token storage
- API URL configuration per environment

### Deployment Options
1. **Vercel** - Zero-config deployment with `vercel.json`
2. **Docker** - Containerized deployment
3. **Self-hosted** - Traditional VPS/server hosting
4. **Static hosting** - Netlify, GitHub Pages, etc.

---

## 🚀 Future Enhancements (If Needed)

- [ ] PWA support for offline functionality
- [ ] GraphQL integration as alternative to REST
- [ ] Storybook for component documentation
- [ ] E2E testing with Playwright
- [ ] Performance monitoring
- [ ] Accessibility audit tooling
- [ ] Internationalization (i18n)
- [ ] Advanced caching strategies
- [ ] Offline-first anime browsing

---

## 📚 Learning Resources

- **React Best Practices** - [react.dev](https://react.dev)
- **TypeScript** - [typescriptlang.org](https://www.typescriptlang.org/)
- **Vite Guide** - [vitejs.dev](https://vitejs.dev/)
- **Vitest Docs** - [vitest.dev](https://vitest.dev/)
- **Testing Library** - [testing-library.com](https://testing-library.com/)
- **React Query** - [tanstack.com/query](https://tanstack.com/query/latest)
- **Jikan API Docs** - [docs.api.jikan.moe](https://docs.api.jikan.moe/)
- **Jotai Docs** - [jotai.org](https://jotai.org/)

---

## 🧠 Key Takeaways

This project demonstrates:
- **Clean Architecture** - Well-organized, maintainable code structure with clear separation of concerns
- **API Integration** - Professional patterns for multiple APIs (Jikan, Swagger Pet Store) with proper error handling
- **Best Practices** - Modern React patterns, TypeScript usage, and state management
- **Testability** - Comprehensive test coverage with developer experience in mind
- **Performance** - Optimized builds, caching, and runtime performance
- **Developer Experience** - Great tooling, clear documentation, and ease of setup
- **Resilience** - Automatic retry logic and graceful error handling
- **Scalability** - Architecture that grows with your application

---

_This document explains the design philosophy, technical decisions, and integration patterns in the Zau Amartha project._

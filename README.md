# Mikro-Frontend E-Commerce Uygulaması

Next.js Multi-Zone Architecture ve RTK Query kullanarak geliştirilmiş modern mikro-frontend e-commerce uygulaması.

## 🏗️ Mimari

Bu proje iki ayrı mikro-frontend uygulamasından oluşur:

- **Home App** (Port 3000): Ürün listeleme ve sepet yönetimi (RTK Query ile)
- **Cart App** (Port 3001): Sepet görüntüleme ve checkout işlemleri

## 🚀 Teknolojiler

- **Next.js 15** (App Router)
- **TypeScript** (Strict Mode)
- **Tailwind CSS** (Responsive Design)
- **Redux Toolkit** (State Management)
- **RTK Query** (API Management & Caching)
- **React Hot Toast** (Notifications & Error Handling)
- **Docker & Docker Compose** (Containerization)
- **Error Middleware** (Automatic Error Handling)

## 📦 Kurulum

### Hızlı Başlangıç (Makefile ile)

```bash
# Repository'yi klonlayın
git clone https://github.com/ferhaterciyes/Multi-Zone-Architecture
cd Multi-Zone-Architecture

# Development ortamını başlatın
make dev

# Veya Docker ile
make docker-up
```

### Manuel Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/ferhaterciyes/Multi-Zone-Architecture
cd Multi-Zone-Architecture

# Her iki uygulama için dependencies yükleyin
cd home && npm install
cd ../cart && npm install

# Her iki uygulamayı farklı terminallerde çalıştırın
# Terminal 1:
cd home && npm run dev

# Terminal 2:
cd cart && npm run dev
```

### Docker ile Çalıştırma

```bash
# Tüm servisleri ayağa kaldır
docker-compose up --build

# Background'da çalıştır
docker-compose up -d

# Servisleri durdur
docker-compose down
```

## 🌐 Uygulama URL'leri

- **Home**: http://localhost:3000
- **Cart**: http://localhost:3001

## 🏛️ Proje Yapısı

```
Multi-Zone-Architecture/
├── home/                 # Ana uygulama (ürün listeleme)
│   ├── app/
│   │   ├── features/     # Redux slices
│   │   ├── services/     # API definitions (RTK Query)
│   │   ├── components/   # React bileşenleri
│   │   ├── middleware/   # Error handling middleware
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
├── cart/                 # Sepet uygulaması
│   ├── app/
│   │   ├── features/     # Redux slices
│   │   ├── components/   # React bileşenleri
│   │   ├── middleware/   # Error handling middleware
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml    # Docker orchestration
├── Makefile             # Development scripts
└── README.md
```

## 🔧 Özellikler

### Home Uygulaması
- ✅ **RTK Query ile Ürün Listeleme** (FakeStore API)
- ✅ **Automatic Caching** (5 dakika client-side cache)
- ✅ **Background Refetching** (Data freshness)
- ✅ **Optimized Loading States** (RTK Query built-in)
- ✅ **Error Handling & Retry Logic** (RTK Query middleware)
- ✅ **Automatic Error Notifications** (Toast messages)
- ✅ Sepete ekleme/çıkarma (Redux Toolkit)
- ✅ Responsive tasarım (Tailwind CSS)
- ✅ Toast notifications (React Hot Toast)
- ✅ TypeScript type safety

### Cart Uygulaması
- ✅ Sepet görüntüleme (Redux state)
- ✅ Ürün miktarı yönetimi
- ✅ Toplam hesaplama (Real-time)
- ✅ Sepeti temizleme (Modal onay ile)
- ✅ **Error Handling Middleware** (Consistent error management)
- ✅ LocalStorage persistence
- ✅ URL parametresi ile veri transferi
- ✅ Cross-app state synchronization

### RTK Query Özellikleri
- 🚀 **Request Deduplication**: Aynı endpoint için duplicate requestler engellenir
- 🎯 **Intelligent Caching**: Tag-based cache invalidation
- 🔄 **Background Updates**: Automatic data freshness
- ⚡ **Optimistic Updates**: UI immediately updates
- 🛡️ **Error Resilience**: Built-in retry logic + custom middleware
- 📊 **DevTools Integration**: Redux DevTools support
- 🔔 **Automatic Error Notifications**: Toast messages for failed requests
- 🎨 **User-Friendly Error Messages**: Türkçe hata mesajları

### Teknik Özellikler
- ✅ **Multi-zone Architecture** (Independent deployment)
- ✅ **RTK Query API Layer** (Centralized data fetching)
- ✅ **Error Middleware Integration** (Automatic error handling)
- ✅ **Independent Build Processes** (Micro-frontend pattern)
- ✅ **Cross-app State Sync** (LocalStorage + URL params)
- ✅ **Docker Containerization** (Production ready)
- ✅ **Responsive UI/UX** (Mobile-first design)
- ✅ **TypeScript Support** (Full type safety)
- ✅ **Advanced Error Handling** (User-friendly error states)
- ✅ **Optimized Import Strategy** (Type-only imports)

## 🎯 Kullanım

### Temel Kullanım
1. **Home uygulamasında** (http://localhost:3000) ürünleri görüntüleyin
2. **RTK Query** otomatik olarak ürünleri yükler ve cache'ler
3. "Sepete Ekle" butonuna tıklayarak ürünleri sepete ekleyin
4. Sağ üst köşedeki "🛒 Sepete Git" butonuna tıklayın
5. **Cart uygulamasında** (http://localhost:3001) sepetinizi görüntüleyin
6. Modal ile sepeti temizleyebilir veya ürünleri tek tek kaldırabilirsiniz

### RTK Query Avantajları
- **İlk yükleme**: API'den veri çekilir
- **Sonraki ziyaretler**: Cache'den instant loading
- **Background updates**: Otomatik data freshness
- **Network optimization**: Request deduplication
- **Error handling**: Otomatik hata yakalama ve bildirim

## 🔄 State Senkronizasyonu

### Cross-App Data Flow
```
┌─────────────┐    LocalStorage    ┌─────────────┐
│   Home App  │ ←─────────────────→ │   Cart App  │
│ (RTK Query) │                    │ (Redux)     │
└─────────────┘                    └─────────────┘
       │                                  │
       └──────── URL Parameters ──────────┘
```

### Senkronizasyon Katmanları
- **RTK Query**: API data management (Home app)
- **Redux Toolkit**: Local state management (Both apps)
- **LocalStorage**: Persistent data storage
- **URL Parameters**: Real-time cross-app data transfer

## 🛠️ Makefile Komutları

```bash
# Development
make dev          # Start both apps in development
make install      # Install dependencies for both apps
make build        # Build both applications

# Docker
make docker-up    # Start with Docker Compose
make docker-up-bg # Start in background
make docker-down  # Stop Docker containers
make docker-logs  # View container logs

# Utilities
make clean        # Clean node_modules and build artifacts
make status       # Show running processes and ports
```

## 🐛 Debug & Monitoring

### Error Middleware
```javascript
// Error middleware otomatik olarak çalışır
// RTK Query rejected action'ları yakalar
// Toast notification gösterir
// Console'a detaylı log yazdırır
```

### Development Console Logs
```javascript
// RTK Query cache kontrolü
console.log('RTK Query cache:', store.getState().fakeStoreApi)

// LocalStorage kontrolü
localStorage.getItem('cart')

// Redux state kontrolü (DevTools)
// Her uygulamada ayrı Redux store'lar çalışır
```

### RTK Query DevTools
- **Chrome Redux DevTools** ile RTK Query state'ini görüntüleyin
- **Network tab** ile API request'leri ve cache hit/miss durumlarını takip edin
- **Console** ile RTK Query lifecycle events'leri izleyin
- **Error Toast'ları** ile kullanıcı dostu hata bildirimleri

### Performance Monitoring
```javascript
// Cache performance
console.log('Cache hit ratio:', cacheHits / totalRequests)

// API response times
console.log('Average response time:', averageResponseTime)

// Error tracking
console.log('Error middleware active:', middleware.isActive)
```

## 🚧 Geliştirme Notları

### Kod Organizasyonu
- **Features**: Redux slices (`/features`)
- **Services**: RTK Query API definitions (`/services`)  
- **Components**: React components (`/components`)
- **Middleware**: Error handling middleware (`/middleware`)
- **Hooks**: Custom Redux hooks (`/hooks`)
- **Utils**: Utility functions (`/utils`)

### Best Practices
- ✅ **TypeScript Strict Mode**: Full type safety
- ✅ **ESLint Configuration**: Code quality enforcement
- ✅ **Component Separation**: Server vs Client components
- ✅ **Error Boundaries**: Graceful error handling
- ✅ **Loading States**: User experience optimization
- ✅ **Cache Strategies**: Performance optimization
- ✅ **Type-only Imports**: Bundle size optimization
- ✅ **Middleware Pattern**: Centralized error handling

### Development Workflow
1. **Hot Reload**: Instant development feedback
2. **Type Checking**: Real-time TypeScript validation
3. **Linting**: Automatic code quality checks
4. **Independent Development**: Each app can be developed separately

## 📈 Performans Optimizasyonları

### Next.js Optimizasyonları
- ✅ **Image Optimization** (next/image)
- ✅ **SWC Minification** (Production builds)
- ✅ **Tree Shaking** (Dead code elimination)
- ✅ **Code Splitting** (Automatic route-based)
- ✅ **Static Generation** (Where applicable)

### RTK Query Optimizasyonları
- ✅ **Request Deduplication** (Prevents duplicate API calls)
- ✅ **Intelligent Caching** (5-minute client cache)
- ✅ **Background Refetching** (Keeps data fresh)
- ✅ **Prefetching** (Preload data for better UX)
- ✅ **Optimistic Updates** (Immediate UI feedback)

### Bundle Size Optimization
```bash
# Analyze bundle size
npm run build && npm run analyze

# Production build statistics
npm run build -- --analyze
```

## 🔐 Production Deployment

### Environment Variables
```bash
# .env.local (both apps)
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
NEXT_PUBLIC_HOME_URL=http://localhost:3000
NEXT_PUBLIC_CART_URL=http://localhost:3001
```

### Docker Production
```bash
# Production build
docker-compose -f docker-compose.prod.yml up --build

# Scaling
docker-compose up --scale home=3 --scale cart=2
```

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s
- **Cache Hit Ratio**: > 90%
# Multi-Zone-Architecture
# Multi-Zone-Architecture

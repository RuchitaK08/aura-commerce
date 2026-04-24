# Frontend Setup Guide - Aura Commerce

## 📦 Installation

1. **Install Dependencies**
```bash
cd aura-commerce
npm install  # or bun install
```

2. **Create Environment File**
```bash
touch .env
```

Add to `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. **Start Development Server**
```bash
npm run dev  # or bun dev
```

Frontend will run on `http://localhost:5173`

## 📂 Project Structure

```
src/
├── api/
│   ├── client.ts          # Axios instance
│   └── endpoints.ts       # API endpoint definitions
├── components/
│   ├── product/
│   │   └── ProductCard.tsx
│   ├── overlays/          # Modal components
│   ├── site/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                # Shadcn components
├── pages/
│   ├── HomePage.tsx
│   ├── ShopPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
├── routes/                # TanStack Router routes
├── store/
│   ├── index.ts          # Redux store configuration
│   ├── authSlice.ts      # Auth state
│   └── cartSlice.ts      # Cart state
├── hooks/
├── lib/
├── types/
└── styles/

```

## 🔌 API Integration

All API calls go through `/src/api/endpoints.ts`:

```typescript
import { productsAPI } from '@/api/endpoints';

// Fetch products
const { data } = await productsAPI.getAll({
  category: 'hoodies',
  minPrice: 50,
  maxPrice: 150
});

// Fetch single product
const { data: product } = await productsAPI.getById(productId);
```

## 🛠️ Redux State Management

### Auth State
```typescript
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { loginSuccess, logout } from '@/store/authSlice';

const user = useSelector((state: RootState) => state.auth.user);
const dispatch = useDispatch();

// Login
dispatch(loginSuccess({ user, token }));

// Logout
dispatch(logout());
```

### Cart State
```typescript
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { addToCart, removeFromCart } from '@/store/cartSlice';

const { items, total } = useSelector((state: RootState) => state.cart);

// Add to cart
dispatch(addToCart({
  productId: '123',
  productName: 'Black Hoodie',
  price: 89.99,
  quantity: 1,
  image: 'url',
  color: 'Black',
  size: 'M'
}));
```

## 📄 Pages & Routes

**Current Pages (Already Built):**
- `/` - Homepage
- `/login` - Login page
- `/register` - Registration page
- `/shop` - Shop/Catalog page
- `/product/:id` - Product detail page
- `/cart` - Shopping cart page
- `/checkout` - Checkout flow

**Pages to Add:**
- `/admin` - Admin dashboard
- `/stylematch` - Style match AI quiz
- `/orders` - Order history
- `/wishlist` - Wishlist
- `/profile` - User profile
- `/order/:id` - Order confirmation

## 🎨 Styling

Using **Tailwind CSS 4** with dark mode aesthetic:

```typescript
// Dark background with light text
className="bg-black text-white"

// Neutral colors for UI
className="bg-neutral-900 border-neutral-800"

// White accent for CTAs
className="bg-white text-black hover:bg-neutral-200"

// Gradient text
className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
```

## 🎬 Animations

Using **Framer Motion**:

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## 🔐 Authentication

1. **Register**: Creates new user account
2. **Login**: Returns JWT token stored in localStorage
3. **Protected Routes**: Check `state.auth.user` before rendering
4. **Token**: Automatically added to all API requests via interceptor

```typescript
// Protected component
if (!user) {
  return <Navigate to="/login" />;
}
```

## 📦 Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder.

## 🧪 Testing Pages

After seeding backend database, test with:

**Admin Account:**
- Email: admin@oopsiboughtit.com
- Password: admin123

**Regular User:**
- Email: john@example.com
- Password: password123

## ⚡ Performance Tips

1. Use React.lazy() for route-based code splitting
2. Memoize expensive components with React.memo()
3. Use virtualization for long lists
4. Optimize images with next-gen formats
5. Enable gzip compression on server

## 🐛 Common Issues

**API calls fail:**
- Ensure backend is running on port 5000
- Check REACT_APP_API_URL in .env
- Verify MongoDB is running
- Check browser console for errors

**Styles not loading:**
- Run `npm install` to ensure Tailwind is installed
- Restart dev server
- Clear browser cache

**Login not working:**
- Verify backend seed script ran successfully
- Check credentials match seeded users
- Check browser localStorage for token

## 📚 Component Examples

### Using ProductCard
```typescript
import ProductCard from '@/components/product/ProductCard';

<ProductCard product={{
  _id: '123',
  name: 'Black Hoodie',
  price: 89.99,
  compareAtPrice: 129.99,
  images: ['url1', 'url2'],
  isNew: true,
  isBestseller: true,
  isLimited: false,
  rating: 4.5
}} />
```

### Using Header
```typescript
import { Header } from '@/components/site/Header';

<Header />
```

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy!

```bash
# Vercel automatically runs:
npm run build
# and serves from dist/
```

---

**Ready to launch! 🚀**

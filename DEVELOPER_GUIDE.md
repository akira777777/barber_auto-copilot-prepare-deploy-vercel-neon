# Developer Quick Reference

## 🚀 Getting Started

```bash
# Clone repository
git clone https://github.com/akira777777/barber_auto.git
cd barber_auto

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local and add your Gemini API_KEY

# Start dev server
npm run dev

# Open http://localhost:5173
```

## 📦 Available Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # Build for production (outputs to /dist)
npm run preview  # Preview production build locally
```

## 🏗️ Project Structure

```
barber_auto/
├── components/           # React components
│   ├── Navbar.tsx       # Main navigation
│   ├── BookingModal.tsx # Booking flow (4 steps)
│   ├── AdminDashboard.tsx # Admin panel
│   ├── StyleAssistant.tsx # AI style advisor
│   └── CartDrawer.tsx   # Shopping cart
├── services/
│   └── gemini.ts        # Gemini AI integration
├── constants.tsx        # Static data (services, barbers, products)
├── types.ts             # TypeScript interfaces
├── App.tsx              # Main app component
└── index.tsx            # Entry point
```

## 🎨 Key Technologies

| Tech | Purpose | Version |
|------|---------|---------|
| React | UI framework | 19.2.3 |
| TypeScript | Type safety | 5.8.2 |
| Vite | Build tool | 6.2.0 |
| TailwindCSS | Styling | CDN |
| Gemini AI | AI features | Latest |

## 🔧 Environment Variables

```bash
# .env.local
API_KEY=your_gemini_api_key              # For AI features (required)
VITE_API_URL=http://localhost:3001      # Backend URL (when available)
```

## 📝 Common Tasks

### Add New Service
Edit `constants.tsx`:
```typescript
export const SERVICES: Service[] = [
  {
    id: '7',
    name: 'New Service',
    description: 'Service description',
    duration: '45 min',
    price: 500,
    category: 'hair'
  },
  // ... existing services
];
```

### Add New Barber
Edit `constants.tsx`:
```typescript
export const BARBERS: Barber[] = [
  {
    id: 'b4',
    name: 'New Barber',
    role: 'Junior Barber',
    experience: '2 years',
    bio: 'Bio text...',
    image: 'https://image-url.com/photo.jpg',
    specialty: ['Specialty1', 'Specialty2']
  },
  // ... existing barbers
];
```

### Change Colors
Edit `constants.tsx`:
```typescript
export const COLORS = {
  primary: '#c5a059',    // Gold accent
  secondary: '#1a1a1a',  // Dark gray
  background: '#0a0a0a', // Almost black
  text: '#ffffff',       // White
  muted: '#888888',      // Gray
};
```

### Add Product
Edit `constants.tsx`:
```typescript
export const PRODUCTS: Product[] = [
  {
    id: 'p7',
    name: 'Product Name',
    brand: 'Brand',
    price: 450,
    image: 'https://image-url.com/product.jpg',
    category: 'beard' // or 'hair', 'care'
  },
  // ... existing products
];
```

## 🐛 Debugging

### Console Errors
- Check browser console (F12)
- Common issues:
  - Missing API_KEY in .env.local
  - Network errors (CORS, API down)
  - Component rendering errors

### AI Features Not Working
1. Verify `API_KEY` in `.env.local`
2. Restart dev server: `npm run dev`
3. Check Gemini API quota: https://aistudio.google.com
4. Check browser console for errors

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

## 🚢 Deployment

### Quick Deploy to Vercel
```bash
npm install -g vercel
vercel
# Follow prompts
# Add API_KEY in Vercel dashboard
```

### Quick Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
# Follow prompts
```

### Docker Build
```bash
docker build -t barber-app .
docker run -p 3000:80 barber-app
# Open http://localhost:3000
```

### Docker Compose (Frontend Only)
```bash
docker-compose up -d
# Open http://localhost:3000
```

## 📚 Documentation Links

| Document | Purpose |
|----------|---------|
| [README.md](./README.md) | Project overview |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Technical details |
| [DEMO_GUIDE.md](./DEMO_GUIDE.md) | Demo preparation |
| [TESTING.md](./TESTING.md) | Testing strategy |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deployment guide |
| [CLIENT_PRESENTATION.md](./CLIENT_PRESENTATION.md) | Business case |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Complete overview |

## 🔐 Security Notes

### Frontend (Current State)
- ⚠️ Admin toggle is NOT secure (UI only)
- ⚠️ No input sanitization (add when backend exists)
- ⚠️ API_KEY exposed in browser (OK for Gemini, has rate limits)

### When Adding Backend
- ✅ Use environment variables for secrets
- ✅ Implement JWT authentication
- ✅ Sanitize all user inputs
- ✅ Use HTTPS in production
- ✅ Hash passwords with bcrypt
- ✅ Add CORS with specific origins

## 🎯 Next Development Steps

If you're building the backend:

1. **Set up backend folder**
   ```bash
   mkdir backend
   cd backend
   npm init -y
   npm install express cors pg jsonwebtoken bcrypt dotenv
   ```

2. **Create basic server**
   - See `backend/` examples in DEPLOYMENT.md
   - Endpoints: bookings, auth, products, stats

3. **Set up database**
   - Use Railway, Render, or local PostgreSQL
   - Create tables (see ARCHITECTURE.md)

4. **Connect frontend**
   - Update booking flow to call API
   - Add error handling
   - Replace hardcoded data with API calls

5. **Add Telegram bot**
   - Create bot via @BotFather
   - Build bot service (Python or Node.js)
   - Integrate with backend

## 🆘 Getting Help

1. **Check Documentation**: All guides are in repo root
2. **GitHub Issues**: Report bugs or ask questions
3. **Console Logs**: Enable debug mode in browser
4. **Stack Overflow**: Search for React/Vite/TypeScript issues

## 🎓 Useful Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [Railway Guides](https://docs.railway.app)

## 💡 Pro Tips

1. **Hot Module Replacement**: Vite auto-reloads on file changes
2. **TypeScript**: Follow existing patterns for type safety
3. **Components**: Keep them small and reusable
4. **State**: Use React hooks (useState, useEffect)
5. **Styling**: TailwindCSS classes are inline (no separate CSS files)
6. **API Calls**: Use async/await with try/catch
7. **Testing**: Test in multiple browsers before demo
8. **Performance**: Images from Unsplash are optimized with query params

---

**Happy Coding! 🚀**

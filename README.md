# Iron & Steel Barbershop 💈

A premium, brutalist-style barbershop web application featuring online booking, master profiles, service catalogs, an AI-powered style assistant, and admin management dashboard.

**Status**: ✅ Frontend Complete | ⚠️ Backend Not Implemented | 🎯 Demo-Ready

## 🎯 What This Is

This is a **modern barbershop management system** built for a fictional premium barbershop in Prague. It demonstrates:

- 🌐 **Customer-facing website** with booking, services, products, and AI style advisor
- 👨‍💼 **Admin dashboard** for managing bookings, viewing statistics, and bot activity
- 🤖 **Telegram bot integration** (UI ready, bot not implemented)
- 🎨 **AI-powered features** using Google Gemini (style recommendations, video analysis)

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ installed
- A Google Gemini API key ([Get one free](https://aistudio.google.com/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/akira777777/barber_auto.git
cd barber_auto

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY (or API_KEY)

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# The build output will be in the `dist` directory
```

### Vercel Deployment (Recommended)

Deploy to Vercel with Neon PostgreSQL database:

```bash
# See detailed deployment guide
cat VERCEL_NEON_DEPLOYMENT.md
```

**Quick Deploy to Vercel:**
1. Push your code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Set up [Neon database](https://neon.tech)
4. Add environment variables (see [VERCEL_NEON_DEPLOYMENT.md](./VERCEL_NEON_DEPLOYMENT.md))
5. Deploy!

### Docker Deployment

#### Option 1: Single Unified Container (Recommended)
Everything in one container - frontend, backend, nginx, and process manager:

```bash
# Build and run
docker compose -f docker-compose.unified.yml build
docker compose -f docker-compose.unified.yml up -d

# Access:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:3001
# - Database is separate container

# View logs
docker compose -f docker-compose.unified.yml logs -f app

# Stop
docker compose -f docker-compose.unified.yml down
```

See [DOCKER_UNIFIED.md](./DOCKER_UNIFIED.md) for detailed documentation.

#### Option 2: Separate Services (Original)
Frontend, backend, and database as separate containers:

```bash
# Build Docker image
docker build -t barber-auto .

# Run container
docker run -d -p 3000:80 barber-auto

# Visit http://localhost:3000
```

Or use compose:
```bash
docker compose up -d
```

## 🏗️ Current Architecture

**What Works**:
- ✅ Full React frontend with booking flow
- ✅ AI Style Assistant (with Gemini API)
- ✅ Product shop with cart
- ✅ Admin dashboard UI
- ✅ Responsive design (mobile, tablet, desktop)

**What's Missing**:
- ❌ Backend server (no API)
- ❌ Database (all data is hardcoded)
- ❌ Telegram bot (UI simulation only)
- ❌ Real authentication (toggle button)
- ❌ Payment processing

**Technology Stack**:
- React 19 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- Google Gemini AI
- Lucide Icons

## 📚 Documentation

Comprehensive documentation has been prepared for different audiences:

| Document | For Whom | What It Covers |
|----------|----------|----------------|
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Developers | Technical architecture, missing components, data flow |
| **[DEMO_GUIDE.md](./DEMO_GUIDE.md)** | Demo presenters | How to prepare and conduct client demos |
| **[TESTING.md](./TESTING.md)** | QA/Developers | Complete testing strategy and test cases |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | DevOps/Developers | General deployment strategies (Railway, Netlify, VPS) |
| **[VERCEL_NEON_DEPLOYMENT.md](./VERCEL_NEON_DEPLOYMENT.md)** | DevOps/Developers | **Vercel + Neon deployment guide** ⭐ |
| **[CLIENT_PRESENTATION.md](./CLIENT_PRESENTATION.md)** | Business owners | Non-technical explanation, ROI, value proposition |
| **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** | Everyone | Complete project overview and context |

## 🎬 Demo Scenario

Perfect for showing clients what a modern barbershop system looks like:

1. **Customer Journey**: Browse services → Book appointment → Get AI style advice → Shop products
2. **Admin Panel**: View bookings → Manage schedule → Monitor bot activity → Use AI tools
3. **Telegram Bot**: (Simulated) Notifications and customer communication

See [DEMO_GUIDE.md](./DEMO_GUIDE.md) for detailed demo walkthrough.

## 🚀 Deployment Options

### Option 1: Frontend Demo Only (Fastest)
Deploy to Vercel/Netlify as a marketing site. Keep phone bookings for now.
- **Time**: 15 minutes
- **Cost**: Free
- **Use Case**: Show UI/UX, gather feedback

### Option 2: Complete MVP (Recommended)
Build backend + database + Telegram bot for full functionality.
- **Time**: 2-3 weeks development
- **Cost**: $5-20/month hosting + development
- **Use Case**: Production-ready system

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 💡 Key Features

### For Customers
- **Online Booking**: 4-step process (service → barber → date/time → details)
- **AI Style Advisor**: Upload photo, get personalized haircut recommendations
- **Product Shop**: Browse and purchase professional grooming products
- **Barber Profiles**: See experience, specialties, choose your master

### For Business Owner
- **Dashboard**: View today's bookings, revenue, statistics
- **Bot Manager**: Monitor Telegram bot activity (simulated)
- **Video AI**: Analyze training videos, generate marketing content
- **Settings**: Manage services, prices, barbers

## 📊 Project Status

### Phase 1: Frontend (✅ Complete)
- UI/UX design
- Booking flow
- AI integration
- Admin dashboard

### Phase 2: Backend (❌ Not Started)
- Express/FastAPI server
- PostgreSQL database
- REST API endpoints
- Authentication

### Phase 3: Telegram Bot (❌ Not Started)
- Bot creation
- Notification system
- Customer commands
- Admin controls

### Phase 4: Deployment (❌ Not Started)
- Production hosting
- Domain + SSL
- Monitoring
- Backups

**Estimated Time to MVP**: 2-3 weeks (if starting Phase 2 today)

## 💰 Cost Estimation

### Development (One-Time)
- Backend API: 20-30 hours
- Telegram Bot: 10-15 hours
- Authentication: 5-8 hours
- Testing: 8-12 hours
- Deployment: 3-5 hours

**Total**: 45-70 development hours

### Hosting (Monthly)
- Frontend (Vercel/Netlify): Free - $20/mo
- Backend (Railway/Render): $5-20/mo
- Database: Included
- Domain: ~$1/mo ($12/year)

**Total**: $5-25/month

See [CLIENT_PRESENTATION.md](./CLIENT_PRESENTATION.md) for ROI analysis.

## 🧪 Testing

Run the manual test suite to verify all features:

```bash
# See TESTING.md for comprehensive test cases
# Test booking flow
# Test AI style assistant
# Test product cart
# Test admin dashboard
# Test responsive design
```

See [TESTING.md](./TESTING.md) for detailed test scenarios.

## 🤝 Contributing

This project is currently in demo/MVP stage. To contribute:

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand structure
2. Check [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for roadmap
3. Create feature branch: `git checkout -b feature/your-feature`
4. Submit PR with clear description

## 📄 License

This project is provided as-is for demonstration purposes.

## 📞 Support

For questions about:
- **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Demo**: See [DEMO_GUIDE.md](./DEMO_GUIDE.md)
- **Testing**: See [TESTING.md](./TESTING.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Business Case**: See [CLIENT_PRESENTATION.md](./CLIENT_PRESENTATION.md)

---

**🎯 Bottom Line**: This is a demo-ready frontend showcasing what a modern barbershop management system could be. To make it production-ready, backend development is required (2-3 weeks).

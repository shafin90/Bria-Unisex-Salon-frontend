# Bria Salon Frontend

A modern, responsive admin dashboard for Bria Unisex Salon management system built with React, Vite, Tailwind CSS, and GSAP.

## 🚀 Features

### 🎨 Modern UI/UX
- **Minimal & Consistent Design**: Clean, professional interface with consistent spacing and typography
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile
- **Smooth Animations**: GSAP-powered animations for enhanced user experience
- **Dark/Light Theme Ready**: Built with Tailwind CSS for easy theme customization

### 📊 Dashboard
- **Real-time Analytics**: Overview of bookings, services, users, and revenue
- **Quick Actions**: Easy access to common tasks
- **Recent Activity**: Latest bookings and top services
- **Performance Metrics**: Key business indicators

### ✂️ Services Management
- **Service Catalog**: Add, edit, and delete salon services
- **Category Management**: Organize services by gender (men/women)
- **Image Upload**: Support for service images with preview
- **Pricing Control**: Set and manage service prices
- **Popularity Tracking**: View most booked services

### 📅 Booking System
- **Appointment Overview**: View all customer bookings
- **Status Management**: Track booking status (today, upcoming, completed)
- **Customer Details**: Access customer information and booking history
- **Search & Filter**: Find bookings by name, phone, or date
- **WhatsApp Integration**: Automatic reminder system

### 🎁 Offers Management
- **Promotional Campaigns**: Create and manage special offers
- **Date-based Validity**: Set start and end dates for offers
- **Usage Limits**: Control offer redemption limits
- **Status Control**: Activate/deactivate offers
- **Visual Management**: Upload and manage offer images

### 👥 User Management
- **Customer Profiles**: View customer information and history
- **Loyalty Tiers**: VIP, Gold, Silver, Bronze customer classification
- **Spending Analytics**: Track customer spending and preferences
- **Booking History**: Complete customer booking records

### 🔐 Authentication
- **Secure Login**: Admin authentication system
- **Session Management**: Persistent login sessions
- **Protected Routes**: Secure access to admin features

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bria_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Backend API
Update the API base URL in the following files:
- `src/context/AuthContext.jsx`
- `src/pages/Dashboard/Dashboard.jsx`
- `src/pages/Services/Services.jsx`
- `src/pages/Bookings/Bookings.jsx`
- `src/pages/Offers/Offers.jsx`
- `src/pages/Users/Users.jsx`

Change `API_BASE_URL` from `http://localhost:8000` to your backend URL.

### Demo Credentials
- **Email**: admin@admin.com
- **Password**: 12345678

## 🎨 Design System

### Color Palette
- **Primary**: Blue tones (#0ea5e9)
- **Secondary**: Purple tones (#d946ef)
- **Accent**: Orange tones (#f97316)
- **Neutral**: Gray scale

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Consistent styling with hover states
- **Forms**: Clean input fields with focus states
- **Modals**: Centered overlays with smooth animations

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎭 Animations

- **Page Transitions**: Smooth fade-in effects
- **Card Animations**: Staggered entrance animations
- **Modal Animations**: Scale and fade effects
- **Hover Effects**: Subtle color and shadow transitions

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Other Platforms
The built files in the `dist` directory can be deployed to any static hosting service.

## 🔗 API Integration

The frontend integrates with the Bria Salon backend API:

### Endpoints Used
- `POST /adminLogin/adminLogin` - Admin authentication
- `GET /dashboard/getDashboardData` - Dashboard analytics
- `GET /service/getAllService` - Fetch services
- `POST /service/addService` - Create service
- `PUT /service/editService/:id` - Update service
- `DELETE /service/deleteService/:id` - Delete service
- `GET /booking/getAllBooking` - Fetch bookings
- `GET /offer/getAllOffer` - Fetch offers
- `POST /offer/addOffer` - Create offer
- `PUT /offer/editOffer/:id` - Update offer
- `GET /user/getFrequentlyUser` - Fetch users

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please contact the development team.

---

**Built with ❤️ for Bria Salon**
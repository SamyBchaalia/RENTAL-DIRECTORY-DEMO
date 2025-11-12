# 🚀 Quick Start Guide - Global Rental Directory

## ✅ Setup Complete

All dependencies are installed and the database is seeded with 10 sample rental businesses!

## 🎯 Start the Application (2 Steps)

### Step 1: Start Backend Server

Open Terminal 1:
```bash
cd "/Users/macbook/buisness directory/backend"
npm run start:dev
```

**Expected Output:**
```
Application is running on: http://localhost:5000
```

The backend API will be available at **http://localhost:5000**

### Step 2: Start Frontend

Open Terminal 2:
```bash
cd "/Users/macbook/buisness directory/frontend"
npm run dev
```

**Expected Output:**
```
Local: http://localhost:5173
```

## 🌐 Access the Application

### Client-Facing Directory
**URL:** http://localhost:5173

Features:
- Browse all rental businesses
- Search by keyword, category, location
- View detailed business information
- Add new businesses to the directory

### Admin Dashboard
**URL:** http://localhost:5173/admin

Features:
- View all businesses (active and inactive)
- See statistics dashboard
- Toggle business active/inactive status
- Toggle featured status
- Delete businesses
- Monitor all listings

## 📊 Sample Data

The database is pre-loaded with 10 rental businesses:

1. **Elite Car Rentals** - New York, USA (Vehicles) ⭐ Featured
2. **Prime Property Rentals** - Miami, USA (Properties) ⭐ Featured
3. **Construction Equipment Co** - Houston, USA (Equipment)
4. **Party Perfect Events** - Los Angeles, USA (Events) ⭐ Featured
5. **Adventure Sports Rentals** - Denver, USA (Recreation)
6. **Tech Gadget Rentals** - San Francisco, USA (Electronics)
7. **Urban Furniture Rentals** - Chicago, USA (Furniture)
8. **Pro Tool Rentals** - Phoenix, USA (Tools)
9. **London Luxury Motors** - London, UK (Vehicles) ⭐ Featured
10. **Sydney Beachside Properties** - Sydney, Australia (Properties) ⭐ Featured

## 🧪 Test the Features

### 1. Browse Businesses
- Visit http://localhost:5173
- Use the search bar to find businesses
- Filter by category (Vehicles, Properties, Equipment, etc.)
- Click on any business card to view details

### 2. Search Functionality
Try these searches:
- "car" - finds car rental businesses
- "London" - finds businesses in London
- "property" - finds property rentals

### 3. Add a Business
- Click "List Your Business" button
- Fill out the form
- Submit to add a new business to the directory

### 4. Admin Functions
- Visit http://localhost:5173/admin
- See all businesses and statistics
- Toggle active/inactive status
- Mark businesses as featured
- Delete businesses

## 🔌 API Endpoints (Backend on port 5000)

Test the API directly:

```bash
# Get all businesses
curl "http://localhost:5000/businesses"

# Search by category
curl "http://localhost:5000/businesses?category=vehicles"

# Search by location
curl "http://localhost:5000/businesses?city=New%20York"

# Get statistics
curl "http://localhost:5000/businesses/stats"

# Get categories
curl "http://localhost:5000/businesses/categories"

# Get a single business (replace {id} with actual UUID from database)
curl "http://localhost:5000/businesses/{id}"
```

## 🎨 Application Structure

### Frontend Routes (Client)
- `/` - Homepage with business listings
- `/business/:id` - Business detail page
- `/add` - Add new business form
- `/admin` - Admin dashboard

### Backend API Routes
- `GET /businesses` - List businesses with filters
- `GET /businesses/stats` - Get statistics
- `GET /businesses/categories` - Get categories
- `GET /businesses/locations` - Get locations
- `GET /businesses/:id` - Get single business
- `POST /businesses` - Create business
- `PATCH /businesses/:id` - Update business
- `DELETE /businesses/:id` - Delete business
- `PATCH /businesses/:id/toggle-active` - Toggle active status
- `PATCH /businesses/:id/toggle-featured` - Toggle featured status

## 🛠️ Troubleshooting

### Backend won't start
```bash
# Check if PostgreSQL is running
psql -h localhost -p 5432 -U postgres -d rental -c "SELECT 1"

# If connection fails, start PostgreSQL
# Check port 5000 is not in use
lsof -i :5000
```

### Frontend won't start
```bash
# Check port 5173 is not in use
lsof -i :5173

# Reinstall dependencies if needed
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Database is empty
```bash
cd backend
npm run seed
```

## 📱 Features Overview

### Client Features
✅ Search businesses by name, category, location
✅ Filter by 9 rental categories
✅ View detailed business information
✅ Contact information display
✅ Rating and review counts
✅ Featured business highlights
✅ Responsive mobile design
✅ Add new businesses

### Admin Features
✅ Dashboard with statistics
✅ View all businesses (active/inactive)
✅ Toggle active/inactive status
✅ Toggle featured status
✅ Delete businesses
✅ Real-time updates

## 🔐 Database Access

**Connection Details:**
- Host: localhost:5432
- Database: rental
- User: postgres
- Password: postgres

**Access via psql:**
```bash
psql -h localhost -p 5432 -U postgres -d rental
```

**View businesses:**
```sql
SELECT id, name, city, country, category, "isActive", "isFeatured"
FROM businesses;
```

## 📚 Next Steps

1. ✅ Both servers running
2. ✅ Test client directory (browse, search, view details)
3. ✅ Test admin dashboard (manage businesses)
4. ✅ Add a test business via the form
5. ✅ Test API endpoints with curl

## 🎉 You're All Set!

The Global Rental Directory MVP is ready for demonstration.

**Client View:** Browse and search rental businesses
**Admin View:** Manage all business listings

Both frontends are accessible from the same app at http://localhost:5173
- Client routes: `/`, `/business/:id`, `/add`
- Admin route: `/admin`

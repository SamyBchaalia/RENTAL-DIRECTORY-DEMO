# 📚 Swagger API Documentation Guide

## ✅ Swagger Fully Configured

The Global Rental Directory API now has complete Swagger/OpenAPI documentation with interactive testing capabilities.

## 🌐 Access Swagger UI

Once the backend is running:

**Swagger Documentation:** http://localhost:5000/api/docs

## 🚀 Quick Start

### 1. Start Backend Server
```bash
cd "/Users/macbook/buisness directory/backend"
npm run start:dev
```

### 2. Open Swagger UI
Navigate to: **http://localhost:5000/api/docs**

## 📋 What's Documented

### All 10 API Endpoints

1. **POST /api/businesses** - Create new business
2. **GET /api/businesses** - List all businesses (with filters)
3. **GET /api/businesses/stats** - Get statistics
4. **GET /api/businesses/categories** - Get categories
5. **GET /api/businesses/locations** - Get locations
6. **GET /api/businesses/{id}** - Get single business
7. **PATCH /api/businesses/{id}** - Update business
8. **PATCH /api/businesses/{id}/toggle-active** - Toggle active status
9. **PATCH /api/businesses/{id}/toggle-featured** - Toggle featured status
10. **DELETE /api/businesses/{id}** - Delete business

### Complete Documentation Includes

✅ **Endpoint Descriptions** - Clear summary and detailed description
✅ **Request Parameters** - All query params, path params, body params
✅ **Request Body Schemas** - Full DTO documentation with examples
✅ **Response Schemas** - Expected response structures
✅ **HTTP Status Codes** - 200, 201, 400, 404 with descriptions
✅ **Data Types** - Proper typing for all fields
✅ **Validation Rules** - Min/max lengths, required fields, formats
✅ **Examples** - Sample request/response data
✅ **Enums** - BusinessCategory enum values
✅ **Try It Out** - Interactive API testing

## 🎯 Features

### Interactive Testing
- **Try It Out Button** - Test endpoints directly from browser
- **Execute Button** - Send real requests to the API
- **Response Display** - See actual API responses
- **CURL Commands** - Get ready-to-use curl commands
- **Request URL** - See the exact endpoint being called

### Schema Documentation
- **Model Schemas** - View all DTOs (CreateBusinessDto, UpdateBusinessDto, SearchBusinessDto)
- **Property Details** - See type, format, constraints for each field
- **Example Values** - Sample data for each field
- **Required Fields** - Clearly marked required vs optional

### Query Parameters
All search and filter options documented:
- `query` - Full-text search
- `category` - Filter by category (enum)
- `city`, `state`, `country` - Location filters
- `isActive`, `isFeatured` - Status filters
- `page`, `limit` - Pagination
- `sortBy`, `sortOrder` - Sorting options

## 📝 API Changes

### Global API Prefix
All endpoints now have the `/api` prefix:
- Before: `http://localhost:5000/businesses`
- After: `http://localhost:5000/api/businesses`

### Frontend Updated
The frontend has been updated to use:
- Environment variable: `VITE_API_BASE_URL`
- Default: `http://localhost:5000/api`
- Configured in `.env` file

## 🧪 Testing with Swagger

### Example: Create a Business

1. Navigate to http://localhost:5000/api/docs
2. Find **POST /api/businesses**
3. Click **"Try it out"**
4. Edit the request body:
```json
{
  "name": "Test Yacht Rentals",
  "description": "Premium yacht rental service for special occasions",
  "category": "vehicles",
  "email": "info@testyachts.com",
  "phone": "+1-555-1234",
  "address": "123 Marina Drive",
  "city": "Miami",
  "state": "FL",
  "country": "United States",
  "zipCode": "33139",
  "rentalItems": ["Luxury Yachts", "Speedboats"],
  "amenities": ["Captain Included", "Catering"]
}
```
5. Click **"Execute"**
6. See the response with the newly created business

### Example: Search Businesses

1. Find **GET /api/businesses**
2. Click **"Try it out"**
3. Fill in query parameters:
   - `category`: `vehicles`
   - `city`: `New York`
   - `isActive`: `true`
   - `limit`: `10`
4. Click **"Execute"**
5. See filtered results

### Example: Get Statistics

1. Find **GET /api/businesses/stats**
2. Click **"Try it out"**
3. Click **"Execute"**
4. See statistics:
```json
{
  "total": 10,
  "active": 10,
  "inactive": 0,
  "featured": 4,
  "byCategory": [...]
}
```

## 📊 Request Body Schemas

### CreateBusinessDto

**Required Fields:**
- `name` (string, 2-255 chars)
- `description` (string, min 10 chars)
- `category` (enum: vehicles, properties, equipment, events, recreation, electronics, furniture, tools, other)
- `email` (valid email format)
- `address` (string, min 5 chars)
- `city` (string, 2-100 chars)
- `country` (string, 2-100 chars)

**Optional Fields:**
- `website` (valid URL)
- `phone` (string, max 20 chars)
- `state` (string, max 100 chars)
- `zipCode` (string, max 20 chars)
- `latitude` (number, -90 to 90)
- `longitude` (number, -180 to 180)
- `rentalItems` (array of strings)
- `amenities` (array of strings)
- `images` (array of URLs)
- `logo` (URL)
- `operatingHours` (object with day: hours)
- `rating` (number, 0-5)
- `reviewCount` (number, min 0)
- `isActive` (boolean, default: true)
- `isFeatured` (boolean, default: false)
- `metadata` (object)

### SearchBusinessDto

**All Optional Query Parameters:**
- `query` - Search term (string)
- `category` - Category filter (enum)
- `city` - City filter (string)
- `state` - State filter (string)
- `country` - Country filter (string)
- `isActive` - Active status (boolean)
- `isFeatured` - Featured status (boolean)
- `page` - Page number (number, default: 1)
- `limit` - Items per page (number, default: 12)
- `sortBy` - Sort field (string, default: 'createdAt')
- `sortOrder` - Sort direction (enum: 'ASC', 'DESC', default: 'DESC')

## 🔧 Swagger Configuration

Located in `backend/src/main.ts`:

```typescript
const config = new DocumentBuilder()
  .setTitle('Global Rental Directory API')
  .setDescription('RESTful API for managing rental businesses worldwide')
  .setVersion('1.0')
  .addTag('businesses', 'Business directory operations')
  .addServer('http://localhost:5000', 'Local development server')
  .setContact('Sami Benchaalia', 'https://sami.benchaalia.com', 'contact@sami.benchaalia.com')
  .setLicense('MIT', 'https://opensource.org/licenses/MIT')
  .build();
```

## 🎨 UI Customization

Swagger UI includes:
- ✅ Custom title: "Global Rental Directory API Docs"
- ✅ NestJS favicon
- ✅ Hidden top bar for clean look
- ✅ Grouped endpoints by tag
- ✅ Color-coded HTTP methods (GET, POST, PATCH, DELETE)

## 📤 Export Options

### Get OpenAPI JSON
**URL:** http://localhost:5000/api/docs-json

Use this to:
- Import into Postman
- Generate client SDKs
- Share with frontend team
- Generate documentation in other formats

### Get OpenAPI YAML
The JSON can be converted to YAML for:
- Documentation generators
- API gateways
- Version control

## 🚀 CURL Examples from Swagger

Swagger generates ready-to-use CURL commands:

### Create Business
```bash
curl -X 'POST' \
  'http://localhost:5000/api/businesses' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "Premium Car Rentals",
  "description": "Luxury car rental service",
  "category": "vehicles",
  "email": "contact@premiumcars.com",
  "address": "123 Main St",
  "city": "New York",
  "country": "United States"
}'
```

### Get All Businesses
```bash
curl -X 'GET' \
  'http://localhost:5000/api/businesses?page=1&limit=10&isActive=true' \
  -H 'accept: */*'
```

### Get Statistics
```bash
curl -X 'GET' \
  'http://localhost:5000/api/businesses/stats' \
  -H 'accept: */*'
```

## 🔒 Future Enhancements

Ready to add when needed:
- [ ] **Authentication** - JWT bearer tokens in Swagger UI
- [ ] **Authorization** - Role-based access control documentation
- [ ] **Rate Limiting** - Document rate limit headers
- [ ] **Webhooks** - Document webhook endpoints
- [ ] **File Upload** - Document image upload endpoints
- [ ] **Versioning** - API version headers

## 📱 Postman Integration

### Import from Swagger
1. Copy OpenAPI JSON: http://localhost:5000/api/docs-json
2. Open Postman
3. Import → Paste Raw Text
4. Select OpenAPI 3.0
5. Import complete collection

## 🎓 Best Practices Implemented

✅ **Clear Descriptions** - Every endpoint has summary and detailed description
✅ **Examples** - All DTOs include example values
✅ **Validation** - Constraints clearly documented
✅ **Status Codes** - All possible responses documented
✅ **Enums** - All enum values listed
✅ **Nested Objects** - Complex types fully documented
✅ **Arrays** - Array item types specified
✅ **Optional Fields** - Clearly marked with `@ApiPropertyOptional`
✅ **Deprecation** - Can mark deprecated endpoints (when needed)

## 🎉 Summary

All API endpoints are now fully documented with:
- ✅ Interactive Swagger UI at http://localhost:5000/api/docs
- ✅ Complete request/response schemas
- ✅ Try-it-out functionality
- ✅ CURL command generation
- ✅ OpenAPI 3.0 JSON export
- ✅ Frontend updated to use /api prefix
- ✅ Environment variables for API URL

The API is now production-ready with enterprise-grade documentation!

# 🏡 HomeStay

**HomeStay** is a full-stack web application that allows users to explore, create, and manage unique stay listings around the world.This project enables users to discover accommodations, share their own properties, and interact through reviews and bookings.

---

## 🚀 Features

* 🔐 **User Authentication**

  * Sign up, login, and logout functionality
  * Secure authentication using Passport.js

* 🏘 **Listing Management**

  * Create, edit, and delete listings
  * Upload images using Cloudinary
  * Categorize listings (Camping, Castles, Trending, etc.)

* 🌍 **Location Mapping**

  * Interactive maps using Leaflet
  * Automatic geolocation based on user input (location + country)

* ⭐ **Reviews System**

  * Users can add and delete reviews
  * Ratings system (1–5 stars)

* ❤️ **Modern UI/UX**

  * Responsive design with Bootstrap
  * Clean and user-friendly interface

---

## 🛠 Tech Stack

### Frontend

* HTML
* CSS
* Bootstrap
* JavaScript
* EJS (Embedded JavaScript Templates)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Atlas)

### Other Tools & Services

* Cloudinary (Image Uploads)
* Passport.js (Authentication)
* Leaflet.js (Maps)
* Joi (Validation)
* Multer (File Uploads)

---

## 📂 Project Structure

```
HomeStay/
│── models/          # Database schemas
│── routes/          # Express routes
│── controllers/     # Business logic
│── views/           # EJS templates
│── public/          # Static files (CSS, JS)
│── utils/           # Middleware & helpers
│── init/            # Database seeding
│── app.js           # Main server file
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/homestay.git
cd homestay
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

```env
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_key
CLOUD_API_SECRET=your_secret

ATLAS_DB_URL=your_mongodb_url
SECRET=your_session_secret
MAPBOX_TOKEN=your_mapbox_token
```

4. **Run the project**

```bash
npm run dev
```

5. Open in browser:

```
http://localhost:8080
```

---

## 📸 Screenshots

* Home page with listings
* Listing details with map
* Create new listing form
* User authentication pages





## 👨‍💻 Author

**Monish Kumar Shah**

---

## 📄 License

This project is for learning and demonstration purposes.

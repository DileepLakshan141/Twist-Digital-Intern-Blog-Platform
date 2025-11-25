## Setup Instructions

### **Backend**

1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```
2. Create a .env file in the backend root with the following variables:
   ```PORT=4000
   ENVIRONMENT=development
   MONGO_DB_URI=<MongoDB Atlas connection string>
   ACCESS_TOKEN_SECRET=<JWT secret>
   ```
3. Run the backend server:
   ```
   npm run dev
   ```

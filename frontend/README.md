## Setup Instructions

### **Frontend**

1. Navigate to the frontend directory:

   ```
   cd frontend
   npm install

   ```

2. Create a Cloudinary account and set up a new preset:

   ```
   Name: blog_uploads
   Mark as unsigned
   Allowed file types: .png , .jpg , .webp

   ```

3. Create a .env file in the frontend root:

   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your Cloudinary public cloud name>

   ```

4. Run the frontend development server:
   ```
   npm run dev
   ```

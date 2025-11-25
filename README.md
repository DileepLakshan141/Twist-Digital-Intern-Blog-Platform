# Blogr - Personal Blog Platform

[![Blogr](https://img.shields.io/badge/Blogr-Lightweight%20Blogging%20Platform-blue)](https://documenter.getpostman.com/view/25158331/2sB3dHXDuD)

## Project Overview

**Blogr** is a lightweight blogging platform where users can create accounts, write and manage blogs, like and comment on posts. Reading blogs does not require signing in, providing an open browsing experience for all visitors. The platform is designed with a clean, responsive UI for a seamless experience on both desktop and mobile devices.

---

## Features

### **User Management**

- User registration and login (JWT-based authentication) ✅
- Basic user profiles with username and avatar
  - Default avatar assigned at signup
  - Users can later update their avatar from the profile page

### **Blog Management**

- Full CRUD operations for blog posts (Create, Read, Update, Delete) ✅
- Each blog post includes:
  - Title ✅
  - Content (rich text support using Tiptap) ✅
  - Cover image (Cloudinary storage; default placeholder if none provided) ✅
  - Creation date (handled via Mongoose timestamps) ✅
  - Author information (MongoDB reference and population) ✅

### **Interactive Features**

- Users can like posts ✅
- Commenting system ✅
- Homepage feed displays the 6 most recent posts ✅

### **Optional / Bonus Features Implemented**

- Image upload for blog posts using Cloudinary ✅
- Rich text editor for content (Tiptap) ✅
- Responsive UI using Shadcn + TailwindCSS ✅

---

## Technology Stack

- **Frontend:** Next.js, React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Rich Text Editor:** Tiptap

---

## Folder Structure

### **Backend**

backend/
├─ config/
├─ controllers/
├─ middleware/
├─ models/
├─ routes/
├─ utils/
└─ app.js

### **Frontend**

frontend/
├─ actions/
├─ app/
├─ axios/
├─ components/
├─ hooks/
├─ lib/
├─ public/
├─ schemas/
├─ types/
└─ utils/

---

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

## API Documentation

The API is fully documented and publicly available on Postman:
https://documenter.getpostman.com/view/25158331/2sB3dHXDuD

## Notes / Approach

1. Backend is structured with routes, controllers, models, and middleware following standard REST API practices.

2. JWT authentication protects create, update, and delete routes.

3. Rich text editing is implemented using Tiptap for enhanced blog content.

4. Cloudinary handles blog cover image storage with a default placeholder for posts without images. (image upload is optional by default placeholder assigned if no upload)

5. Responsive UI built with Shadcn + TailwindCSS ensures professional look and usability on all devices.

6. Focused on clean code, proper error handling, and clear separation of concerns for maintainability.

## Feature Checklist

| Feature                          | Status |
| -------------------------------- | ------ |
| User Registration                | ✅     |
| User Login                       | ✅     |
| User Profile (avatar + username) | ✅     |
| Blog Create                      | ✅     |
| Blog Read (all + single)         | ✅     |
| Blog Update                      | ✅     |
| Blog Delete                      | ✅     |
| Blog Likes                       | ✅     |
| Comments                         | ✅     |
| Homepage feed (recent 6 posts)   | ✅     |
| Rich Text Editor (Tiptap)        | ✅     |
| Cover Image Upload (Cloudinary)  | ✅     |
| Responsive UI                    | ✅     |

## Screenshots

1. Home Page
<img width="1920" height="1047" alt="home-p1" src="https://github.com/user-attachments/assets/8ea26582-33f8-4180-ad44-afad02b5d55b" />

<img width="1920" height="1039" alt="home-p2" src="https://github.com/user-attachments/assets/3c18963d-85d9-4f9e-8222-b9c3e20656d1" />

2. All Blogs(including search)

<img width="1920" height="1080" alt="all-blogs" src="https://github.com/user-attachments/assets/9aaab4c9-9f55-4038-80a5-08084e91305b" />

3. Read Blog

<img width="1920" height="1042" alt="read-blog-p1" src="https://github.com/user-attachments/assets/2ce04b43-7072-4191-acd3-9a93c991f411" />

<img width="1920" height="1042" alt="read-blog-p2" src="https://github.com/user-attachments/assets/cb3aa96a-5a83-4e31-b90c-81731df78a2a" />

4. Create Blog

<img width="1920" height="1080" alt="create blog" src="https://github.com/user-attachments/assets/c3b4dc1c-a468-4c53-b36f-693a7f437222" />

5. My Blogs
   
<img width="1920" height="1044" alt="my-blogs" src="https://github.com/user-attachments/assets/f6f8ab50-fa8f-4902-92a8-ad111d3ff8d9" />

7. Update Blogs
   
<img width="1920" height="1042" alt="update-p1" src="https://github.com/user-attachments/assets/4bfff23c-e23a-4858-995b-8382173ef3e7" />

<img width="1920" height="1042" alt="update-p2" src="https://github.com/user-attachments/assets/275890c7-6c85-4e77-b06b-b8c886e66bd1" />

8. Delete Blog Confirmation
<img width="1920" height="1039" alt="delete-blog" src="https://github.com/user-attachments/assets/9d0da2ad-111a-4c1d-984a-727f71a0db38" />

9. Profile Page
<img width="1920" height="1026" alt="profile" src="https://github.com/user-attachments/assets/536746ea-b0ca-4fb4-a210-27d7f59e135e" />

10. Sign in
<img width="1920" height="1042" alt="sign-in" src="https://github.com/user-attachments/assets/d998f33e-816d-458f-85e3-3eb020845d95" />

11. Sign Up
<img width="1920" height="1044" alt="sign-up" src="https://github.com/user-attachments/assets/1461c867-b5ef-4226-8f87-d84ccc71fb5e" />





# 🌿 Open Library

🔗 **Live Site URL**: [https://openlibrary-31653.web.app/](https://openlibrary-31653.web.app/)

---

## 📋 Project Description

**Open Library ** is a full-stack gardening tips platform where users can explore books, borrow books, connect with others. The site supports authentication, CRUD functionalities, filtering, and user-specific experiences. Built with React, Firebase, Tailwind CSS, and MongoDB.

---

## ✨ Features

- 🔐 **Authentication System**

  - Email/password and Google login with Firebase.
  - Protected routes: All Books , Add Books, Borrowed Books.
  - Password validation on registration (6+ chars, uppercase, lowercase)
  - Displays user photo and name upon login, with logout on click.

- 🔐 \*\* Follow this

  - Sometimes you need to refresh a few times to show the user photo
  - Alert will be show if password criteria isn't met

- 🏠 **Home Page**

  - slider/banner with 3+ slides using react-slick.
  - Hero section with an input field.
  - Top Visited Categories (shows 4 categories) .
  - Two additional Welcome and NewsLetter Section is Added.
  - hover effect is added to categories section using framer motion

- 🧑‍🌾 **All Books page (Private Route)**

  - Shows all books and each book includes an update button.
  - clicking the update button will take you to the edit page
  - a button to show available books
  - a select menu to toggle view

** Edit Book ** (Private Route)

- prefield image , name, author, category, rating and a submit button
- it's protected and after submitting user is authorized with the access token
- Show toast alert on successfully editing a book
- user need to be authorized to edit books

- 📁 **Add Book (Private Route)**

  - a protected route where user can add field
  - field need to be validated .
  - upon error toast will be shown
  - upon successfully add book user will be redirected
  - user need to be authorized to add books

- 🔍 **Borrowed Books(Private Route)**

  - protected page
  - user borrowed books are shown
  - a button to return book
  - user need to be authorized to return books

- ** Additional \***
- dynamic title throughout the page
- added 404 page and a custom error page on route errors
- spinner is shown in every data loads
- toast is show for all kind of operations

- ** challenge **
- filter functionality is added to the all books page
- toggle view functionality is added to all books page
- authentication with firebase access token sdk is added. not with jwt token

- 💬 **Toast/SweetAlert**

  - User feedback for success or error messages during login, register, CRUD operations.

## 🔧 Tech Stack

- React + React Router
- Firebase Authentication
- Express.js & MongoDB (Backend)
- Tailwind CSS, axios
- React Slick, Lottie React
- React Awesome Reveal, Framer Motion
- React flexible start rating
- React icons
- React Modern Drawer
- React Simple Typewriter
- React Spinners
- React toastify

---

## 📷 Navbar Overview

- Logo on the left , links in the middle and user profile or login/logout button on the right
- User’s Photo shown after login; clicking shows Logout ; hover shows displayName
- Responsive, mobile-friendly design

---

## 📞 Footer Overview

- Includes Contact Info, Terms & Conditions, Social Media Links
- Matches site's color scheme and font

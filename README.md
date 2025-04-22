# Postify: Redux CRUD App

**Postify** is a modern React demo app that showcases architecture using **Redux Toolkit**, **Redux-Saga**, and **Material UI (MUI)**. It simulates a user-centric content posting interface powered by the free and open [JSONPlaceholder API](https://jsonplaceholder.typicode.com).

---

## 🚀 Tech Stack

- ⚛️ React 19 – Core UI library
- 🌐 React Router v7 – Client-side routing
- 📦 Redux Toolkit v2 – Centralized state management
- 🔄 Redux-Saga v1 – Asynchronous side-effect handling
- 🎨 Material UI v7 (MUI Core + Icons + X Data Grid) – Component library for responsive UI
- 🧪 JSONPlaceholder API – Free REST API for simulating backend

---

## 🗂️ Folder Structure

```txt
/src
│
├── components/               # Reusable UI elements
│   ├── Footer.jsx
│   ├── GuestRoute.jsx
│   ├── Navbar.jsx
│   ├── PostForm.jsx
│   └── ProtectedRoute.jsx
│
├── pages/                    # Route-driven pages
│   ├── LoginPage.jsx
│   ├── MyPostsPage.jsx
│   ├── MyProfilePage.jsx
│   ├── PostDetailsPage.jsx
│   └── PostsPage.jsx
│
├── reducers/                 # Redux slices
│   ├── auth.reducer.js
│   ├── comment.reducer.js
│   ├── post.reducer.js
│   └── index.js              # Combines all reducers
│
├── sagas/                    # Redux saga workers & watchers
│   ├── auth.saga.js
│   ├── comment.saga.js
│   ├── post.saga.js
│   └── index.js              # Root saga
│
├── selectors/                # Redux selectors
│   ├── auth.selector.js
│   ├── comment.selector.js
│   └── post.selector.js
│
├── theme/
│   └── theme.js              # Custom MUI theme setup
│
├── utils/
│   ├── postUtils.js          # Custom reusable helpers
│   └── store.js              # Redux store configuration
│
├── App.jsx                   # App entry with routes
└── main.jsx                  
```

# 🔁 Key Workflows

### 🔐 Login Flow

- Accepts any email from `/users` API with fixed password `"1234"`
- Only authenticated user's full data is stored as `auth.currentUser`
- Other users’ public metadata (name/email) is fetched separately and stored in `auth.userMeta`
- On refresh, `currentUser` is read from `localStorage` for persistent auth state

---

### 📄 Post Management

- All posts fetched from `/posts`
- Comments fetched from `/posts/:id/comments`
- Posts are enriched with user name & email using `userMeta`
- "My Posts" page filters posts by `currentUser.id`

#### Supported Actions:

- 📝 Create new posts
- ✏️ Edit own posts
- ❌ Delete own posts

---

### 🧑 Profile Management

- Accordion-based profile layout with three sections:
  - Account
  - Address
  - Company
- Fully editable using MUI `<Accordion>` and `<TextField>`
- Snackbar feedback for simulated update actions

---
# ScreenShots
### Login Page
<img width="1434" alt="login-min" src="https://github.com/user-attachments/assets/9a4e5410-4ebe-4bb8-9036-9e9dab82bf89" />

### All Post Page
<img width="1433" alt="allpost-min" src="https://github.com/user-attachments/assets/92e61afc-a6d9-4d47-bcf8-9a8de62210ef" />

### Post Detail Page
<img width="1437" alt="postdetails-min" src="https://github.com/user-attachments/assets/61772498-d5ae-462a-87b1-2d93f4fc6c81" />

### My Post Page
<img width="1430" alt="mypost-min" src="https://github.com/user-attachments/assets/de9bb31e-e0f0-4b0c-98f6-64838838e340" />

### My Profile Page
<img width="1430" alt="profile-min" src="https://github.com/user-attachments/assets/0bae5bf2-79fd-4943-b916-8770e05c3ca0" />

---

# 🧪 Testing & Setup

### ⚙️ Setup Locally

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```


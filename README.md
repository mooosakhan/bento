# 🎨 BentoBuilder - Full-Stack Portfolio Builder

BentoBuilder is a full-stack, drag-and-drop portfolio builder that helps you create beautiful, professional-looking "link-in-bio" pages. It features a Next.js frontend, an Express.js backend, and a MongoDB database.

## ✨ Features

- **Drag & Drop Interface**: Intuitive block-based builder with @dnd-kit
- **6 Block Types**: Header, Link, Gallery, Card, Divider, and Social Row
- **Avatar Picker**: Professional avatar selection with upload, URL, and preset options
- **Real-time Preview**: Toggle between mobile and desktop views
- **Auto-save**: Changes automatically saved to localStorage
- **Undo/Redo**: Full history tracking for all edits
- **User Authentication**: Secure user registration and login with JWT
- **Public Profiles**: Share your profile at `/u/[handle]`
- **RESTful API**: A fully documented Express.js API for managing user profiles

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **Frontend** | |
| Next.js 14 | React framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| @dnd-kit | Drag and drop |
| lucide-react | Icons |
| localStorage | Persistence |
| **Backend** | |
| Express.js | Node.js framework |
| MongoDB | NoSQL database |
| JWT | Authentication |
| Zod | Runtime type validation |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm
- MongoDB instance (local or remote)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/bentobuilder.git
cd bentobuilder
```

2. **Backend Setup:**

```bash
cd backend
npm install
cp .env.example .env
```

Update your `.env` file with your MongoDB connection string and JWT secret:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Then, run the backend server:

```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`.

3. **Frontend Setup:**

In a new terminal, navigate to the frontend directory:

```bash
cd frontend
npm install
```

Then, run the frontend development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`. You'll be automatically redirected to the builder at `/builder`.

## 📁 Project Structure

```
.
├── backend/ # Express.js API
│ ├── src/
│ ├── package.json
│ └── README.md
└── frontend/ # Next.js App
├── app/
├── components/
├── readme/
└── package.json
```

## 📝 API Documentation

The backend API is documented in `backend/README.md`. It includes details on all available endpoints, request/response formats, and example cURL commands.

## 🤝 Contributing

This is an MVP project. Feel free to fork and extend it! Some ideas:

- Add more block types
- Improve mobile responsiveness
- Add animations
- Create themes/templates
- Add a testing suite

## 📄 License

MIT License - feel free to use this project however you'd like!

# Ridorhs Motion

A dynamic, immersive portfolio website built for showcasing video editing, motion graphics, and creative works. This project features smooth scrolling, 3D elements, and a secure admin dashboard to manage portfolio content dynamically.

## 🚀 Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/)
- **3D Graphics:** [Three.js](https://threejs.org/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Sliders/Carousels:** [Swiper](https://swiperjs.com/)
- **Database / API:** [JSONBin.io](https://jsonbin.io/) (for remote video management)

## ✨ Features

- **Stunning UI/UX:** Built with high-performance animations using GSAP and Framer Motion.
- **Smooth Scrolling:** Integrated Lenis to provide a seamless and fluid scroll experience.
- **Admin Portal (`/admin`):** A secure, SHA-256 password-protected dashboard to add and remove video portfolio entries dynamically.
- **Live Database Connection:** Uses JSONBin.io to fetch and update portfolio videos instantly without re-deploying the app.
- **Responsive Design:** Optimized across all devices using Tailwind CSS.

## 📦 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- `npm` or `yarn`

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd Ridorhs_motion
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   ```

### 🔐 Environment Variables

To fully use the `/admin` page and fetch portfolio data, you need to set up a free database on [JSONBin.io](https://jsonbin.io/) and provide the required environment variables. 

Create a `.env` file in the root directory and add the following:

```env
VITE_JSONBIN_BIN_ID=your_jsonbin_bin_id
VITE_JSONBIN_API_KEY=your_jsonbin_api_key
```

*(Note: The admin dashboard uses a pre-hashed SHA-256 password configured in `src/pages/Admin.jsx`)*

### 💻 Development

Start the local Vite development server:

```bash
npm run dev
```
The app will be accessible at `http://localhost:5173`.

### 🏗️ Building for Production

Compile the application for production deployment:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

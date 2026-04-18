# Restaurant Manager Dashboard

A responsive admin dashboard for managing restaurant listings. Built as a technical assessment focusing on clean architecture, intuitive UX, and robust global state management.

🔗 **Live Demo:** [https://restaurant-manager-iota.vercel.app/]

<img width="1899" height="872" alt="Screenshot 2026-04-18 105826" src="https://github.com/user-attachments/assets/f0b1fa37-e383-4b27-9163-a9f311e2bbef" />


---

## ✨ Features Implemented

### Core Requirements
- **Interactive Dashboard:** Grid-based showcase of featured restaurants.
- **Listing Page:** Full directory of restaurants with client-side filtering by name and category type.
- **Create Restaurant Flow:** Comprehensive form handling with strict validation and required fields.
- **Details View:** Dedicated dynamic routes (`/restaurant/[slug]`) showcasing full metadata, location, and contact details.

### Bonus Features Achieved
- **Local Storage Persistence:** Engineered via Zustand's `persist` middleware to ensure data survives page refreshes without a backend database.
- **Debounced Search:** Implemented a 300ms debounce on the search input to optimize render cycles and mimic production-grade API handling.
- **Pagination:** Client-side pagination limiting the listing view to 6 items per page for cleaner UI scaling.
- **Confirmation Modals:** Integrated an accessible Alert Dialog for the deletion flow to prevent accidental data loss.

---

##  Tech Stack & Architecture

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) + Radix Primitives for ARIA compliance.
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) (Lightweight, hook-based global state).
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) (For performant, uncontrolled form validation).
- **Icons & Toasts:** Lucide React & React Hot Toast.

### Design Philosophy
The application utilizes a high-contrast "Dark Mode". Because this is an administrative tool meant for prolonged internal use, dark mode reduces eye strain and provides a more premium software feel compared to consumer-facing white backgrounds.

---

## 🚦 Running Locally
**1. Clone the repository**
```bash
git clone https://github.com/edgecutioninst/restaurant-manager.git
cd restaurant-manager
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

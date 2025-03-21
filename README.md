# React + Vite
- Consuming this [backend](https://github.com/sonzay281/property-management-spring)
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Contribution guidelines 

Welcome to our frontend project! 🚀 This guide will help you contribute efficiently by following the correct project structure and coding standards.  

## 📂 Project Structure  

Here's how our folders are organized and what should go in each:  

```
│── public/  
│   ├── assets/         # Static assets (images, fonts, icons)  
│── src/  
│   ├── api/            # API calls using Axios (fetch requests go here)  
│   ├── components/     # Reusable UI components (pure components only)  
│   │   ├── Button/  
│   │   ├── Navbar/  
│   │   ├── PropertyCard/  
│   ├── hooks/          # Custom React hooks  
│   ├── layouts/        # Layout components (e.g., dashboard layout, authentication layout)  
│   ├── pages/          # Route-specific pages (each page has its own folder)  
│   ├── store/          # Redux state management  
│   │   ├── slices/     # Redux slices for state management  
│   │   ├── actions/    # Redux actions  
│   │   ├── reducers/   # Redux reducers  
│   │   ├── selectors/  # Redux selectors  
│   ├── utils/          # Helper functions and utilities  
│   ├── styles/         # Global SCSS styles  
│   ├── routes/         # React Router configuration  
│── .env                # Environment variables (API keys, secrets)  
│── .gitignore          # Files to be ignored in Git  
│── package.json        # Dependencies and scripts  
│── README.md           # Project documentation  
```

## 📦 Libraries & When to Use Them  

We use the following libraries in our project:  

- **Material UI**: For UI components (buttons, modals, forms, typography, etc.). Use it to maintain consistency in design.  
- **React Icons**: For scalable icons. Use them when you need icons in components.  
- **Sass (SCSS)**: For styling. Use SCSS files inside the `styles/` folder or component-specific stylesheets.  
- **React Redux & Redux Toolkit**: For state management. Place slices, actions, reducers, and selectors inside the `store/` folder.  
- **React Router**: For navigation. Define routes inside the `routes/` folder.  
- **Axios**: For API calls. All API requests should be handled inside the `api/` folder.  

## 📌 Contribution Best Practices  

### 1️⃣ **Follow Folder Structure**  
Make sure files are placed in their appropriate folders as per the structure above.  

### 2️⃣ **Use Functional Components**  
Always use functional components with React Hooks. Avoid class-based components.  

### 3️⃣ **State Management**  
- Use **Redux Toolkit** for global state management.  
- Local component states (`useState`) should be used only when global state is unnecessary.  

### 4️⃣ **Styling**  
- Use **Material UI styles** or **SCSS modules** for styling components.  
- Keep styles modular and avoid inline styles unless necessary.  

### 5️⃣ **API Calls**  
- Use **Axios** for making API calls.  
- Keep all API request functions inside the `api/` folder.  
- Avoid calling APIs directly inside components.  

### 6️⃣ **Routing**  
- Use **React Router** for navigation.  
- Define route configurations inside the `routes/` folder.  

### 7️⃣ **Reusable Components**  
- Place reusable UI components (e.g., buttons, cards, modals) inside the `components/` folder.  
- Components should be **pure** and not contain business logic.  

---

## 🛠 How to Contribute  

1. **Clone the repository** and create a new feature branch(name-initials-task E.g hk-update-readme).  
2. **Follow the folder structure** and place files in the correct locations.  
3. **Write clean, maintainable code** following the best practices above.  
4. **Test your changes** before submitting a pull request.  
5. **Create a pull request** with a clear description of your changes.  

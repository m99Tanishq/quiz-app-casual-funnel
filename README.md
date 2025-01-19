Quiz App
A fast, interactive quiz application built using React, TypeScript, and Vite, designed to provide a smooth and responsive user experience. This project utilizes modern tools such as TanStack Query, Framer Motion, and TailwindCSS to offer optimized performance and improved UI/UX.

🚀 Technologies Used
React (v18.3.1) for building the user interface.
TypeScript for static typing and improved developer experience.
Vite (v6.0.5) as a fast build tool.
TailwindCSS (v3.4.17) for utility-first CSS styling.
Framer Motion (v11.18.1) for smooth animations.
TanStack Query (v5.64.1) for data fetching, caching, and synchronization.
HeadlessUI (v2.2.0) for accessible and reusable UI components.
Axios for API calls.
React Toastify (v11.0.3) for displaying notifications.
ESLint for code linting and maintaining code quality.

📦 Key Features & Improvements
🔧 Developer Experience Enhancements
TanStack Query for efficient data fetching and caching.
Framer Motion for smooth, interactive animations.
HeadlessUI for accessible, unstyled components, making it easy to customize the design.
TypeScript provides type safety across the app for better tooling and fewer runtime errors.
React Query DevTools for monitoring queries and mutations during development.
Consistent File Structure for easy navigation and maintainability.
Environment Variables for better configuration management.
ESLint setup to ensure consistent code style and catch potential bugs.
🎨 UI/UX Improvements
Responsive Design: Ensures the quiz app looks great on any device.
Smooth Transitions with Framer Motion, making interactions more engaging.
Improved Loading States and better error handling UI.
Better Typography & Spacing to enhance readability and the overall user experience.
More Accessible Components using HeadlessUI components.
🛠 Installation & Setup
Follow the steps below to set up the project locally:

1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
2. Install Dependencies
Run the following command to install the required dependencies:

bash
Copy
Edit
npm install
3. Start the Development Server
To start the local development server, run:

bash
Copy
Edit
npm run dev
Visit http://localhost:3000 in your browser to see the app in action.

4. Build for Production
To build the project for production, run:

bash
Copy
Edit
npm run build
This will generate a dist/ folder with the optimized files.

5. Deploy to GitHub Pages
To deploy the app to GitHub Pages, you can use the gh-pages package. Run the following command:

bash
Copy
Edit
npm run deploy
Make sure you have already configured GitHub Pages in your repository settings for this to work.

🔄 Available Scripts
npm run dev: Starts the development server.
npm run build: Builds the app for production.
npm run deploy: Deploys the app to GitHub Pages.
npm run preview: Previews the built app locally.
📄 Folder Structure
quiz-app/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── loading.tsx
│   │   ├── layout/
│   │   │   ├── container.tsx
│   │   │   └── header.tsx
│   │   ├── quiz/
│   │   │   ├── QuestionNav.tsx
│   │   │   ├── QuizQuestion.tsx
│   │   │   └── Timer.tsx
│   │   ├── StartPage.tsx
│   │   └── ReportPage.tsx
│   ├── hooks/
│   │   ├── useQuiz.ts
│   │   └── useTimer.ts
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── App.tsx
│   └── main.tsx
├── .env
├── package.json
└── tsconfig.json

🌐 Demo
Visit the live demo at: https://m99Tanishq.github.io/quiz-app

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🤝 Contributing
If you'd like to contribute to the project, feel free to fork the repository and submit a pull request. Make sure to follow the existing code style and add tests for new features or bug fixes.
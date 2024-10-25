# Habit Tracker Landing Page

This project is a landing page for a habit-tracking web application designed to help users enhance their productivity and track habits over time. Built using modern frontend libraries and frameworks, the page offers users an engaging, interactive interface to learn about the app's features and get started on their journey to building better habits.

## Features

- **Animated Hero Section**: The landing page features animated elements using Framer Motion for a smooth, engaging user experience.
- **Responsive Layout**: Optimized for all screen sizes, ensuring accessibility and ease of use across devices.
- **Habit Calendar**: A visual heatmap calendar that showcases habit progress, providing users with a clear view of their accomplishments.
- **Feature and Benefit Highlights**: Displays key benefits and features of the habit tracker app, including insightful analytics, visual habit tracking, and streak tracking.
- **Firebase Authentication**: Integrates with Firebase to check user authentication state and redirects logged-in users to the main habits page.
- **Call to Action (CTA) Buttons**: Buttons to guide users towards logging in or signing up to start tracking their habits.

## Technologies Used

- **React**: JavaScript library for building the user interface.
- **React Router**: For managing navigation and page redirects.
- **Framer Motion**: Animation library used to add motion effects to various elements.
- **Font Awesome**: Icon library used for feature icons on the page.
- **Firebase**: Utilized for authentication to check and manage user login state.
- **TypeScript**: Adds type safety for improved development experience and reliability.
- **Tailwind CSS**: Utility-first CSS framework used for rapid and responsive UI development.

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/habit-tracker-landing-page.git
   cd habit-tracker-landing-page
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Firebase**:

   - Create a Firebase project and add a web app.
   - Copy the Firebase configuration details and replace them in the `firebaseConfig.js` file.

4. **Run the app**:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the landing page.

## Project Structure

The project structure is organized as follows:

```plaintext
src/
├── components/
│   ├── Footer.tsx
│   ├── LandingHabitCalendar.tsx
│   └── ui/
│       └── button.tsx
├── hooks/
│   └── reduxHook.ts
├── stores/
│   └── navbarSlice/
│       └── navbarSlice.ts
├── Types/
│   └── type.ts
├── App.tsx
└── main.tsx
```

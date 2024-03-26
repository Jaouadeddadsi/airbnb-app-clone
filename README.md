# Rent App (Airbnb Clone)

This project is a clone of Airbnb developed using Next.js, TypeScript, Prisma, and Tailwind CSS.

## Demo

Check out the live demo of the application [here](https://rent-app-project-nine.vercel.app/).

## Getting Started

### Prerequisites

Before running this project, you need to have the following installed on your machine:

- Node.js
- npm (Node Package Manager) or yarn

### Installation

1. Clone the repository to your local machine

2. Navigate into the project directory

3. Install dependencies:

- npm install

### Configuration

Before running the application, make sure to set up your environment variables. You can do this by creating a `.env` file in the root directory of the project and adding the necessary environment variables.

Example `.env` file:

- DATABASE_URL=""
- GITHUB_ID=""
- GITHUB_SECRET=""
- GOOGLE_CLIENT_ID=""
- GOOGLE_CLIENT_SECRET=""
- NEXTAUTH_SECRET=""
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
- NEXT_PUBLIC_CLOUDINARY_PRSET=""

### Running the Application

To run the application locally, execute the following command:

- npm run dev

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Next.js**: Next.js is a React framework that enables functionality like server-side rendering and generating static websites for React-based web applications.
- **TypeScript**: TypeScript is a superset of JavaScript that adds static types to the language, providing improved developer tooling and code reliability.
- **Prisma**: Prisma is an ORM (Object-Relational Mapping) tool for Node.js and TypeScript, used for database access and management.
- **Tailwind CSS**: Tailwind CSS is a utility-first CSS framework that allows for rapid UI development by providing pre-defined utility classes for styling.
- **NextAuth.js**: NextAuth.js is an authentication library for Next.js applications that provides built-in support for various authentication providers such as email/password, OAuth, and more.

## License

This project is licensed under the [MIT License](LICENSE).

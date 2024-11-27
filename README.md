# Job Finder

Job Finder is an Angular-based web application that helps users search for job listings. It utilizes the Google Custom Search API to fetch job postings and presents them in an easy-to-navigate interface.

## Features

- Job search functionality
- Pagination of search results
- Responsive design for various screen sizes
- Filtering options (e.g., date restrictions, location-based search)

## Technologies Used

- Angular 19.0.0
- RxJS
- Tailwind CSS
- Google Custom Search API

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/job-finder.git
   cd job-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `src/environment/environment.ts` file with your Google API key and Search Engine ID:
   ```typescript
   export const environment = {
     production: false,
     GOOGLE_API_KEY: "YOUR_GOOGLE_API_KEY",
     GOOGLE_SEARCH_ENGINE_ID: "YOUR_SEARCH_ENGINE_ID",
   };
   ```

### Running the Application

To start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

## Building for Production

To build the project for production:

```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
```

This README provides a brief overview of the project, its features, the technologies used, and instructions for setting up and running the application. You may want to add or modify sections based on specific aspects of your project, such as testing procedures, deployment instructions, or any other relevant information.

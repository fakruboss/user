# User Management Frontend

A React TypeScript application for managing users with a clean, modern interface.

## Project Structure

```
user-GH/
├── frontend/user-app/     # Development code
└── target/               # Built files for GitHub Pages deployment
```

## Features

- **Create User**: Add new users with name and email
- **Get Users**: Retrieve and display existing users
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Proper error messages and loading states
- **TypeScript**: Full type safety throughout the application

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm

### Setup

1. Navigate to the development folder:
   ```bash
   cd frontend/user-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the API URL in `.env` if needed:
   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

### Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`.

### Building for Production

To build and deploy to GitHub Pages:

```bash
npm run build:gh-pages
```

This will:
1. Create an optimized production build
2. Copy all necessary files to the `target/` folder
3. The `target/` folder is ready for GitHub Pages deployment

## API Integration

The application expects the following API endpoints:

- `POST /user` - Create a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

- `GET /user` - Get all users
  ```json
  [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
  ```

## Deployment

### GitHub Pages

1. Push the `target/` folder contents to your GitHub Pages repository
2. Enable GitHub Pages in your repository settings
3. Your app will be available at `https://yourusername.github.io/yourrepository`

### Environment Variables for Production

When deploying, update the API URL:
- Set `REACT_APP_API_URL` to your production API URL (e.g., your Fly.io app URL)

## Technologies Used

- **React 19**: Modern React with latest features
- **TypeScript**: Type-safe development
- **CSS3**: Modern styling with flexbox and grid
- **Fetch API**: HTTP requests to backend APIs

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
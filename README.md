# Gahranox Carvel Billing System

A free, professional billing software provided by Gahranox Carvel Labs Technologies for invoice generation and management.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.io/cli) (v17.x)

## Project Structure

```
gahranoxcarvel.in-billing/
├── GCBiller/
│   ├── frontend/     # Angular frontend application
│   └── backend/      # Node.js backend application
├── commands/         # Additional utility scripts
└── DefaultLogo/     # Default images for invoices
    ├── GCCompanyLogo.png
    └── GCCompanyQR.png
```

## Quick Start

### Frontend Setup

1. Navigate to the frontend directory:
   ```powershell
   cd GCBiller/frontend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Start the development server:
   ```powershell
   ng serve
   ```

   The application will be available at `http://localhost:4200`

### Backend Setup

1. Navigate to the backend directory:
   ```powershell
   cd GCBiller/backend
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Start the backend server:
   ```powershell
   npm start
   ```

   The backend API will be available at `http://localhost:3000`

## Features

- ✨ Professional invoice generation
- 📊 Customer information management
- 📜 Billing history tracking
- 🎨 Customizable invoice templates
- 📑 PDF export functionality
- 🖼️ Company logo integration
- 📱 QR code generation
- 💾 Data backup and restore

## Troubleshooting

If you encounter any issues:

1. Clear npm cache:
   ```powershell
   npm cache clean --force
   ```

2. Delete node_modules and reinstall:
   ```powershell
   Remove-Item -Recurse -Force -ErrorAction SilentlyContinue node_modules
   Remove-Item -Force -ErrorAction SilentlyContinue package-lock.json
   npm install
   ```

3. Verify Angular version:
   ```powershell
   ng version
   ```

## Building for Production

### Frontend Build

Create a production build:
```powershell
cd GCBiller/frontend
ng build --configuration=production
```

The build files will be in `dist/gcbiller-frontend/`.

### Backend Build

Prepare the backend:
```powershell
cd GCBiller/backend
npm install --production
```

## Contributing

We welcome contributions! Please feel free to:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For support:
- Open an issue in the repository
- Contact Gahranox Carvel Labs Technologies support team

## License

This project is provided as free software by Gahranox Carvel Labs Technologies. See LICENSE for details.

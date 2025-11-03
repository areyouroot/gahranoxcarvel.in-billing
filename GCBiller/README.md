# GCBiller - Invoice Generator

A modern invoice generation system built with Angular and Node.js, featuring GST calculation, PDF generation, and logo customization.

## Project Structure

```
GCBiller/
├── backend/             # Node.js Express backend
│   ├── src/
│   │   ├── server.js           # Main server file
│   │   ├── controllers/        # Business logic
│   │   └── routes/            # API routes
│   └── public/
│       └── assets/
│           └── images/        # Default logos and images
├── frontend/            # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Angular components
│   │   │   ├── services/      # Angular services
│   │   │   └── models/        # TypeScript interfaces
│   │   └── assets/           # Static assets
│   └── package.json
└── README.md
```

## Features

- 📄 Generate professional PDF invoices
- 💰 Automatic GST calculation
- 🖼️ Custom company logo support
- 📱 Responsive design
- 🧮 Dynamic product line items
- 💵 Additional fees support
- 🎨 Clean Material Design UI

## Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)
- Angular CLI (v20 or higher)

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd GCBiller/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node src/server.js
   ```
   The backend will run on http://localhost:3000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd GCBiller/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```
   The application will be available at http://localhost:4200

## Development

### Backend API Endpoints

- `POST /api/invoice/generate` - Generate PDF invoice
- `POST /api/invoice/upload-logo` - Upload company logo
- `GET /api/invoice/default-logo` - Get default logo

### Frontend Components

- `InvoiceFormComponent` - Main invoice form
- `InvoicePreviewComponent` - Invoice preview

### Key Files

- `invoice.service.ts` - API communication
- `invoice.model.ts` - Data models
- `invoiceController.js` - Invoice generation logic

## Building for Production

### Backend

```bash
cd GCBiller/backend
npm install --production
```

### Frontend

```bash
cd GCBiller/frontend
ng build --configuration production
```

The built files will be in `frontend/dist/`.

## Configuration

### Backend Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3000
UPLOAD_DIR=uploads
```

### Frontend Environment

Environment files are in `frontend/src/environments/`:

- `environment.ts` - Development
- `environment.prod.ts` - Production

## Debugging

### VS Code Launch Configurations

Two launch configurations are available:

1. **Launch Backend** - Debug Node.js backend
2. **Launch Frontend** - Debug Angular frontend
3. **Full Stack** - Debug both simultaneously

To use:
1. Open VS Code command palette (Ctrl+Shift+P)
2. Select "Debug: Select and Start Debugging"
3. Choose desired configuration

## Testing

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
ng test
```

## Common Issues

1. **CORS Errors**
   - Ensure backend CORS settings match frontend origin
   - Check port configurations

2. **PDF Generation Issues**
   - Verify PDFKit installation
   - Check file permissions in uploads directory

3. **Logo Upload Problems**
   - Ensure upload directory exists
   - Check file size limits
   - Verify supported image formats

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository.
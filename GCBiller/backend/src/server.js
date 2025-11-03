const express = require('express');
const cors = require('cors');
const path = require('path');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// Routes
app.use('/api/invoice', invoiceRoutes);

// Serve static files for logos
app.use('/logos', express.static(path.join(__dirname, '../uploads/logos')));

// Default route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to GCBiller API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`GCBiller backend running on port ${PORT}`);
});
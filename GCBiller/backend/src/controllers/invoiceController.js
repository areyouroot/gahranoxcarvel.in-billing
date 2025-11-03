const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

exports.generateInvoice = (req, res) => {
    try {
        const invoiceData = req.body;
        const logoPath = req.file ? req.file.path : null;

        // Create PDF
        const doc = new PDFDocument();
        const filename = `invoice-${Date.now()}.pdf`;
        const filePath = path.join(__dirname, '../../uploads', filename);

        // Pipe PDF to file
        doc.pipe(fs.createWriteStream(filePath));
        
        // Add content to PDF
        generateInvoiceContent(doc, invoiceData, logoPath);

        doc.end();

        // Send file when generation completes
        doc.on('end', () => {
            res.download(filePath, filename, (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                    res.status(500).json({ error: 'Error generating invoice' });
                }
                // Clean up file after download
                fs.unlinkSync(filePath);
            });
        });

    } catch (error) {
        console.error('Error generating invoice:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get default logo
exports.getDefaultLogo = (req, res) => {
    const defaultLogoPath = path.join(__dirname, '../../public/assets/images/default-logo.png');
    if (fs.existsSync(defaultLogoPath)) {
        res.sendFile(defaultLogoPath);
    } else {
        res.status(404).json({ error: 'Default logo not found' });
    }
};

// Upload company logo
exports.uploadLogo = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const logoUrl = `/logos/${req.file.filename}`;
        res.json({ 
            message: 'Logo uploaded successfully',
            logoUrl 
        });
    } catch (error) {
        console.error('Error uploading logo:', error);
        res.status(500).json({ message: 'Error uploading logo' });
    }
};

// Helper function to generate invoice content
function generateInvoiceContent(doc, data, logoPath) {
    // Set up document
    doc.fontSize(20).text('TAX INVOICE', 50, 50);
    
    // Add company logo
    if (logoPath && fs.existsSync(logoPath)) {
        doc.image(logoPath, 400, 50, { width: 100 });
    } else {
        // Try to add default logo
        const defaultLogoPath = path.join(__dirname, '../../public/assets/images/default-logo.png');
        if (fs.existsSync(defaultLogoPath)) {
            doc.image(defaultLogoPath, 400, 50, { width: 100 });
        }
    }
    
    // Company details
    doc.fontSize(12)
       .text(`Company: ${data.companyName || 'GC Company'}`, 50, 100)
       .text(`Address: ${data.companyAddress || ''}`, 50, 115)
       .text(`GST: ${data.companyGST || ''}`, 50, 130);
    
    // Customer details
    doc.text(`Bill To: ${data.customerName || ''}`, 50, 160)
       .text(`Address: ${data.customerAddress || ''}`, 50, 175)
       .text(`GST: ${data.customerGST || ''}`, 50, 190);
    
    // Invoice details
    doc.text(`Invoice #: ${data.invoiceNumber || ''}`, 350, 160)
       .text(`Date: ${data.invoiceDate || new Date().toLocaleDateString()}`, 350, 175);
    
    // Products table
    let yPosition = 250;
    doc.fontSize(10);
    
    // Table header
    doc.text('Description', 50, yPosition)
       .text('Qty', 250, yPosition)
       .text('Rate', 300, yPosition)
       .text('GST%', 350, yPosition)
       .text('Amount', 400, yPosition);
    
    yPosition += 20;
    
    // Products
    let subtotal = 0;
    data.products.forEach(product => {
        const amount = product.quantity * product.rate;
        const gstAmount = amount * (product.gstRate / 100);
        const total = amount + gstAmount;
        subtotal += total;
        
        doc.text(product.description, 50, yPosition)
           .text(product.quantity.toString(), 250, yPosition)
           .text(`₹${product.rate.toFixed(2)}`, 300, yPosition)
           .text(`${product.gstRate}%`, 350, yPosition)
           .text(`₹${total.toFixed(2)}`, 400, yPosition);
        
        yPosition += 15;
    });
    
    // Totals
    yPosition += 20;
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 350, yPosition);
    
    // Additional fees
    if (data.additionalFees) {
        data.additionalFees.forEach(fee => {
            yPosition += 15;
            let feeAmount = fee.type === 'percentage' ? 
                subtotal * (fee.value / 100) : fee.value;
            doc.text(`${fee.name}: ₹${feeAmount.toFixed(2)}`, 350, yPosition);
            subtotal += feeAmount;
        });
    }
    
    yPosition += 15;
    doc.text(`Total GST: ₹${calculateTotalGST(data.products).toFixed(2)}`, 350, yPosition);
    
    yPosition += 15;
    doc.fontSize(14).text(`Grand Total: ₹${subtotal.toFixed(2)}`, 350, yPosition);
    
    // Footer with QR code and watermark
    yPosition = doc.page.height - 100;
    
    // Add QR code if available
    const qrCodePath = path.join(__dirname, '../../public/assets/images/default-qr.png');
    if (fs.existsSync(qrCodePath)) {
        doc.image(qrCodePath, 250, yPosition, { width: 100 });
    }

    // Watermark
    doc.fontSize(8)
       .fillColor('gray')
       .text('Generated by Gahranox Carvel Labs Technologies Billing Software', 50, doc.page.height - 50, {
           align: 'center',
           width: doc.page.width - 100
       })
       .text('Thank you for your business!', 50, doc.page.height - 40, {
           align: 'center',
           width: doc.page.width - 100
       });
}

// Helper function to calculate total GST
function calculateTotalGST(products) {
    return products.reduce((total, product) => {
        const amount = product.quantity * product.rate;
        return total + (amount * (product.gstRate / 100));
    }, 0);
}
// Function to calculate totals
function calculateTotals() {
    const itemRows = document.querySelectorAll('.item-row');
    let subtotal = 0;
    itemRows.forEach(row => {
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;
        const total = quantity * price;
        row.querySelector('.total').textContent = total.toFixed(2);
        subtotal += total;
    });
    document.getElementById('subtotal').value = subtotal.toFixed(2);
    document.getElementById('grandtotal').value = subtotal.toFixed(2);
}

// Function to add new item row
function addItem() {
    const container = document.getElementById('items-container');
    const itemRow = document.createElement('div');
    itemRow.classList.add('item-row');
    itemRow.innerHTML = `
        <input type="text" class="description" placeholder="Description" required>
        <input type="number" class="quantity" placeholder="Quantity" required oninput="calculateTotals()">
        <input type="number" class="price" placeholder="Price" required oninput="calculateTotals()">
        <span class="total">0.00</span>
        <button type="button" class="remove-item" onclick="removeItem(this)">Remove</button>
    `;
    container.appendChild(itemRow);
}

// Function to remove an item row
function removeItem(button) {
    button.parentElement.remove();
    calculateTotals(); // Recalculate totals after removal
}

// Event listener for form submission
document.getElementById('invoice-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect the invoice data
    const invoiceData = {
        billTo: document.getElementById('billTo').value, // Get the client's name
        date: document.getElementById('date').value,
        items: [],
        subtotal: document.getElementById('subtotal').value,
        grandTotal: document.getElementById('grandtotal').value
    };

    document.querySelectorAll('.item-row').forEach((row, index) => {
        invoiceData.items.push({
            no: index + 1,
            description: row.querySelector('.description').value,
            quantity: row.querySelector('.quantity').value,
            price: row.querySelector('.price').value,
            total: row.querySelector('.total').textContent
        });
    });

    // Create the PDF with jsPDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Add company logo and signature images
    // Replace 'logo_url' and 'signature_url' with the actual paths or base64 strings
    const logo_url = 'path_or_base64_of_logo';
    const signature_url = 'path_or_base64_of_signature';

    // Add company logo (dimensions and positions to be adjusted as needed)
    pdf.addImage(logo_url, 'JPEG', 20, 10, 50, 25);

    // Generate table and text content
    let startY = 80;

    // Add 'Bill To' text
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text('Bill To:', 20, startY - 10);
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text(invoiceData.billTo, 20, startY);

    // Table headers
    const headers = ['NO', 'DESCRIPTION', 'QTY', 'PRICE', 'TOTAL'];
    const columnPositions = [20, 30, 120, 140, 160];

    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    headers.forEach((header, index) => {
        pdf.text(header, columnPositions[index], startY + 10);
    });

    pdf.setDrawColor(0);
    pdf.setLineWidth(0.1);
    startY += 15;

    // Table rows
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    invoiceData.items.forEach((item, index) => {
        pdf.text(item.no.toString(), columnPositions[0], startY);
        pdf.text(item.description, columnPositions[1], startY);
        pdf.text(item.quantity, columnPositions[2], startY);
        pdf.text(`$${item.price}`, columnPositions[3], startY);
        pdf.text(`$${item.total}`, columnPositions[4], startY);

        // Draw a line below each item
        startY += 10;
        pdf.line(20, startY, 180, startY); // Horizontal line
    });

    // Subtotal and Grand Total
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text(`Subtotal: $${invoiceData.subtotal}`, columnPositions[3], startY + 10);
    pdf.text(`Grand Total: $${invoiceData.grandTotal}`, columnPositions[3], startY + 20);

    // Add signature image (adjust x, y, width, height as needed)
    pdf.addImage(signature_url, 'JPEG', 20, startY + 30, 50, 15); // x, y, width, height

    // Save the PDF
    pdf.save('invoice.pdf');
});

// Initial call to add the first item row on page load
window.onload = addItem;

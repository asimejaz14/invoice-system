# Invoice Generator

This project provides a simple web application for generating dynamic invoices. It allows users to input client information, add itemized services or products, calculate totals, and generate a downloadable PDF invoice.

## Features

- Add client name dynamically
- Dynamically add or remove itemized rows for services/products
- Auto-calculation of subtotal and grand total
- Generate a styled PDF invoice with company logo and signature

## Technologies Used

- HTML
- CSS
- JavaScript
- jsPDF library for PDF generation

## How to Use

1. Clone the repository to your local machine.
2. Open the `index.html` in a web browser.
3. Enter the client's name and the date of the invoice.
4. Add the items, including description, quantity, and price.
5. The invoice will calculate the totals automatically.
6. Click the 'Generate Invoice' button to download the invoice as a PDF.

## Customization

To customize the invoice template, modify the `style.css` file for styling and `script.js` for functionality.

- Update the logo and signature images by replacing the base64 encoded strings or URLs in the `script.js` file.
- Adjust the invoice layout by modifying the HTML structure and corresponding styles.

## Contributions

Contributions are welcome! If you have suggestions for improvements or bug fixes, please open an issue or submit a pull request.

## Todo

- [ ] Improve PDF generation styling to better match the brand identity and professional aesthetics.

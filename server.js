const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const csvFilePath = path.join(__dirname, 'db.csv');

// Ensure the CSV file exists
if (!fs.existsSync(csvFilePath)) {
  fs.writeFileSync(csvFilePath, 'name,username,password\n');
}

// Endpoint to add data
app.post('/add-data', (req, res) => {
  const { name, username, password } = req.body;

  // Append data to the CSV file
  const csvRow = `${name},${username},${password}\n`;
  fs.appendFileSync(csvFilePath, csvRow);

  res.status(200).send('Data added successfully!');
});

// Endpoint to download the CSV file
app.get('/download-csv', (req, res) => {
  res.download(csvFilePath, 'db.csv', (err) => {
    if (err) {
      res.status(500).send('Error downloading file.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
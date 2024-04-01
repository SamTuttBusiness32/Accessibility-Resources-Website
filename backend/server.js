const express = require('express');
const mysql = require('mysql2'); // Change to mysql2
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'WishSQLNish32',
  database: 'sys',
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Middleware for parsing JSON body
app.use(bodyParser.json());

// Use cors middleware
app.use(cors());

// Route for handling login
app.post('/api/login', (req, res) => {
  const formData = req.body;

  // Extract form data
  const { userName, password } = formData;

  // Query the database to authenticate the user
  connection.query(
    'SELECT * FROM users WHERE userName = ? AND password = ?',
    [userName, password],
    (selectErr, selectResult) => {
      if (selectErr) {
        console.error('Error authenticating user:', selectErr);
        res.status(500).send('Error authenticating user');
        return;
      }

      // If user is not found or password is incorrect, return an error
      if (selectResult.length === 0) {
        res.status(400).send('Invalid username or password');
        return;
      }

      // If authentication is successful, send user data in response
      const userData = selectResult[0]; // Assuming user data is in the first row of selectResult
      res.status(200).json(userData);
    },
  );
});

// Route for handling form submission
app.post('/api/signup', (req, res) => {
  const formData = req.body;

  // Extract form data
  const { userName, email, password } = formData;

  // Check if the username already exists
  connection.query(
    'SELECT * FROM users WHERE userName = ?',
    [userName],
    (selectErr, selectResult) => {
      if (selectErr) {
        console.error('Error checking username:', selectErr);
        res.status(500).send('Error checking username');
        return;
      }

      // If the username already exists, return a custom error message
      if (selectResult.length > 0) {
        res.status(400).send('Username already exists');
        return;
      }

      // Insert form data into MySQL if the username doesn't exist
      connection.query(
        'INSERT INTO users (userName, email, password) VALUES (?, ?, ?)',
        [userName, email, password],
        (insertErr, insertResult) => {
          if (insertErr) {
            console.error('Error inserting data into MySQL:', insertErr);
            res.status(500).send('Error inserting data into MySQL');
            return;
          }
          console.log('Data inserted into MySQL');
          res.sendStatus(200); // Respond with success status
        },
      );
    },
  );
});

app.post('/api/settings', (req, res) => {
  const formData = req.body;

  // Extract form data
  const {
    userName,
    fontSizeMultiplier,
    saturationValue,
    colourValue,
    alignTextValue,
    textSpacingValue,
    lineHeightValue,
    hideImagesValue,
    highlightLinksValue,
    fontWeightValue,
    animationDelayValue,
    fontValue,
  } = formData;

  // Check if the user exists in accessibility_settings table
  const checkUserQuery = `SELECT * FROM accessibility_settings WHERE userName = ?`;
  connection.query(checkUserQuery, [userName], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      // If user exists, update the values
      const updateQuery = `UPDATE accessibility_settings SET fontSizeMultiplier=?, saturationValue=?, colourValue=?, alignTextValue=?, textSpacingValue=?, lineHeightValue=?, hideImagesValue=?, highlightLinksValue=?, fontWeightValue=?, animationDelayValue=?, fontValue=? WHERE userName=?`;
      connection.query(
        updateQuery,
        [
          fontSizeMultiplier,
          saturationValue,
          colourValue,
          alignTextValue,
          textSpacingValue,
          lineHeightValue,
          hideImagesValue,
          highlightLinksValue,
          fontWeightValue,
          animationDelayValue,
          fontValue,
          userName,
        ],
        (err, results) => {
          if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          res.status(200).json({ message: 'Settings updated successfully' });
        },
      );
    } else {
      // If user doesn't exist, create a new row with the values
      const insertQuery = `INSERT INTO accessibility_settings (userName, fontSizeMultiplier, saturationValue, colourValue, alignTextValue, textSpacingValue, lineHeightValue, hideImagesValue, highlightLinksValue, fontWeightValue, animationDelayValue, fontValue) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      connection.query(
        insertQuery,
        [
          userName,
          fontSizeMultiplier,
          saturationValue,
          colourValue,
          alignTextValue,
          textSpacingValue,
          lineHeightValue,
          hideImagesValue,
          highlightLinksValue,
          fontWeightValue,
          animationDelayValue,
          fontValue,
        ],
        (err, results) => {
          if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          res.status(200).json({ message: 'Settings saved successfully' });
        },
      );
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

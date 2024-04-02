const express = require('express');
const mysql = require('mysql2'); // Change to mysql2
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
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

  // Query the database to retrieve the hashed password for the provided username
  connection.query(
    'SELECT * FROM users WHERE userName = ?',
    [userName],
    (selectErr, selectResult) => {
      if (selectErr) {
        console.error('Error retrieving user data:', selectErr);
        res.status(500).send('Error retrieving user data');
        return;
      }

      // If no user found, return an error
      if (selectResult.length === 0) {
        res.status(400).send('Invalid username or password');
        return;
      }

      // Retrieve the hashed password from the database
      const hashedPassword = selectResult[0].password;

      // Compare the hashed password with the provided password
      bcrypt.compare(password, hashedPassword, (compareErr, compareResult) => {
        if (compareErr) {
          console.error('Error comparing passwords:', compareErr);
          res.status(500).send('Error comparing passwords');
          return;
        }

        // If passwords don't match, return an error
        if (!compareResult) {
          res.status(400).send('Invalid username or password');
          return;
        }

        // Passwords match, authentication successful
        const userData = { ...selectResult[0] };
        delete userData.password; // Exclude password field from userData

        // Fetch user settings from accessibility_settings table
        connection.query(
          'SELECT * FROM accessibility_settings WHERE userName = ?',
          [userName],
          (settingsErr, settingsResult) => {
            if (settingsErr) {
              console.error('Error retrieving user settings:', settingsErr);
              res.status(500).send('Error retrieving user settings');
              return;
            }

            // Add settings data to userData
            if (settingsResult.length > 0) {
              userData.settings = settingsResult[0]; // Assuming there's only one row per user
              delete userData.settings.userName; // Exclude password field from userData
            }

            // Proceed with sending user data in response
            res.status(200).json(userData);
          },
        );
      });
    },
  );
});

// Route for handling form submission

app.post('/api/signup', (req, res) => {
  const formData = req.body;

  // Extract form data
  const { userName, email, password } = formData;

  // Hash the password using bcrypt
  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('Error hashing password:', hashErr);
      res.status(500).send('Error hashing password');
      return;
    }

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
          [userName, email, hashedPassword],
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
});

// Route for handling form submission
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
        (err, updateResults) => {
          if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          // Fetch and send updated settings data
          connection.query(
            'SELECT * FROM accessibility_settings WHERE userName = ?',
            [userName],
            (err, updatedSettings) => {
              if (err) {
                res.status(500).json({ error: 'Internal Server Error' });
                return;
              }
              res.status(200).json(updatedSettings[0]); // Assuming there's only one row per user
            },
          );
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
        (err, insertResults) => {
          if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          // Fetch and send updated settings data
          connection.query(
            'SELECT * FROM accessibility_settings WHERE userName = ?',
            [userName],
            (err, updatedSettings) => {
              if (err) {
                res.status(500).json({ error: 'Internal Server Error' });
                return;
              }
              res.status(200).json(updatedSettings[0]); // Assuming there's only one row per user
            },
          );
        },
      );
    }
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

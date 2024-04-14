const express = require('express');
const mysql = require('mysql2'); // Change to mysql2
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const app = express();
const port = 3000;
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: 'dphg24y9z',
  api_key: '676433398454284',
  api_secret: 'eIjGf6d8fuQ-eL2LuuEQ4HmwlXc',
});

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'accessibility',
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

app.post('/api/login', (req, res) => {
  const formData = req.body;

  // Extract form data
  const { userName, password } = formData;

  // Query the database to retrieve the user data and checklist data for the provided username
  const userQuery = 'SELECT * FROM users WHERE userName = ?';
  connection.query(userQuery, [userName], (err, userResult) => {
    if (err) {
      console.error('Error retrieving user data:', err);
      res.status(500).send('Error retrieving user data');
      return;
    }

    // If no user found, return an error
    if (userResult.length === 0) {
      res.status(400).send('Invalid username or password');
      return;
    }

    // Retrieve the hashed password from the database
    const hashedPassword = userResult[0].password;

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
      const userData = { ...userResult[0] };
      delete userData.password; // Exclude password field from userData

      // Query the database to retrieve the checklist data for the provided username
      const checklistQuery = 'SELECT * FROM checklist WHERE userName = ?';
      connection.query(
        checklistQuery,
        [userName],
        (checklistErr, checklistResult) => {
          if (checklistErr) {
            console.error('Error retrieving checklist data:', checklistErr);
            res.status(500).send('Error retrieving checklist data');
            return;
          }

          // Query the database to retrieve the settings data for the provided username
          const settingsQuery =
            'SELECT * FROM accessibility_settings WHERE userName = ?';
          connection.query(
            settingsQuery,
            [userName],
            (settingsErr, settingsResult) => {
              if (settingsErr) {
                console.error('Error retrieving settings data:', settingsErr);
                res.status(500).send('Error retrieving settings data');
                return;
              }

              // Prepare response data
              const responseData = {
                userData: userData,
                checklistData: checklistResult[0], // Assuming there's only one checklist row per user
                settingsData: settingsResult[0], // Assuming there's only one settings row per user
              };

              // Send response with user, checklist, and settings data
              res.status(200).json(responseData);
            },
          );
        },
      );
    });
  });
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

app.post('/api/checklist', (req, res) => {
  const {
    userName,
    parentChecked,
    childChecked,
    subChildChecked,
    parentPercentages,
  } = req.body;

  // Here you can fetch additional user data from your database
  // For demonstration, let's assume you have a 'users' table
  const userQuery = 'SELECT * FROM users WHERE userName = ?';
  connection.query(userQuery, [userName], (userErr, userResult) => {
    if (userErr) {
      console.error('Error fetching user data:', userErr);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (userResult.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const userData = {
      userName: userResult[0].userName,
      // Include other user data as needed
    };

    // Combine user data with checklist data
    const combinedData = {
      ...userData,
      parentChecked,
      childChecked,
      subChildChecked,
      parentPercentages,
    };

    // Check if the data with the same userName is defined in the checklist table
    const checkExistingQuery = 'SELECT * FROM checklist WHERE userName = ?';
    connection.query(
      checkExistingQuery,
      [userName],
      (checkErr, checkResult) => {
        if (checkErr) {
          console.error('Error checking existing data:', checkErr);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        if (checkResult.length > 0) {
          // Data already exists, perform an UPDATE operation
          const updateQuery = `UPDATE checklist 
                             SET parentChecked = ?, 
                                 childChecked = ?, 
                                 subChildChecked = ?, 
                                 parentPercentages = ? 
                             WHERE userName = ?`;
          connection.query(
            updateQuery,
            [
              JSON.stringify(combinedData.parentChecked),
              JSON.stringify(combinedData.childChecked),
              JSON.stringify(combinedData.subChildChecked),
              JSON.stringify(combinedData.parentPercentages),
              userName,
            ],
            (updateErr, updateResult) => {
              if (updateErr) {
                console.error('Error updating checklist data:', updateErr);
                res.status(500).json({ error: 'Internal server error' });
                return;
              }
              console.log('Checklist data updated successfully');
              res.status(200).json({ success: true, userData: combinedData });
            },
          );
        } else {
          // Data does not exist, perform an INSERT operation
          const insertQuery = `INSERT INTO checklist 
                             (userName, parentChecked, childChecked, subChildChecked, parentPercentages) 
                             VALUES (?, ?, ?, ?, ?)`;
          connection.query(
            insertQuery,
            [
              combinedData.userName,
              JSON.stringify(combinedData.parentChecked),
              JSON.stringify(combinedData.childChecked),
              JSON.stringify(combinedData.subChildChecked),
              JSON.stringify(combinedData.parentPercentages),
            ],
            (insertErr, insertResult) => {
              if (insertErr) {
                console.error(
                  'Error saving checklist data to database:',
                  insertErr,
                );
                res.status(500).json({ error: 'Internal server error' });
                return;
              }
              console.log('Checklist data saved successfully8');
              res.status(200).json({ userData: combinedData });
            },
          );
        }
      },
    );
  });
});

app.post('/upload', upload.single('image'), (req, res) => {
  const file = req.file.path;
  const username = req.body.username; // Extract username from request body
  const folder = 'Profile Pictures'; // Set the folder name

  // Upload the image to Cloudinary
  cloudinary.uploader.upload(
    file,
    { folder: folder, tags: [username] },
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Upload failed' });
      }
      // Return the secure URL of the uploaded image
      res.status(200).json({ url: result.secure_url });
    },
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

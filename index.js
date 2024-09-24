const mysql = require('mysql');
const express = require('express');
const app = express();

console.log('Port '+process.env.PORT);
const port = process.env.PORT || 3000

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'exampleuser',
  password: 'examplepassword',
  database: 'mydatabase'
});


connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// 
app.get('/', (req, res) => {
  const sqlQuery = 'SELECT * FROM students'; // Example SQL query

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error executing query');
      return;
    }

    // Send the results as JSON
    res.json(results);
  });
});


//
app.get('/', (req, res) => {
  res.send('Hello from Node.js and MySQL!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

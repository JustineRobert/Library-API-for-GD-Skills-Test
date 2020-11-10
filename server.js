require('dotenv').config();
const express = require("express");
const db = require('./db');

const morgan = require('morgan');


const app = express();

app.use(express.json());

// Get all Books
app.get("/api/v1/books", async (req, res) => {

  try {
    const results = await db.query("SELECT * FROM books");
    console.log("results");
  res.status(200).json({
    status: "Success",
    data:{
      results: results.rows.length,
      book: results.rows, 
    },
  });
  } catch(err) {
    console.log(err);
  }
});

//Get a Book
app.get("/api/v1/books/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query("SELECT * FROM books WHERE id = $1, [req.params.id]");
    res.status(201).json({
      status: "Success",
      data:{
        book: results.rows[0],
      },
    });

  } catch(err) {
    console.log(err);
  }
});

//Create/Make a Book
app.post("/api/v1/books/:id", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query("INSERT INTO books (title, author, release_year) VALUES ($1, $2, $3) RETURNING *", [req.body.title, req.body.author, req.body.release_year]);
    console.log(results);

  res.status(200).json({
    status: "Success",
    data:{
      book: results.rows[0],
    },
  });

  } catch(err) {
    console.log(err);
  }

});

//Update Books
app.put("/api/v1/books/:id", async (req, res) => {

  try {
    const results = await db.query("UPDATE books SET title = $1, author = $2, release_year = $3" WHERE id = 4 RETURNING *, [req.body.title, req.body.author, req.body.release_year, req.params.id]);
    
    res.status(200).json({
      status: "Success",
      data:{
        book: results.rows[0],
      },
    });

  } catch(err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

//Delete a Book
app.delete("/api/v1/books/:id", async (req, res) => {

  try {
    const results = await db.query("DELETE * FROM books WHERE id = $1", [req.params.id]);
    console.log("results");

    res.status(204).json({
      status: "success",
    });

  } catch {
    console.log(err);
  }
});

const port = process.env.PORT || 2022;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});

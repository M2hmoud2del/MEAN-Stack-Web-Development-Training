const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "books.json");

const server = http.createServer((req, res) => {
  const pathname = req.url;
  const method = req.method;

  res.setHeader("Content-Type", "application/json");

  if (method === "GET" && pathname === "/books") {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end(JSON.stringify({ error: "Error reading file" }));
      }

      res.writeHead(200);
      res.end(data);
    });
  } else if (method === "GET" && pathname.startsWith("/books/")) {
    const id = Number(pathname.split("/")[2]);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end(JSON.stringify({ error: "Error reading file" }));
      }

      const books = JSON.parse(data);
      const book = books.find((item) => item.id === id);

      if (!book) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: "Book not found" }));
      }

      res.writeHead(200);
      res.end(JSON.stringify(book));
    });
  } else if (method === "POST" && pathname === "/books") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let newBook;

      try {
        newBook = JSON.parse(body);
      } catch {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "Invalid JSON in request body" }));
      }

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500);
          return res.end(JSON.stringify({ error: "Error reading file" }));
        }

        const books = JSON.parse(data);
        let maxId = 0;

        if (books.length > 0) {
          maxId = Math.max(...books.map((book) => book.id));
        }

        newBook.id = maxId + 1;
        books.push(newBook);

        fs.writeFile(filePath, JSON.stringify(books, null, 2), (err) => {
          if (err) {
            res.writeHead(500);
            return res.end(JSON.stringify({ error: "Error saving file" }));
          }

          res.writeHead(201);
          res.end(JSON.stringify(newBook));
        });
      });
    });
  } else if (method === "PUT" && pathname.startsWith("/books/")) {
    const id = Number(pathname.split("/")[2]);
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      let updatedData;

      try {
        updatedData = JSON.parse(body);
      } catch {
        res.writeHead(400);
        return res.end(JSON.stringify({ error: "Invalid JSON in request body" }));
      }

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500);
          return res.end(JSON.stringify({ error: "Error reading file" }));
        }

        const books = JSON.parse(data);
        const bookIndex = books.findIndex((book) => book.id === id);

        if (bookIndex === -1) {
          res.writeHead(404);
          return res.end(JSON.stringify({ error: "Book not found" }));
        }

        books[bookIndex] = { ...books[bookIndex], ...updatedData };

        fs.writeFile(filePath, JSON.stringify(books, null, 2), (err) => {
          if (err) {
            res.writeHead(500);
            return res.end(JSON.stringify({ error: "Error saving file" }));
          }

          res.writeHead(200);
          res.end(JSON.stringify(books[bookIndex]));
        });
      });
    });
  } else if (method === "DELETE" && pathname.startsWith("/books/")) {
    const id = Number(pathname.split("/")[2]);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end(JSON.stringify({ error: "Error reading file" }));
      }

      const books = JSON.parse(data);
      const updatedBooks = books.filter((book) => book.id !== id);

      if (updatedBooks.length === books.length) {
        res.writeHead(404);
        return res.end(JSON.stringify({ error: "Book not found" }));
      }

      fs.writeFile(filePath, JSON.stringify(updatedBooks, null, 2), (err) => {
        if (err) {
          res.writeHead(500);
          return res.end(JSON.stringify({ error: "Error saving file" }));
        }

        res.writeHead(200);
        res.end(JSON.stringify({ message: "Book deleted successfully" }));
      });
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server Running on http://localhost:3000");
});

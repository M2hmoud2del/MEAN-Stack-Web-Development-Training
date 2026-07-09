# 📚 Advanced Filtering, Sorting, and Pagination with Mongoose

## 🧠 Overview

When working with MongoDB and Mongoose, you often need to retrieve only the documents that match certain conditions instead of returning everything.

---

# Filtering Documents with `find()`

The most common way to retrieve documents is using `find()`.

```js
const courses = await Course.find({
  instructor: "Esraa Said",
});
```

This returns all courses where the instructor is exactly `"Esraa Said"`.

---

# Exact Match and Case Sensitivity

By default, MongoDB performs **exact** and **case-sensitive** matching.

```js
const courses = await Course.find({
  instructor: "Esraa Said",
});
```

| Stored Value | Match |
| ------------ | ----- |
| `Esraa Said` | ✅    |
| `esraa said` | ❌    |
| `ESRAA SAID` | ❌    |
| `EsRaA SaId` | ❌    |

Likewise:

```js
await Course.find({
  category: "Backend",
});
```

will **not** match:

```
backend
BACKEND
BaCkEnD
```

---

# Case-Insensitive Search

To ignore letter casing, use `$regex` with the `i` option.

```js
const courses = await Course.find({
  instructor: {
    $regex: "esraa said",
    $options: "i",
  },
});
```

You can also use the shorthand syntax:

```js
const courses = await Course.find({
  instructor: /esraa said/i,
});
```

Now all of these values match:

| Stored Value | Match |
| ------------ | ----- |
| `Esraa Said` | ✅    |
| `esraa said` | ✅    |
| `ESRAA SAID` | ✅    |
| `EsRaA SaId` | ✅    |

Case-insensitive searches are especially useful for text fields like:

- `title`
- `instructor`
- `category`

---

# Using `where()`

Mongoose also provides the `where()` helper.

```js
const courses = await Course.find().where("instructor").equals("Esraa Said");
```

This produces the same result as:

```js
Course.find({
  instructor: "Esraa Said",
});
```

`where()` is mainly useful when building queries dynamically.

---

# Filtering with Query Parameters

Instead of hardcoding filters, you can use URL query parameters.

```js
const courses = await Course.find(req.query);
```

Request:

```
GET /api/v1/courses?category=Backend
```

Result:

```js
Course.find({
  category: "Backend",
});
```

---

# Problem with Extra Query Parameters

Suppose the client sends:

```
GET /api/v1/courses?category=Backend&sort=price
```

Using:

```js
Course.find(req.query);
```

becomes:

```js
Course.find({
  category: "Backend",
  sort: "price",
});
```

Since `sort` is **not a field in the collection**, MongoDB searches for documents with a `sort` property and returns no matching documents.

---

# Excluding Non-Filter Fields

Remove parameters that should not be used for filtering.

```js
const excludedFields = ["sort", "page", "limit"];

const excludedQuery = {
  ...req.query,
};

excludedFields.forEach((field) => {
  delete excludedQuery[field];
});

const courses = await Course.find(excludedQuery);
```

Now:

```
GET /api/v1/courses?category=Backend&sort=price&page=2
```

becomes:

```js
{
  category: "Backend";
}
```

---

# Filtering by Value Ranges

MongoDB supports comparison operators.

Example:

```js
const courses = await Course.find({
  category: "Backend",
  rating: {
    $gte: 4.5,
  },
});
```

Supported operators include:

| Operator | Meaning                  |
| -------- | ------------------------ |
| `$gt`    | Greater than             |
| `$gte`   | Greater than or equal    |
| `$lt`    | Less than                |
| `$lte`   | Less than or equal       |
| `$in`    | Value exists in an array |

---

# Range Filtering Using URL Parameters

A client can send:

```
GET /api/v1/courses?category=Backend&rating[gte]=4.5
```

Express parses this as:

```js
console.log(req.query);
```

Output:

```js
{
  category: "Backend",
  "rating[gte]": "4.5"
}
```

Notice that `"rating[gte]"` is treated as a plain string key.

---

# Convert URL Queries into MongoDB Operators

Transform bracket notation into MongoDB operators.

```js
function queriesIntoMongoDBOperators(query) {
  const mongoQuery = {};

  for (let key in query) {
    const value = query[key];

    const match = key.match(/^(.+)\[(gte|gt|lte|lt)\]$/);

    if (match) {
      const field = match[1];
      const operator = `$${match[2]}`;

      if (!mongoQuery[field]) {
        mongoQuery[field] = {};
      }

      mongoQuery[field][operator] = Number(value);
    } else {
      mongoQuery[key] = value;
    }
  }

  return mongoQuery;
}
```

Example request:

```
GET /api/v1/courses?category=Backend&rating[gte]=4.5&rating[lt]=4.9
```

Produces:

```js
{
  category: "Backend",
  rating: {
    $gte: 4.5,
    $lt: 4.9,
  },
}
```

Then execute:

```js
const updatedQuery = queriesIntoMongoDBOperators(req.query);

const courses = await Course.find(updatedQuery);
```

---

# Dynamic Case-Insensitive Search with `req.query`

You can automatically make string filters case-insensitive.

```js
function queriesIntoMongoDBOperators(query) {
  const mongoQuery = {};
  for (const key in query) {
    const value = query[key];
    const match = key.match(/^(.+)\[(gte|gt|lte|lt)\]$/);
    if (match) {
      const field = match[1];
      const operator = `$${match[2]}`;
      if (!mongoQuery[field]) {
        mongoQuery[field] = {};
      }
      mongoQuery[field][operator] = Number(value);
    } else {
      mongoQuery[key] = { $regex: value, $options: "i" };
    }
  }
  return mongoQuery;
}

```
Then execute:

```js
const updatedQuery = queriesIntoMongoDBOperators(req.query);

const courses = await Course.find(updatedQuery);
```
Request:

```
GET /api/v1/courses?category=backend
```

will match:

```
Backend
backend
BACKEND
BaCkEnD
```

This approach works for any string field received through `req.query`.

---

# Sorting Results

Use `.sort()` to order documents.

```js
const excludedFields = ["sort", "page", "limit"];

const excludedQuery = {
  ...req.query,
};

excludedFields.forEach((field) => {
  delete excludedQuery[field];
});

const courses = await Course.find(excludedQuery).sort(req.query.sort);
```

Examples:

```
GET /api/v1/courses?sort=price
```

Ascending order.

```
GET /api/v1/courses?sort=-price
```

Descending order.

You can sort by multiple fields:

```
GET /api/v1/courses?sort=category,price
```

---

# Pagination

Pagination prevents returning thousands of documents in one request.

```js
const page = Number(req.query.page) || 1;

const limit = Number(req.query.limit) || 10;

const skip = (page - 1) * limit;

const courses = await Course.find(excludedQuery).skip(skip).limit(limit);
```

Example:

```
GET /api/v1/courses?page=2&limit=5
```

Calculations:

```
page = 2
limit = 5
skip = 5
```

MongoDB skips the first 5 documents and returns the next 5.

---

# Combining Filtering, Sorting, and Pagination

```js
const getAllCourses = async (req, res) => {
  try {
    // Copy query parameters
    const queryObj = { ...req.query };

    // Remove reserved fields
    const excludedFields = ["sort", "page", "limit"];
    excludedFields.forEach((field) => delete queryObj[field]);

    // Convert operators like rating[gte]=4.5 & Make case insensitive
    const mongoQuery = queriesIntoMongoDBOperators(queryObj);


    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query  // Sorting // Pagination
    const courses = await Course.find(mongoQuery).sort(req.query.sort).skip(skip).limit(limit);


    res.status(200).json({
      status: "success",
      count: courses.length,
      data: {
        courses,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch courses: ${error.message}`,
    });
  }
};
```


A typical endpoint combines all techniques together.

Example request:

```
GET /api/v1/courses?category=Backend&rating[gte]=4.5&sort=-price&page=2&limit=5
```

The server can:

1. Remove reserved fields (`sort`, `page`, `limit`)
2. Convert bracket notation (`rating[gte]`) into MongoDB operators
3. Apply optional case-insensitive matching
4. Filter matching documents
5. Sort the results
6. Paginate the response

This pattern is commonly used in production REST APIs.

---

# Summary

| Feature                         | Example                                        |
| ------------------------------- | ---------------------------------------------- |
| Exact filter                    | `Course.find({ category: "Backend" })`         |
| Case-insensitive filter         | `$regex` + `$options: "i"`                     |
| Dynamic query parameters        | `Course.find(req.query)`                       |
| Exclude fields                  | Remove `sort`, `page`, `limit` before querying |
| Range filtering                 | `$gte`, `$gt`, `$lte`, `$lt`, `$in`            |
| URL range syntax                | `rating[gte]=4.5`                              |
| Convert URL operators           | Custom parser to generate `$gte`, `$lt`, etc.  |
| Dynamic case-insensitive search | Convert string values to regex with `i` flag   |
| Sorting                         | `.sort("price")` or `.sort("-price")`          |
| Pagination                      | `.skip(skip).limit(limit)`                     |

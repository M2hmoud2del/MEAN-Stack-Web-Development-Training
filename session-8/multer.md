# 📂 File Uploads with Multer in Express.js

## 🧠 Overview

When building REST APIs, you often need users to upload files such as profile pictures or course thumbnails.

Express cannot handle `multipart/form-data` by itself, so we use **Multer**, a middleware that processes uploaded files and makes them available through `req.file` or `req.files`.


---

# 1️⃣ Install Multer

Install Multer using npm:

```bash
npm install multer
```

Multer parses `multipart/form-data` requests and processes uploaded files.

---

# 2️⃣ Organize the Upload Folder

A common project structure is:

```text
uploads/
│
├── courses/
│
└── users/
```

* `uploads/courses/` stores course images.
* `uploads/users/` stores user profile images.

---

# 3️⃣ Sending Files from Postman

When testing uploads:

1. Select **Body**
2. Choose **form-data**
3. Add your normal fields as **Text**
4. Change the image field type from **Text** to **File**
5. Select the file

Example:

| Key      | Type | Value          |
| -------- | ---- | -------------- |
| title    | Text | Node.js Course |
| price    | Text | 199            |
| category | Text | Backend        |
| imageUrl | File | course.jpg     |

Do **not** send JSON when uploading files.

---

# 4️⃣ Basic Multer Usage

```js
const multer = require("multer");

const storage = multer.diskStorage({});

const upload = multer({
  storage,
});
```

Use it as middleware:

```js
router.post(
  "/",
  upload.single("imageUrl"),
  courseControllers.createCourse
);
```

`upload.single("imageUrl")` means Multer expects one uploaded file with the field name `imageUrl`.

After uploading:

```js
req.file
```

contains information about the uploaded file.

---

# 5️⃣ Configure Storage

Instead of saving everything in one folder, configure Multer to store files based on the route.

```js
const fs = require("fs");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "uploads";

    if (req.baseUrl.includes("courses")) {
      dest = "uploads/courses";
    } else if (req.baseUrl.includes("users") || req.baseUrl.includes("auth")) {
      dest = "uploads/users";
    }

    try {
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    } catch (err) {
      cb(err, null);
    }
  },

  filename: function (req, file, cb) {
    let extension = file.mimetype.split("/")[1];

    let filename = file.originalname;

    if (req.baseUrl.includes("courses")) {
      filename = `course-${Date.now()}.${extension}`;
    } else if (req.baseUrl.includes("users") ||  req.baseUrl.includes("auth")) {
      filename = `user-${Date.now()}.${extension}`;
    }

    cb(null, filename);
  },
});
```

## Explanation

### `destination`

Determines where the uploaded file should be stored.

* `/courses` → `uploads/courses`
* `/users` → `uploads/users`

The folder is created automatically if it doesn't exist.

### `filename`

Generates a unique filename based on:

* entity type (`course` or `user`)
* current timestamp
* original file extension

Example:

```text
course-1753456789012.png
```

---

# 6️⃣ Filter Uploaded Files

Accept only image files.

```js
const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];

  if (fileType === "image") {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};
```

This rejects PDFs, ZIP files, videos, and other unsupported formats.

---

# 7️⃣ Create a Reusable Multer Middleware

```js
const multer = require("multer");
const fs = require("fs");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = "uploads";

    if (req.baseUrl.includes("courses")) {
      dest = "uploads/courses";
    } else if (req.baseUrl.includes("users") || req.baseUrl.includes("auth")) {
      dest = "uploads/users";
    }

    try {
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    } catch (err) {
      cb(err, null);
    }
  },

  filename: function (req, file, cb) {
    let fileName = file.originalname;
    let fileType = file.mimetype.split("/")[1];
    if (req.baseUrl.includes("courses")) {
      fileName = `course-${Date.now()}.${fileType}`;
    } else if (req.baseUrl.includes("users") || req.baseUrl.includes("auth")) {
      fileName = `user-${Date.now()}.${fileType}`;
    }

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];

  if (fileType == "image") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter });

module.exports = upload;
```

---

# 8️⃣ Use Multer in Routes

```js
const multerUpload = require("../middleware/multer-middleware");

router.post(
  "/",
  multerUpload.single("imageUrl"),
  courseControllers.createCourse
);
```

Now uploaded files are available inside:

```js
req.file
```

---

# 9️⃣ Save the Uploaded Filename in MongoDB

Store only the filename, not the file itself.

```js
const newCourse = await Course.create({
  ...req.body,
  category,
  level,
  imageUrl: req.file?.filename,
});
```

Example document:

```json
{
  "title": "Node.js",
  "imageUrl": "course-1753456789012.png"
}
```

---

# 🔟 Remove Uploaded Files When an Error Occurs

Suppose validation fails after the image is uploaded.

Without cleanup, the file remains on disk and becomes unused.

Create a Helper Function for Deleting Files

Instead of repeating deletion logic, create a reusable function:

Add Separate File and Make general for any folder

`utils/delete-uploaded-file.js`
```js
function deleteUploadedFile(foldername, filename) {
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    foldername,
    filename
  );

  fs.unlink(filePath).catch((err) => {
    console.log("Error deleting file:", err.message);
  });
}
module.exports = deleteUploadedFile;
```
then import it in controllers
```js
const deleteUploadedFile = require("../utils/delete-uploaded-file");
```


---

# 1️⃣1️⃣ Create a Course

```js
const createCourse = async (req, res) => {
  try {
    const category = req.body.category?.toLowerCase();
    const level = req.body.level?.toLowerCase();

    const newCourse = await Course.create({
      ...req.body,
      category,
      level,
      imageUrl: req.file?.filename,
    });

    res.status(201).json({
      status: "success",
      message: "Course added successfully",
      data: {
        course: newCourse,
      },
    });
  } catch (error) {
    if (req.file) {
      deleteUploadedFile("courses", req.file.filename);
    }
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
```

---


# 1️⃣2️⃣ Update a Course Image

Use Multer during updates:

```js
router.patch(
  "/:id",
  multerUpload.single("imageUrl"),
  courseControllers.updateCourse
);
```

Controller:

```js
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found",
      });
    }

    if (req.body.category) {
      req.body.category = req.body.category.toLowerCase();
    }

    if (req.body.level) {
      req.body.level = req.body.level.toLowerCase();
    }

    if (req.file) {
      req.body.imageUrl = req.file.filename;
      if (course.imageUrl) deleteUploadedFile("courses", course.imageUrl);

    }

    Object.assign(course, req.body);

    const updatedCourse = await course.save();

    res.status(200).json({
      status: "success",
      data: {
        course: updatedCourse,
      },
    });
  } catch (error) {
    if (req.file) {
      deleteUploadedFile("courses", req.file.filename);
    }

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
```

If a new image is uploaded:

* The old image is deleted.
* The database stores the new filename.

If the update fails:

* The newly uploaded image is removed to prevent orphan files.

---

# 1️⃣3️⃣ Delete the Image When Deleting a Course

```js
const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found",
      });
    }

    if (deletedCourse.imageUrl) {
      deleteUploadedFile("courses", deletedCourse.imageUrl);
    }

    res.status(200).json({
      status: "success",
      data: {
        course: deletedCourse,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
```

This keeps the uploads folder clean by removing unused images.

---

# 1️⃣4️⃣ Serve Uploaded Images

Uploaded images are static files.

Expose them using Express:

```js
app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));
```

Now a stored filename like:

```text
course-1753456789012.png
```

can be accessed at:

```text
http://localhost:5000/uploads/courses/course-1753456789012.png
```

For user images:

```text
http://localhost:5000/uploads/users/user-1753456789012.png
```

---


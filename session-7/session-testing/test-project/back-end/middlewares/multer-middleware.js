const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = "uploads/";

        if (req.baseUrl.includes("courses")) {
            uploadPath = "uploads/courses/";
        } else if (
            req.baseUrl.includes("users") ||
            req.baseUrl.includes("auth")
        ) {
            uploadPath = "uploads/users/";
        }

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1];

        let filename;

        if (req.baseUrl.includes("courses")) {
            filename = `course-${Date.now()}.${extension}`;
        } else if (
            req.baseUrl.includes("users") ||
            req.baseUrl.includes("auth")
        ) {
            filename = `user-${Date.now()}.${extension}`;
        } else {
            filename = `file-${Date.now()}.${extension}`;
        }

        cb(null, filename);
    },
});

const fileFilter = (req, file, cb) => {
    const fileTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
    ];

    if (fileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
});

const uploadMiddleware = (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                status: "error",
                message: err.message,
            });
        }

        if (err) {
            return res.status(400).json({
                status: "error",
                message: err.message,
            });
        }

        next();
    });
};

module.exports = { uploadMiddleware };
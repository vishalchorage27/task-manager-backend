require("dotenv").config();
const express = require("express");
const app = express();
require("./db")();
app.use(express.json());
const taskRoutes = require("./routes/taskRoutes");
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ success: true, message: "API Running!" });
});

app.use("/api/tasks", taskRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Error Handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || "Server Error"
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

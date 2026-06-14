const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const task = require("../models/taskSchema");

// GET
router.get(
    "/",
    asyncHandler(async (req, res) => {
        const response = await task.find();
        if (response.length === 0) {
            return res.status(200).json({ message: "No tasks found" });
        }
        res.status(200).json(response);
    })
);

// POST
router.post(
    "/",
    asyncHandler(async (req, res) => {
        const data = req.body;
        if (!data.taskName || data.taskName.trim() === "") {
            return res.status(400).json({ message: "Task name is required" });
        }
        const response = await new task(data).save();
        res.status(201).json(response);
    })
);

// PUT
router.put(
    "/:id",
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "No data to update" });
        }
        const response = await task.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
        if (!response) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.status(201).json(response);
    })
);

// DELETE
router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const response = await task.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Deleted successfully" });
    })
);

module.exports = router;

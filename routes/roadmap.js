const express = require("express")
const { generateRoadmap } = require("../controllers/roadmapController")
const { validateRoadmapRequest } = require("../middleware/validation")

const router = express.Router()

// POST /api/roadmap/generate
router.post("/generate", validateRoadmapRequest, generateRoadmap)

module.exports = router

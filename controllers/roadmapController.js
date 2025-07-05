const { analyzeUserDataWithAI } = require("../services/aiService")
const { formatRoadmapResponse } = require("../utils/responseFormatter");

const generateRoadmap = async (req, res) => {
  try {
    const userInput = req.body;

    // Simulate AI analysis (replace with actual AI service call)
    const aiAnalysis = {
      skillGapAnalysis: {
        currentStrengths: ["JavaScript", "React"],
        skillsToLearn: ["Advanced Python", "System Design"],
        criticalGaps: ["DSA optimization"],
      },
      learningPath: {
        phases: [
          {
            phase: "Learning Phase",
            duration: "1 month",
            focus: "Deepen knowledge in technologies",
            skills: userInput.technologies,
            resources: ["LeetCode", "Udemy", "Coursera"],
            milestones: ["Complete 50 DSA problems"],
          },
        ],
      },
    };

    // Format the response
    const roadmap = formatRoadmapResponse(aiAnalysis, userInput);

    res.status(200).json({
      success: true,
      data: roadmap,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error generating roadmap:", error);

    res.status(500).json({
      success: false,
      error: "Failed to generate roadmap",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

module.exports = {
  generateRoadmap,
};
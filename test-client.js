const axios = require("axios")

const testRoadmapGeneration = async () => {
  try {
    const testData = {
      dreamJob: "Full Stack Developer",
      timePeriod: "6 months",
      knowledgeQuestions: [
        {
          question: "How familiar are you with JavaScript?",
          answer:
            "I know basic syntax and can write simple functions, but I'm not comfortable with advanced concepts like closures or async programming.",
        },
        {
          question: "Do you have experience with React?",
          answer: "I've built a few small projects with React, but I struggle with state management and hooks.",
        },
        {
          question: "What's your experience with backend development?",
          answer: "I've never built a backend API, but I understand the concept of REST APIs.",
        },
        {
          question: "How comfortable are you with databases?",
          answer: "I've used MySQL for basic CRUD operations in school projects.",
        },
        {
          question: "Do you know version control (Git)?",
          answer: "I use Git for personal projects but haven't collaborated with others using it.",
        },
      ],
    }

    console.log("Testing roadmap generation...")

    const response = await axios.post("http://localhost:3000/api/roadmap/generate", testData, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("✅ Success!")
    console.log("Response:", JSON.stringify(response.data, null, 2))
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message)
  }
}

// Run the test
testRoadmapGeneration()

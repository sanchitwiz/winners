const axios = require("axios")

const GROK_API_URL = "https://api.x.ai/v1/chat/completions"

const analyzeUserDataWithAI = async ({ dreamJob, timePeriod, knowledgeQuestions }) => {
  try {
    if (!process.env.XAI_API_KEY) {
      throw new Error("XAI_API_KEY environment variable is not set")
    }

    // Prepare the prompt for Grok
    const prompt = createAnalysisPrompt(dreamJob, timePeriod, knowledgeQuestions)

    const response = await axios.post(
      GROK_API_URL,
      {
        model: "grok-beta",
        messages: [
          {
            role: "system",
            content:
              "You are an expert career counselor and learning path designer. Analyze user data and create comprehensive, actionable career roadmaps.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.XAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      },
    )

    if (!response.data.choices || response.data.choices.length === 0) {
      throw new Error("No response from AI service")
    }

    return response.data.choices[0].message.content
  } catch (error) {
    console.error("AI Service Error:", error.response?.data || error.message)

    if (error.response?.status === 401) {
      throw new Error("Invalid API key for AI service")
    } else if (error.response?.status === 429) {
      throw new Error("AI service rate limit exceeded")
    } else if (error.code === "ECONNABORTED") {
      throw new Error("AI service request timeout")
    }

    throw new Error(`AI analysis failed: ${error.message}`)
  }
}

const createAnalysisPrompt = (dreamJob, timePeriod, knowledgeQuestions) => {
  const questionsText = knowledgeQuestions
    .map((q, index) => `${index + 1}. ${q.question}\n   Answer: ${q.answer}`)
    .join("\n\n")

  return `
Please analyze this user's career preparation data and create a detailed, personalized roadmap:

**Target Role:** ${dreamJob}
**Preparation Time:** ${timePeriod}

**Current Knowledge Assessment:**
${questionsText}

Based on this information, please provide:

1. **Skill Gap Analysis**: Identify what skills they need vs what they currently have
2. **Learning Path**: Step-by-step roadmap broken down by time periods
3. **Priority Areas**: Most critical skills to focus on first
4. **Resources**: Specific learning resources, courses, or materials
5. **Milestones**: Key checkpoints and goals to track progress
6. **Timeline**: Realistic timeline for each phase of preparation

Please structure your response as a comprehensive JSON object with the following format:
{
  "skillGapAnalysis": {
    "currentStrengths": [],
    "skillsToLearn": [],
    "criticalGaps": []
  },
  "learningPath": {
    "phases": [
      {
        "phase": "Phase 1",
        "duration": "weeks/months",
        "focus": "main focus area",
        "skills": [],
        "resources": [],
        "milestones": []
      }
    ]
  },
  "priorityAreas": [],
  "recommendedResources": {
    "courses": [],
    "books": [],
    "projects": [],
    "tools": []
  },
  "timeline": {
    "totalDuration": "${timePeriod}",
    "phases": []
  }
}

Make the roadmap specific, actionable, and tailored to their current knowledge level and target role.
`
}

module.exports = {
  analyzeUserDataWithAI,
}

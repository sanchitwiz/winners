const Joi = require("joi")

const roadmapRequestSchema = Joi.object({
  dreamJob: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Dream job is required",
    "string.min": "Dream job must be at least 2 characters long",
    "string.max": "Dream job must not exceed 100 characters",
  }),

  timePeriod: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Time period is required",
    "string.min": "Time period must be at least 2 characters long",
    "string.max": "Time period must not exceed 50 characters",
  }),

  knowledgeQuestions: Joi.array()
    .items(
      Joi.object({
        question: Joi.string().min(5).max(500).required(),
        answer: Joi.string().min(1).max(1000).required(),
      }),
    )
    .min(1)
    .max(20)
    .required()
    .messages({
      "array.min": "At least 1 knowledge question is required",
      "array.max": "Maximum 20 knowledge questions allowed",
    }),
})

const validateRoadmapInput = (req, res, next) => {
  const requiredFields = [
    "track",
    "skillLevel",
    "technologies",
    "dsaInvolvement",
    "currentProjects",
    "experience",
    "timeCommitment",
    "timeline",
    "targetCompanies",
    "integrations",
  ];

  const errors = [];

  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      errors.push(`Missing field: ${field}`);
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

module.exports = {
  validateRoadmapInput,
};

// module.exports = {
//   validateRoadmapRequest,
// }

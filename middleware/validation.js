const Joi = require("joi");

const roadmapRequestSchema = Joi.object({
  track: Joi.string().required(),
  skillLevel: Joi.string().required(),
  technologies: Joi.array().items(Joi.string()).required(),
  dsaInvolvement: Joi.string().required(),
  currentProjects: Joi.string().required(),
  experience: Joi.string().required(),
  timeCommitment: Joi.string().required(),
  timeline: Joi.string().required(),
  targetCompanies: Joi.array().items(Joi.string()).required(),
  integrations: Joi.array().items(Joi.string()).required()
});

const validateRoadmapInput = (req, res, next) => {
  const { error } = roadmapRequestSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: error.details.map(detail => detail.message)
    });
  }

  next();
};

module.exports = {
  validateRoadmapInput,
};

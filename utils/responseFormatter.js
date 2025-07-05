const formatRoadmapResponse = (aiResponse, userInput) => {
  return {
    id: generateRoadmapId(),
    dreamJob: userInput.targetCompanies.join(", "),
    timePeriod: userInput.timeline,
    createdAt: new Date().toISOString(),
    roadmap: aiResponse,
    metadata: {
      aiModel: "grok-beta",
      version: "1.0",
      processingTime: new Date().toISOString(),
    },
  };
};

const generateRoadmapId = () => {
  return "roadmap_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
};

module.exports = {
  formatRoadmapResponse,
};

// const generateRoadmapId = () => {
//   return "roadmap_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
// }

// module.exports = {
//   formatRoadmapResponse,
// }

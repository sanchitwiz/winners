# Career Roadmap Backend Server

A Node.js Express server that generates personalized career roadmaps using AI analysis.

## Features

- 🚀 RESTful API for roadmap generation
- 🤖 AI-powered analysis using Grok API
- ✅ Input validation and sanitization
- 🛡️ Security middleware (Helmet, CORS, Rate limiting)
- 📝 Comprehensive logging
- 🔧 Error handling and recovery

## Setup

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment setup:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Edit `.env` and add your XAI API key:
   \`\`\`
   XAI_API_KEY=your_actual_api_key_here
   \`\`\`

3. **Start the server:**
   \`\`\`bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   \`\`\`

## API Endpoints

### POST /api/roadmap/generate

Generate a personalized career roadmap.

**Request Body:**
\`\`\`json
{
  "dreamJob": "Full Stack Developer",
  "timePeriod": "6 months",
  "knowledgeQuestions": [
    {
      "question": "How familiar are you with JavaScript?",
      "answer": "I know basic syntax and can write simple functions"
    },
    {
      "question": "Do you have experience with databases?",
      "answer": "I've used MySQL for a few small projects"
    }
  ]
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "roadmap_1234567890_abc123",
    "dreamJob": "Full Stack Developer",
    "timePeriod": "6 months",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "roadmap": {
      "skillGapAnalysis": { ... },
      "learningPath": { ... },
      "priorityAreas": [ ... ],
      "recommendedResources": { ... },
      "timeline": { ... }
    }
  }
}
\`\`\`

### GET /health

Health check endpoint.

## Error Handling

The API returns structured error responses:

\`\`\`json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "dreamJob",
      "message": "Dream job is required"
    }
  ],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

## Rate Limiting

- 100 requests per 15 minutes per IP
- Configurable via environment variables

## Security Features

- Helmet.js for security headers
- CORS protection
- Request size limits
- Input validation and sanitization
- Rate limiting

## Development

\`\`\`bash
# Install nodemon for development
npm install -g nodemon

# Run in development mode
npm run dev
\`\`\`

## Deployment

1. Set environment variables in your hosting platform
2. Ensure XAI_API_KEY is properly configured
3. Set NODE_ENV=production
4. Deploy using your preferred method (Vercel, Heroku, etc.)

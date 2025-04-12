# Sahil's Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS for the Interns Prescreening Assignment. This project showcases my skills as a developer and includes an interactive AI chatbot.

## Live Demo

[View the live website](https://sahil-portfolio.netlify.app) (Replace with your actual deployed URL)

## 📋 Features

- **Interactive UI** - Clean, modern design with smooth animations
- **Responsive Design** - Fully responsive on all device sizes
- **Personal Introduction** - Brief overview of skills and experience
- **Projects Showcase** - Highlighting key projects with descriptions and links
- **Skills Section** - Visual representation of technical skills
- **Downloadable Resume** - Direct link to download the latest resume
- **Contact Information** - Easy ways to get in touch
- **AI-Powered Chatbot** - Interactive assistant that provides information about my skills and experience

## 🤖 Chatbot Integration

The website features an AI-powered chatbot that:
- Answers questions about my skills, projects, and experience
- Provides direct links to GitHub repositories
- Helps visitors find the information they need
- Uses multiple LLM providers with smart fallback:
  - Groq API (Primary)
  - Google Gemini API
  - Hugging Face API
  - Local response engine

## 🛠️ Technologies Used

### Frontend
- React.js
- Tailwind CSS
- React Icons

### Development & Deployment
- Git/GitHub for version control
- Netlify for deployment
- Environment variables for API key security

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/Sahil420Coder/portfolio
   ```

2. Navigate to the project directory:
   ```
   cd portfolio
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory with your API keys:
   ```
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   REACT_APP_HUGGING_FACE_TOKEN=your_huggingface_token
   REACT_APP_GROQ_API_KEY=your_groq_api_key
   ```

5. Start the development server:
   ```
   npm start
   ```

## 🌐 Deployment

This project is deployed on Netlify. The deployment process is automatic and triggered by pushes to the main branch.

## 📝 Assignment Requirements Met

✅ Personal Portfolio Webpage with all required sections
✅ Integration of AI Chatbot using Groq LLM
✅ Responsive design working on both desktop and mobile
✅ Version control with Git/GitHub
✅ Deployment to a hosting platform
✅ Professional UI/UX design

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- Email: sahilyadav291103@gmail.com
- LinkedIn: [Sahil's LinkedIn](https://www.linkedin.com/in/sahil-yadav-782363278/)
- GitHub: [Sahil420Coder](https://github.com/Sahil420Coder)

## Deployment on Netlify

1. **Fork or clone this repository**

2. **Set up environment variables**
   - Copy `.env.example` to a new file named `.env`
   - Add your API keys to the `.env` file for local development
   - Keep in mind these will NOT be pushed to GitHub due to `.gitignore`

3. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set the build command to `npm run build`
   - Set the publish directory to `build`
   - Add the following environment variables in the Netlify UI:
     - REACT_APP_GEMINI_API_KEY
     - REACT_APP_HUGGING_FACE_TOKEN
     - REACT_APP_GROQ_API_KEY

4. **Netlify will automatically deploy your site**
   - Any future pushes to your GitHub repository will trigger a new deployment

## Local Development

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with your API keys (see `.env.example`)
4. Run `npm start`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Note

The chatbot will still function even without API keys by using local fallback responses, but for the best experience, it's recommended to add at least one API key.

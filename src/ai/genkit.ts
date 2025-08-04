
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// This configuration uses a fallback mechanism.
// It will first try to use the GEMINI_API_KEY from your environment variables (for production).
// If it's not found, it will fall back to the hardcoded key (for local/Firebase Studio development).
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey:
        process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes('YOUR_GEMINI_API_KEY')
          ? process.env.GEMINI_API_KEY
          : 'AIzaSyDo3ahg4cUTIHMNkU_NadC3cQ7OXt-D4HI',
    }),
  ],
});

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({apiKey: "AIzaSyDPTJ7DF3UpsfhI6W5N6RVT1LyIB45end0"})],
});

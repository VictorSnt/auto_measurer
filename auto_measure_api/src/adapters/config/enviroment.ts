import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY must be set in .env file');
}
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
// In production we would set the imgBB api key to retrive the images
export const IMGBB_API_KEY = (
  process.env.IMGBB_API_KEY || 
  ''
);
export const PORT = process.env.PORT? parseInt(process.env.PORT) : 3000;
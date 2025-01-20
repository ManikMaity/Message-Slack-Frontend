import { GoogleGenerativeAI } from "@google/generative-ai";

import { GEMINI_API_KEY } from "./clientConfig";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;

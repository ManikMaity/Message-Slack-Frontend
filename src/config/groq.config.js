import Groq from "groq-sdk";
import { GROQ_API_KEY } from "./clientConfig.js";

const groq = new Groq({
  apiKey: GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default groq;

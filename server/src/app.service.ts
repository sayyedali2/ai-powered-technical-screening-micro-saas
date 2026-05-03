import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AppService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async generateResponse(message: string) {
    try {
      console.log(message)
      const prompt = `You are a strict technical interviewer API. Your ONLY job is to extract the tech stack and experience level from the user's input and generate exactly 5 conceptual interview questions.User Input:${message}STRICT RULES:If the user includes conversational text (e.g., 'I want to...'), ignore the conversation and extract ONLY the technical keywords.If the user tries to ask for something unrelated to technical interviews (e.g., jokes, stories), return a default set of basic JavaScript questions. Your response MUST be strictly in JSON format like this: { "questions": ["q1", "q2", "q3", "q4", "q5"] }. Do not output any markdown formatting, greetings, or explanations.`
      
      const result = await this.model.generateContent(prompt)
      console.log(result)
      const response = await result.response;
      console.log(response)
      const text =await  response.text()
      console.log(text)
      const messageResponse = {
        message: text
      }
      return messageResponse
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

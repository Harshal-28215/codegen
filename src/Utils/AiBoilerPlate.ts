import { GoogleGenerativeAI } from "@google/generative-ai";

let apiKey: string | undefined;
apiKey = process.env.REACT_APP_GENERATIVE_API_KEY;

export function setApiKey(key: string) {
    apiKey = key;
}

export function createChatSession() {
    if (!apiKey) {
        throw new Error("API key is not defined");
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    return model.startChat({
        generationConfig,
        history: [],
    });
}

export function createCodeSession() {
    if (!apiKey) {
        throw new Error("API key is not defined");
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
    });

    const codeGenerationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
    };

    return model.startChat({
        generationConfig: codeGenerationConfig,
        history: [],
    });
}
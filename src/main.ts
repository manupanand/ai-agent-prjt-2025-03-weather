import dotenv from "dotenv";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import readlineSync from "readline-sync";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

// Tools
function getWeatherDetails(city: string = ""): string {
    if (city.toLowerCase() === "newdelhi") return "10°C";
    if (city.toLowerCase() === "bangalore") return "25°C";
    return "Weather data not available for the specified city.";
}

const tools: Record<string, (input: string) => string> = {
    getWeatherDetails,
};
const train_prompt = `
    You are an AI assistant with START, PLAN, ACTION, OBSERVATION, and OUTPUT STATE.
    Wait for the user prompt and first PLAN using available tools.
    After Planning, take the action with appropriate tools and wait for Observation based on Action.
    Once you get the observations, return the AI response based on START prompt and observations.
 
    Strictly follow the JSON output format in examples.

    Available tools:
     - function getWeatherDetails(city:string):string
       getWeatherDetails is a function that accepts a city name as a string and returns the weather details.

    Example: 

    START 
    { "type": "user","user":"What is the sum of weather of New Delhi and Kochi?" }
    { "type": "plan","plan":"I will call the getWeatherDetails function for New Delhi." }
    { "type": "action","function":"getWeatherDetails", "input": "New Delhi" }
    { "type": "observation","observation":"10°C" }
    { "type": "plan","plan":"I will call the getWeatherDetails function for Kochi." }
    { "type": "action","function":"getWeatherDetails", "input": "Kochi" }
    { "type": "observation","observation":"29°C" }
    { "type": "output","output":"The sum of weather of New Delhi and Kochi is 39°C." }
`;
// Messages array
const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: train_prompt },
];

async function Prompt(){

while (true) {
    const query = readlineSync.question(">> ");
    const userMessage = {
        type: "user",
        user: query,
    };
    messages.push({ role: "user", content: JSON.stringify(userMessage) });

    while (true) {
        try {
            const chat = await client.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
            });
            const result = chat.choices[0].message?.content;
            if (result === null) {
                throw new Error("Received null result from API");
            }
            messages.push({ role: "assistant", content: result });
            const call = JSON.parse(result);

            if (call.type === "output") {
                console.log(`Output: ${call.output}`);
                break;
            } else if (call.type === "action") {
                const fn = tools[call.function];
                if (fn) {
                    const observation = fn(call.input);
                    const obs = { type: "observation", observation };
                    messages.push({ role: "developer", content: JSON.stringify(obs) });
                } else {
                    throw new Error(`Invalid function name: ${call.function}`);
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error:", error.message);
            } else {
                console.error("Unknown error:", error);
            }
            break;
        }
    }
}

}
Prompt();
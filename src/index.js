const OpenAI = require("openai");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY); 
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
});

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
    res.json({
        message: "pong",
    });
});

app.post('/chat', async (req, res) => {
    const question = req.body.question;
    console.log({ question });

    try {
        const response = await openai.Completion.create({
            model: "text-davinci-003",
            prompt: question,
            max_tokens: 4000,
            temperature: 0,
        });

        console.log({ response });

        const answer = response.choices[0].text;
        console.log({ answer });

        const array = answer
            ?.split("\n")
            .filter((value) => value)
            .map((value) => value.trim());

        res.json({
            answer: array,
            prompt: question,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

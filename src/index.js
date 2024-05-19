import OpenAI from "openai";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

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
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: question }],
            temperature: 0.7,
        });

        const answer = response.choices[0].message.content;
        res.json({ answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

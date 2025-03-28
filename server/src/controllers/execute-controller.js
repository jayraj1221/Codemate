require("dotenv").config()
const { main } = require("../execute");
const executeCode = async (req, res) => {
    const code = req.body.code;
    const language_id = req.body.language_id;
    const stdin = req.body.stdin;

    if (!code) {
        return res.status(400).json({ error: "Code is required" });
    }

    try {
        // console.log("Executing code...");
        const { type, output } = await main(code, language_id, stdin);

        if (type === 'stdout') {
            res.status(200).json({ success: true, output });
        }
        else if (type === 'stderr') {
            res.status(200).json({ success: false, error: output });
        }
    }
    catch (error) {
        console.error("Error during code execution:", error);
        res.status(500).json({ error: "An error occurred during code execution" });
    }
};

function cmp(a, b)
{
    return a.id < b.id ? -1 : 1;
}

const getLanguages = async (req, res) => {

    const baseUrl = 'https://judge0-ce.p.rapidapi.com';
    const apiKey = process.env.API_KEY;
    // const apiKey = '9ca6e813f8msh2369d4f279cd875p1086f7jsn9e6b171bc3f8';

    // console.log("THIS IS API : " + apiKey);
    // console.log(req);

    const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    try
    {
        const response = await fetch(baseUrl + '/languages', options);
        let result = await response.json();
        
        result = result.filter((l) => l.id <= 80).sort(cmp);

        // console.log(result);

        res.status(200).json({ result: result });
    }
    catch(error)
    {
        // console.log("Error while fetching supported languages: ", error);
        res.status(500).json({ error: "An error occured while fetching supported languages" });
    }
};

module.exports = {
    executeCode,
    getLanguages,
}
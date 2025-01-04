const { main } = require("../../execute");

const executeCode = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).json({ error: "Code is required" });
    }

    try {
        console.log("Executing code...");
        const { type, output } = await main(code);

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

module.exports = {
    executeCode,
}
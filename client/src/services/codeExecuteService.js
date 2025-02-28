class CodeExecuteService
{
    url = "http://localhost:5000/";

    async getSupportedLanguages()
    {
        let response;

        try
        {
            response = await fetch(
                this.url + "api/code/languages",
                {
                    method: "GET"
                }
            );
        }
        catch(err)
        {
            console.log(err);
        }

        // will get result array of objects containing [{ id, name }]
        console.log(response)
        return (await response.json());
    }

    async executeCode(currentFileCode, languageId, stdin)
    {
        let response;
        try
        {
            response = await fetch(
                this.url + "api/code/execute",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        code: currentFileCode,
                        language_id: languageId,
                        stdin: stdin
                    })
                }
            );
        }
        catch(err)
        {
            console.log(err);
        }

        return (await response.json());
    }
}

export default CodeExecuteService;
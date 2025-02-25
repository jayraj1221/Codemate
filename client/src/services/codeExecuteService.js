class CodeExecuteService
{
    url = import.meta.env.VITE_BACKEND_URL;

    async getSupportedLanguages()
    {
        let response;

        try
        {
            response = await fetch(
                url + "api/code/languages",
                {
                    method: "GET"
                }
            );
        }
        catch(err)
        {
            console.log(err);
        }

        return (await response.json());
    }

    async executeCode(currentFileCode, languageId)
    {
        let response;
        try
        {
            response = await fetch(
                url + "api/code/execute",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        code: currentFileCode,
                        language_id: languageId
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
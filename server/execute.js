const baseUrl = 'https://judge0-ce.p.rapidapi.com';
const apiKey = process.env.API_KEY;

async function execute(code) {
  const url = `${baseUrl}/submissions?base64_encoded=false&wait=true`;
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      language_id: 52,
      source_code: code,
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error in execute:', error);
    throw new Error('Failed to submit code.');
  }
}

async function getSubmission(token) {
  const url = `${baseUrl}/submissions/${token}?base64_encoded=false&fields=stdout,stderr,status_id,compile_output`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    },
  };

  try {

    const response = await fetch(url, options);
    const res = await response.json();
    console.log(res);
    if (res.status_id === 3) {
      return { type: 'stdout', output: res.stdout };
    }
    else if (res.status_id >= 4) {
      if (res.compile_output) {
        return { type: 'stderr', output: res.compile_output };
      }
      else if (res.stderr) {
        return { type: 'stderr', output: res.stderr };
      }
      else {
        return { type: 'stderr', output: 'Unknown Error.' };
      }
    }
    else {
      console.log('Still processing... Retrying in 1 second.');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error('Error in getSubmission:', error);
    throw new Error('Failed to retrieve submission result.');
  }
}

async function main(code) {
  const submissionResult = await execute(code);
  if (submissionResult && submissionResult.token) {
    return await getSubmission(submissionResult.token);
  } else {
    throw new Error('Submission token not found!');
  }
}

module.exports = { main };
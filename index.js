const apiAccessToken = "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";

async function generateJoke(keyword, category) {
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    
    const prompt=`Take the role of a content creator.Generate me a ${category} having keywords ${keyword} in 300 words. Write it in rhymic style.Generate actual content.`;

    console.log(prompt)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiAccessToken}`
    };

  // Define the data for the API request
  const data = {
    prompt: prompt,
    max_tokens: 300,
    temperature: 0.7,
    n: 2,
  };

  // Make a POST request to the ChatGPT API
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  });

  // Extract the generated joke from the response
  const jsonData = await response.json();
  console.log(jsonData)
  const joke = jsonData.choices[0].text.trim();

  const jokeContainer = document.querySelector(".output");
  jokeContainer.innerText = joke;
  console.log(joke)
}


document.getElementById('generateButton').addEventListener('click', () => {
    let category = document.getElementById("category");
    value = category.options[category.selectedIndex].text;
    let sample = document.getElementById("desc");
    keyword = sample.value;
    generateJoke(keyword, value);
});

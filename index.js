const url = "https://api.openai.com/v1/completions";

function getHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
        "Accept-Charset": "utf-8"
    };
}

const promptInput = document.getElementById("prompt");
const completeBtn = document.getElementById("btn-complete");
const resultDiv = document.getElementById("result");
const apiKeyInput = document.getElementById("api-key");

let apiKey = "";

// save api key input
apiKeyInput.value = localStorage.getItem("apiKey");
apiKeyInput.addEventListener("change", () => {
    localStorage.setItem("apiKey", apiKeyInput.value);
    apiKey = apiKeyInput.value;
});

// load api key input and restore apiKeyInput
apiKey = localStorage.getItem(" apiKey");
apiKeyInput.value = apiKey;



completeBtn.addEventListener("click", async () => {
    resultDiv.innerHTML = "";
	const prompt = promptInput.value.trim();

	if (prompt === "") {
		alert("Please enter a prompt");
		return;
	}

	// Clear previous results
    resultDiv.style.display = "block";

    // Show the result div
    resultDiv.style.display = "block";

    // Create the request body
    const requestBody = {
        "prompt": prompt,
        "max_tokens": 1,
        "n": 1,
        "stop": "",
        "model": "text-davinci-003",
        "logprobs": 5,
        "temperature": 0,
    };

    // Send the request to OpenAI's API
    const response = await fetch(url, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (response.ok) {
        console.log(data);
        let choices = data.choices[0]
        if (choices.finish_reason != "stop") {
            choices = choices.logprobs.top_logprobs[0];

            // Loop through each word in the completed text and add it to the animation div
            for (let [word, logProbability] of Object.entries(choices)) {
                // Create a div for the word and its probability
                let wordDiv = document.createElement("div");
                wordDiv.classList.add("word");
                wordDiv.innerText = word;
        
                // Find the probability for the word
                let probability = Math.round(Math.exp(logProbability) / (1 + Math.exp(logProbability)) * 10000) / 100;
                let probabilityDiv = document.createElement("div");
                probabilityDiv.classList.add("probability");
                probabilityDiv.innerText = probability + "%";
                console.log(word, probability);    
        
                // Add the probability divs to the word div
                wordDiv.appendChild(probabilityDiv);
        
                // Add the word div to the result
                resultDiv.appendChild(wordDiv)
            }
        
            // Set the completed text to the text result div
            let new_input_str = promptInput.value + data.choices[0].text;
            console.log(new_input_str);
            promptInput.value = new_input_str;
        }
    }
});
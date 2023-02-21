const apiKey = "API_KEY";
const url = "https://api.openai.com/v1/completions";
const headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer " + apiKey,
};

const promptInput = document.getElementById("prompt");
const completeBtn = document.getElementById("btn-complete");
const resultDiv = document.getElementById("result");
const textResult = document.getElementById("text-result");
const animationDiv = document.getElementById("animation");

completeBtn.addEventListener("click", async () => {
	const prompt = promptInput.value;

	if (prompt === "") {
		alert("Please enter a prompt");
		return;
	}

	// Clear previous results
	textResult.innerHTML = "";
    animationDiv.innerHTML = "";
    resultDiv.style.display = "block";
    textResult.innerHTML = "";
    animationDiv.innerHTML = "";

    // Show the result div
    resultDiv.style.display = "block";

    // Create the request body
    const requestBody = {
        "prompt": prompt,
        "max_tokens": 1,
        "n": 1,
        "stop": "\n",
        "model": "davinci",
        "logprobs": 5
    };

    // Send the request to OpenAI's API
    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (response.ok) {
        const choices = data.choices[0].text.trim().split(" ");
    
        // Loop through each word in the completed text and add it to the animation div
        for (let i = 0; i < choices.length; i++) {
            const word = choices[i];
    
            // Create a div for the word and its probability
            const wordDiv = document.createElement("div");
            wordDiv.classList.add("word");
            wordDiv.innerText = word;
    
            // Find the probability for the word
            const wordKey = word.replace(/\s/g, "");
            const probabilityMap = data.choices[0].logprobs.top_logprobs[0];
            let probabilityDivs = [];
    
            for (let key in probabilityMap) {
                if (key.toLowerCase().includes(wordKey)) {
                    const logProbability = probabilityMap[key];
                    const probability = Math.round(Math.exp(logProbability) / (1 + Math.exp(logProbability)) * 10000) / 100;
                    const probabilityDiv = document.createElement("div");
                    probabilityDiv.classList.add("probability");
                    probabilityDiv.innerText = probability + "%";
                    probabilityDivs.push(probabilityDiv);
                    console.log(word, probability);
                }
            }
    
            // Add the probability divs to the word div
            if (probabilityDivs.length === 1) {
                wordDiv.appendChild(probabilityDivs[0]);
            } else if (probabilityDivs.length > 1) {
                const probabilityContainer = document.createElement("div");
                probabilityContainer.classList.add("probability-container");
    
                probabilityDivs.forEach(probabilityDiv => {
                    probabilityContainer.appendChild(probabilityDiv);
                });
    
                wordDiv.appendChild(probabilityContainer);
            }
    
            // Add the word div to the animation div with a delay
            setTimeout(() => {
                animationDiv.appendChild(wordDiv);
            }, i * 500);
        }
    
        // Set the completed text to the text result div
        textResult.innerText = data.choices[0].text;
    } else {
        // Show an error message if the request fails
        textResult.innerText = "Error: " + data.error.message;
    }
    
      
    
});
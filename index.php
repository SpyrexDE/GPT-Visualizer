<!DOCTYPE html>
<html>
<head>
	<title>OpenAI Language Model Text Completion Visualization</title>
	<style>
        * {
            transition: all 0.2s ease-in-out;
        }
		body {
			font-family: Arial, sans-serif;
			margin: 0;
			padding: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100vh;
			background-color: #f2f2f2;
		}

		#prompt {
			margin-bottom: 20px;
			padding: 10px;
			border: none;
			border-radius: 5px;
			width: 400px;
			font-size: 16px;
		}

		#btn-complete {
			background-color: #4CAF50;
			color: white;
			border: none;
			padding: 10px;
			border-radius: 5px;
			font-size: 16px;
			cursor: pointer;
		}

		#result {
			margin-top: 20px;
			padding: 20px;
			border: 1px solid #ddd;
			border-radius: 5px;
			background-color: white;
			display: none;
			width: 600px;
		}

		#animation {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			margin-top: 10px;
			height: 50px;
		}

		.word {
			padding: 5px;
			margin: 5px;
			border-radius: 5px;
			font-size: 16px;
			text-align: center;
			background-color: #ddd;
			min-width: 50px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 50px;
		}

		.probability {
			font-size: 12px;
			margin-top: 5px;
		}
	</style>
</head>
<body>
	<h1>OpenAI Language Model Text Completion Visualization</h1>
	<input type="text" id="prompt" placeholder="Type a text prompt here">
	<button id="btn-complete">Complete Text</button>
	<div id="result">
		<p id="text-result"></p>
		<div id="animation"></div>
	</div>

	<script src="index.js"></script>
</body>
</html>

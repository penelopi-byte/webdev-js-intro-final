"use strict";

window.onload = function() {
    console.log("DOM fully loaded");

    // Get references to HTML elements
    const submissionBtn = document.getElementById("submit-btn");
    const restartBtn = document.getElementById("restart-btn");
    
    // Check if the buttons exist
    console.log("Submit button: ", submissionBtn);
    console.log("Restart button: ", restartBtn);

    // If any of the buttons are not found, log an error and stop execution
    if (!submissionBtn || !restartBtn) {
        console.error("Couldn't find the buttons! Make sure the HTML is correct.");
        return; // Stop script if buttons are missing
    }

    let randomNumber = generateRandomNumber();
    let guessCount = 0;
    const maxGuesses = 3;
    let guessHistory = [];

    // Get the rest of the elements
    const guessMessageElement = document.getElementById("guess-message");
    const currentGuessElement = document.getElementById("current-guess");
    const computerGuessElement = document.getElementById("computer-guess");
    const guessHistoryElement = document.getElementById("guess-history");
    const guessInputElement = document.getElementById("guess-input");

    // Function to generate a random number between 1 and 10
    function generateRandomNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    // Function to handle a guess from the player
    function handleGuess() {
        const playerGuess = parseInt(guessInputElement.value);

        // Check if the input is valid
        if (isNaN(playerGuess) || playerGuess < 1 || playerGuess > 10) {
            guessMessageElement.textContent = "Please enter a number between 1 and 10.";
            return;
        }

        // Update guess history
        guessHistory.push(playerGuess);
        guessCount++;
        currentGuessElement.textContent = playerGuess;
        guessHistoryElement.textContent = guessHistory.join(", ");

        // Compare guess with the randomly generated number
        if (playerGuess === randomNumber) {
            guessMessageElement.textContent = "You Win!";
            endGame();
        } else if (guessCount >= maxGuesses) {
            guessMessageElement.textContent = `You Lose! The number was ${randomNumber}.`;
            computerGuessElement.textContent = randomNumber;
            endGame();
        } else if (playerGuess > randomNumber) {
            guessMessageElement.textContent = "Too high! Try again.";
        } else {
            guessMessageElement.textContent = "Too low! Try again.";
        }
    }

    // Function to end the game
    function endGame() {
        submissionBtn.disabled = true;
        restartBtn.disabled = false;
    }

    // Function to restart the game
    function restartGame() {
        // Reset game state
        randomNumber = generateRandomNumber();
        guessCount = 0;
        guessHistory = [];
        guessMessageElement.textContent = "";
        currentGuessElement.textContent = "";
        computerGuessElement.textContent = "";
        guessHistoryElement.textContent = "";
        guessInputElement.value = "";

        submissionBtn.disabled = false;
        restartBtn.disabled = true;
    }

    // Add event listeners for the buttons
    submissionBtn.addEventListener("click", handleGuess);
    restartBtn.addEventListener("click", restartGame);
};

import fs from "fs";
import path from "path";
import { exec } from "child_process";

// Get the path to the 'myfile.txt' in the current directory
const filePath = path.join(process.cwd(), "myfile.txt");

// Function to append a random number to the file
const appendRandomNumberToFile = () => {
  // Generate a random number
  const randomNumber = Math.floor(Math.random() * 1000); // Random number between 0 and 999

  // Read the current content of the file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    // Append the random number to the existing content
    const updatedContent = data + `\nRandom Number: ${randomNumber}`;

    // Write the updated content back to the file
    fs.writeFile(filePath, updatedContent, (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log(`Random Number ${randomNumber} added to the file!`);
        // Call the function to run Git commands after updating the file
        executeGitCommands(randomNumber);
      }
    });
  });
};

// Function to run the Git commands
const executeGitCommands = (randomNumber) => {
  // Git add, commit, and push commands
  exec("git add .", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error with git add: ${stderr}`);
      return;
    }
    console.log("Files added to git.");

    exec(`git commit -m "commit ${randomNumber}"`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error with git commit: ${stderr}`);
        return;
      }
      console.log(`Committed with message: commit ${randomNumber}`);

      exec("git push", (err, stdout, stderr) => {
        if (err) {
          console.error(`Error with git push: ${stderr}`);
          return;
        }
        console.log("Changes pushed to the repository.");
      });
    });
  });
};

// Run the function every 5 seconds (5000 ms) to append the random number
setInterval(appendRandomNumberToFile, 5000);

// Run the git commands and file update every 1 minute (60000 ms)
setInterval(() => {
  appendRandomNumberToFile();
}, 60000);

// Optionally, run immediately once if needed
appendRandomNumberToFile();

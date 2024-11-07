import fs from "fs";
import path from "path";

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
      }
    });
  });
};

// Run the function every 5 seconds (5000 ms)
setInterval(appendRandomNumberToFile, 5000);

appendRandomNumberToFile();

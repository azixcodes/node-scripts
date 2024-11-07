import { exec } from "child_process";

// Function to run the ipconfig command
const executeCommand = () => {
  exec("ipconfig", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing command: ${stderr}`);
    } else {
      console.log(`Command output:\n${stdout}`);
    }
  });
};

// Run the command every 5 seconds (5000 ms)
setInterval(executeCommand, 5000);

// Execute immediately if needed
executeCommand();

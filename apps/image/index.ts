import fs from "fs/promises";
import Together from "together-ai";
import * as path from "path";

// Initialize Together API with your API Key
const together = new Together({ apiKey: process.env.TOGETHER_AI_API_KEY });

// Function to read an image and convert it to Base64
async function convertImageToBase64(imagePath) {
  try {
    const data = await fs.readFile(imagePath);
    return data.toString("base64");
  } catch (error) {
    console.error("Error reading image file:", error);
    throw error;
  }
}

// Function to call Together API to add text in the background
async function addTextToImage(base64Image, promptText) {
  // console.log(base64Image);
  try {
    const response = await together.images.create({
      model: "black-forest-labs/FLUX.1-schnell", // Replace with your model
      prompt: promptText,
      image: base64Image,
      width: 1024,
      height: 768,
      steps: 4,
      n: 1,
      // response_format: "b64_json",
    });

    console.log(response);
    // Return the Base64 image from the response
    // return response.data[0].url;
  } catch (error) {
    console.error("Error calling Together API:", error);
    throw error;
  }
}

// Function to save the Base64 response image as a file
async function saveBase64Image(base64Image, outputPath) {
  try {
    const binaryString = atob(base64Image);
    const binaryArray = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));

    // Write the binary array as a file
    await fs.writeFile(outputPath, binaryArray);
    console.log("Image saved successfully to", outputPath);
  } catch (error) {
    console.error("Error saving image:", error);
    throw error;
  }
}

// Main function to orchestrate the process
(async function main() {
  const inputImagePath = path.join(import.meta.dir, "/tmp/input-image.jpg"); // Path to input image
  console.log(inputImagePath);
  const outputImagePath = path.join(import.meta.dir, "/tmp/output-image.jpg"); // Path to save the output image
  const promptText = "describe the image"; // Text to add in the background

  try {
    // Step 1: Convert the image to Base64
    const base64Image = await convertImageToBase64(inputImagePath);

    // Step 2: Call Together API to add text to the image
    const editedImageBase64 = await addTextToImage(base64Image, promptText);
    //
    // // Step 3: Save the Base64 image returned by Together API to file
    // await saveBase64Image(editedImageBase64, outputImagePath);
  } catch (error) {
    console.error("Error during the process:", error);
  }
})();

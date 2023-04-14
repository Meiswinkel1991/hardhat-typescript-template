import * as fs from "fs";
import path from "path";

interface Serializable {
  [key: string]: any;
}

export function saveObjectAsJson(objectToSave: Serializable, fileName: string, folderpath: string): void {
  const folderPath = path.resolve(folderpath);

  // Create the folder if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  // Write the JSON string to a file
  const filePath = `${folderPath}/${fileName}.json`;

  let jsonString;
  if (fs.existsSync(filePath)) {
    const existingData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    let updateData = { ...existingData, ...objectToSave };
    jsonString = JSON.stringify(updateData, null, 2);
  } else {
    jsonString = JSON.stringify(objectToSave, null, 2); // Use 2 spaces
  }

  fs.writeFileSync(filePath, jsonString, { encoding: "utf-8" });

  console.log(`Object saved as JSON at: ${filePath}`);
}

export {};

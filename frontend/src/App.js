import React, { useState } from "react";

import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [wordCounts, setWordCounts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!selectedFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData);

    axios
      .post("http://localhost:3001/upload", formData)
      .then((response) => {
        setWordCounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1>Text Analyzer</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload"}
      </button>
      {isLoading && <p>Processing the file...</p>}
      {wordCounts.length > 0 && (
        <div>
          <h2>Word Count:</h2>
          <ul>
            {wordCounts.map((wordCount) => (
              <li key={wordCount.word}>
                {wordCount.word} - {wordCount.count}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

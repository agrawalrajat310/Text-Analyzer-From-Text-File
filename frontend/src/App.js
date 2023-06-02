import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [wordCounts, setWordCounts] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios
      .post('http://localhost:3001/upload', formData)
      .then((response) => {
        setWordCounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Text Analyzer</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
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

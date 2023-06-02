import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FileUpload extends React.Component {
  state = {
    selectedFile: null,
    wordCounts: null,
  };

  handleFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleFileUpload = () => {
    const { selectedFile } = this.state;
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios
      .post('http://localhost:3001/upload', formData)
      .then((response) => {
        this.setState({ wordCounts: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { wordCounts } = this.state;

    return (
      <div>
        <h1>Text Analyzer</h1>
        <input type="file" onChange={this.handleFileChange} />
        <button onClick={this.handleFileUpload}>Upload</button>
        {wordCounts && (
          <div>
            <h2>Word Count:</h2>
            <ul>
              {Object.entries(wordCounts).map(([word, count]) => (
                <li key={word}>
                  {word} - {count}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<FileUpload />, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

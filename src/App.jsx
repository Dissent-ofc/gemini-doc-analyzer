import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setAnalysis("");
      setError("");
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    setLoading(true);
    setError("");
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      const response = await axios.post(`${API_BASE_URL}/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnalysis(response.data.analysis);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the document. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        
        <header className="header">
          <h1>Gemini Doc Analyzer</h1>
          <p>Upload a PDF to unlock AI-powered insights instantly.</p>
        </header>

        <div className="upload-box">
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
            className="file-input"
          />
          
          <button 
            onClick={handleAnalyze} 
            disabled={!file || loading}
            className="analyze-btn"
          >
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                Analyzing...
              </div>
            ) : (
              "Analyze Document"
            )}
          </button>
        </div>

        {error && <div className="error-box">{error}</div>}

        {analysis && (
          <div className="result-section">
            <h2 className="result-title">Analysis Results</h2>
            <div className="markdown-content">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
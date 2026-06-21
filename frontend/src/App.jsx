import { useState } from "react";
import axios from 'axios';
import { UploadCloud, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const analyzeResume = async () => {
    if (!file || !jobDescription) {
      alert("Please upload a resume and provide a job description.");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await axios.post('http://localhost:8080/api/v1/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("An error occurred while analyzing the resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            AI-Powered Resume Analyzer
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Optimize your resume for Applicant Tracking Systems and land your dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Input Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume (PDF)
              </label>
              <div
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-500 transition-colors bg-gray-50 cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF up to 10MB</p>
                  {file && <p className="text-sm font-semibold text-blue-600 mt-2">{file.name}</p>}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-2">
                Target Job Description
              </label>
              <textarea
                id="job-description"
                rows={8}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-xl p-4 bg-gray-50 border resize-none"
                placeholder="Paste the complete job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <button
              onClick={analyzeResume}
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Resume...
                </span>
              ) : (
                'Analyze Resume'
              )}
            </button>
          </div>

          {/* Right Column: Results Dashboard */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
            {!result && !loading && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4 min-h-[400px]">
                <AlertCircle className="w-16 h-16 opacity-50" />
                <p className="text-lg">Upload your resume and job description to see the magic.</p>
              </div>
            )}

            {loading && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4 min-h-[400px]">
                <svg className="animate-spin h-16 w-16 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-lg text-blue-500 animate-pulse">Running AI Analysis...</p>
              </div>
            )}

            {result && (
              <div className="space-y-8 animate-fade-in-up">
                {/* Score Section */}
                <div className="flex items-center space-x-8">
                  <div className="w-32 h-32 flex-shrink-0">
                    <CircularProgressbar
                      value={result.atsScore}
                      text={`${result.atsScore}%`}
                      styles={buildStyles({
                        pathColor: getScoreColor(result.atsScore),
                        textColor: '#1f2937',
                        trailColor: '#f3f4f6',
                        textSize: '24px',
                        pathTransitionDuration: 1.5
                      })}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">ATS Match Score</h2>
                    <p className="text-gray-600 text-lg">{result.matchStatus}</p>
                  </div>
                </div>

                {/* Missing Keywords */}
                {result.missingKeywords && result.missingKeywords.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <XCircle className="w-5 h-5 text-red-500 mr-2" /> Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.missingKeywords.map((keyword, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths */}
                {result.strengths && result.strengths.length > 0 && (
                   <div>
                   <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                     <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Your Strengths
                   </h3>
                   <ul className="space-y-2 text-sm text-gray-600">
                      {result.strengths.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                   </ul>
                 </div>
                )}

                {/* Weaknesses */}
                {result.weaknesses && result.weaknesses.length > 0 && (
                   <div>
                   <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                     <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" /> Areas to Improve
                   </h3>
                   <ul className="space-y-2 text-sm text-gray-600">
                      {result.weaknesses.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                   </ul>
                 </div>
                )}

                {/* Suggestions */}
                {result.suggestions && result.suggestions.length > 0 && (
                   <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                   <h3 className="text-lg font-semibold text-blue-900 mb-3">Actionable Suggestions</h3>
                   <ul className="space-y-2 text-sm text-blue-800">
                      {result.suggestions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 mr-2 flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                   </ul>
                 </div>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

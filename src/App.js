import './App.css';
import React, { useState } from 'react';
import { ClipLoader } from "react-spinners";

const API_KEY = "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";

function App() {
  // const [activity, setActivity] = useState("");
  const [plan, setPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [internship, setInternship] = useState("");
  const [hackathon, setHackathon] = useState("");
  const [olympiad, setOlympiad] = useState("");

  async function generatePlan() {
    setIsLoading(true);

    const promptText = `For a student aiming to study ${selectedMajor}, with internship experience in: ${internship}, participation in hackathons like: ${hackathon}, and achievements in olympiads such as: ${olympiad}. Generate a tailored personal plan to enhance their application.`;


    const APIBody = {
      "model": "text-davinci-003",
      "prompt": promptText,
      "temperature": 0.5,
      "max_tokens": 150
    };

    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify(APIBody)
    })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      setPlan(data.choices[0].text.trim());
      setIsLoading(false);
    })
    .then((data) => {
      let formattedPlan = data.choices[0].text.trim().replace(/([0-9]+\.) /g, '\n$1 ');
      setPlan(formattedPlan);
      setIsLoading(false);
    });
  }

  return (
    <div className="App">

      <div>
        <label>Major:</label>
        <select 
            className="major-dropdown"
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
        >
            <option value="">Select a major</option>
            <option value="Anthropology">Anthropology</option>
            <option value="Biology">Biology</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Economics">Economics</option>
            <option value="English">English</option>
            <option value="Environmental Science">Environmental Science</option>
            <option value="History">History</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Nursing">Nursing</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Physics">Physics</option>
        </select>
      </div>

      <div>
        <label>Internships:</label>
        <input
          type="text"
          value={internship}
          onChange={(e) => setInternship(e.target.value)}
          placeholder="Enter your internship details"
        />
      </div>

      <div>
        <label>Hackathons:</label>
        <input
          type="text"
          value={hackathon}
          onChange={(e) => setHackathon(e.target.value)}
          placeholder="Enter hackathons you've participated in"
        />
      </div>

      <div>
        <label>Olympiads:</label>
        <input
          type="text"
          value={olympiad}
          onChange={(e) => setOlympiad(e.target.value)}
          placeholder="Enter olympiads you've achieved in"
        />
      </div>

      <button onClick={generatePlan}>Generate Plan</button>
      {isLoading && <ClipLoader color="#4A90E2" />}
      <div>
        {plan && (
          <div>
            <h3>Personal Plan:</h3>
            <p>{plan}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
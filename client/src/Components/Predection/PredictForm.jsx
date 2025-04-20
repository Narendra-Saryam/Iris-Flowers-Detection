import React, { useState } from 'react';

const PredictForm = () => {
  const [inputs, setInputs] = useState({ 
    sepal_length: '', 
    sepal_width: '', 
    petal_length: '', 
    petal_width: '' 
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const classNames = ['Iris Setosa', 'Iris Versicolor', 'Iris Virginica'];

  const API_URL = import.meta.env.DEV 
    ? 'http://localhost:5000/predict'  // Local development
    : 'https://iris-flowers-detection.onrender.com/predict';  // Production

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sepal_length: parseFloat(inputs.sepal_length),
          sepal_width: parseFloat(inputs.sepal_width),
          petal_length: parseFloat(inputs.petal_length),
          petal_width: parseFloat(inputs.petal_width)
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Prediction failed');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="predict-form bg-[#13005A] min-h-screen pt-20 p-10 md:p-20 flex flex-col items-center justify-between">
      <h2 className='text-white font-bold p-4 text-2xl md:text-4xl'>Iris Species Predictor</h2>
      <form
      className='flex flex-col gap-8 p-2 md:p-4 text-white' 
      onSubmit={handleSubmit}>
        <div className='flex flex-wrap gap-6'>
          <div className="form-group">
            <label>Sepal Length : </label>
            <input
              className='rounded-md bg-black bg-opacity-20 border-white border-t-2 border-b-2' 
              type="number"
              step="0.1"
              name="sepal_length"
              placeholder="(cm)"
              value={inputs.sepal_length}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Sepal Width : </label>
            <input
              className='rounded-md bg-black bg-opacity-20 border-white border-t-2 border-b-2'
              type="number"
              step="0.1"
              name="sepal_width"
              placeholder="(cm)"
              value={inputs.sepal_width}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Petal Length : </label>
            <input
              className='rounded-md bg-black bg-opacity-20 border-white border-t-2 border-b-2'
              type="number"
              step="0.1"
              name="petal_length"
              placeholder="(cm)"
              value={inputs.petal_length}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Petal Width : </label>
            <input
              className='rounded-md bg-black bg-opacity-20 border-white border-t-2 border-b-2'
              type="number"
              step="0.1"
              name="petal_width"
              placeholder="(cm)"
              value={inputs.petal_width}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Species'}
        </button>
      </form>

      {error && <div className="error-message">Error: {error}</div>}

      {result && (
        <div className="prediction-result w-full text-white flex flex-col items-center justify-between gap-4 mb-4 md:mb-4 p-4 md:p-6 bg-blue-500">
          <h3>Prediction Result:</h3>
          <p>Species: <strong>{result.species}</strong></p>
          <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
          <div className="probability-distribution">
            <h4>Probabilities:</h4>
            {Object.entries(result.probabilities).map(([species, prob]) => (
              <div key={species}>
                {species}: {(prob * 100).toFixed(1)}%
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictForm;
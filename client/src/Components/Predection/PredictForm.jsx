import React, { useState } from 'react';
import setosaImg from '../../assets/setosa.jpg';
import versicolorImg from '../../assets/versicolore.jpg';
import virginicaImg from '../../assets/virginica.jpg';

const speciesImages = {
  'Iris Setosa': setosaImg,
  'Iris Versicolor': versicolorImg,
  'Iris Virginica': virginicaImg,
};

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
    ? 'http://localhost:5000/predict'
    : 'https://iris-flowers-detection.onrender.com/predict';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sepal_length: parseFloat(inputs.sepal_length),
          sepal_width: parseFloat(inputs.sepal_width),
          petal_length: parseFloat(inputs.petal_length),
          petal_width: parseFloat(inputs.petal_width)
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Prediction failed');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="predict-form bg-[#13005A] h-screen p-6 md:p-10 flex flex-col items-center">
      <h2 className='text-white font-bold pt-16 text-2xl md:text-4xl text-center'>Iris Species Predictor</h2>
      <form
        className='flex flex-col gap-8 mt-8 w-full max-w-4xl items-center text-white' 
        onSubmit={handleSubmit}>
        
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 w-full justify-center'>
          {['sepal_length', 'sepal_width', 'petal_length', 'petal_width'].map((name, index) => (
            <div className="form-group flex flex-col" key={name}>
              <label className='mb-1 capitalize'>{name.replace('_', ' ')}:</label>
              <input
                className='rounded-md bg-black bg-opacity-20 border-blue-500 border-t-2 border-b-2 p-2 text-white'
                type="number"
                step="0.1"
                name={name}
                placeholder="(cm)"
                value={inputs[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        <button
          className='mt-4 bg-opacity-60 bg-gradient-to-tr from-[#2973B2] via-[#13005A] to-[#2973B2] font-semibold hover:bg-gradient-to-tl hover:from-[#2973B2] hover:via-[#13005A] hover:to-[#2973B2] rounded-full px-6 py-2' 
          type="submit"
          disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Species'}
        </button>
      </form>

      {error && <div className="mt-4 text-red-400">Error: {error}</div>}
      
      <div className="prediction-result w-full mt-10 text-white flex flex-col items-center p-4 md:p-6 bg-blue-500 bg-opacity-80 rounded-xl">
        <h3 className='text-xl bg-[#13005A] bg-opacity-70 p-2 rounded-lg font-semibold mb-4'>Prediction Result:</h3>
        {result && (
          <div className='flex flex-col md:flex-row gap-6 items-center justify-around w-full'>
            <div className='bg-[#13005A] bg-opacity-70 p-4 rounded-xl'>
              <h4 className='font-semibold'>Species Image:</h4>
              <img
                src={result && speciesImages[result.species]}
                alt={result.species}
                className='max-w-[150px] rounded-md shadow-lg border-green-500'
              />
            </div>
            <div className='bg-[#13005A] bg-opacity-70 p-4 rounded-xl'>
              <p>Species: <strong className='text-green-500'>{result.species}</strong></p>
              <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
            </div>
            <div className='bg-[#13005A] bg-opacity-70 p-4 rounded-xl'>
              <div className="probability-distribution">
                <h4 className='font-semibold'>Probabilities:</h4>
                {Object.entries(result.probabilities).map(([species, prob]) => (
                  <div key={species}>
                    {species}: {(prob * 100).toFixed(1)}%
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictForm;

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
      <div className="predict-form bg-[#212121] h-screen flex flex-col items-center">
      <h2 className='text-white font-bold pt-12 sm:pt-14 md:pt-20 text-2xl md:text-4xl text-center'>Iris Species Predictor</h2>
      <form
        className='gap-8 my-4 md:mt-8 w-full max-w-4xl text-white bg-gradient-to-tr from-[#2973B2] via-[#13005A] to-[#2973B2] p-[1.8px] rounded-xl' 
        onSubmit={handleSubmit}>
          
        <div className='bg-[#303030] flex flex-col gap-4 md:gap-8 max-w-4xl items-center rounded-xl py-2 md:py-6 px-6 md:px-10'>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 w-full'>
            {['sepal_length', 'sepal_width', 'petal_length', 'petal_width'].map((name, index) => (
              <div className="form-group flex flex-col" key={name}>
                <label className='mb-1 capitalize text-sm tracking-wide'>{name.replace('_', ' ')}:</label>
                <input
                  className='rounded-md bg-black bg-opacity-40 border border-blue-500 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
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
            className=' bg-opacity-60 bg-gradient-to-tr from-[#2973B2] via-[#13005A] to-[#2973B2] font-semibold hover:bg-gradient-to-tl hover:from-[#2973B2] hover:via-[#13005A] hover:to-[#2973B2] rounded-full px-6 p-2' 
            type="submit"
            disabled={loading}>
            {loading ? 'Predicting...' : 'Predict Species'}
          </button>
        </div>

      </form>

      {error && <div className="mt-4 text-red-400">Error: {error}</div>}
      
      <div className="prediction-result w-full bg-gradient-to-tr from-green-500 via-[#13005A] to-green-500 p-[1.8px] rounded-xl">
        <div className=' w-full  text-white flex flex-col items-center p-4 md:p-6 bg-[#303030]  rounded-xl'>
        <h3 className='text-xl bg-[#414141] p-2 rounded-lg font-semibold mb-4'>Prediction Result:</h3>
        {result && (
          <div className='md:flex grid grid-cols-2 md:flex-row gap-6 items-center justify-around w-full'>
            <div className='bg-[#414141] bg-opacity-70 p-4 rounded-xl'>
              <h4 className='font-semibold'>Species Image:</h4>
              <img
                src={result && speciesImages[result.species]}
                alt={result.species}
                className='max-w-[150px] rounded-md shadow-lg border-green-500'
              />
            </div>
            
            <div className='bg-[#414141] bg-opacity-70 p-4 rounded-xl'>
              <p>Species: <strong className='text-green-500'>{result.species}</strong></p>
              <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
            </div>
            <div className='bg-[#414141] bg-opacity-70 p-4 rounded-xl'>
            <div className="probability-distribution">
              <h4 className='font-semibold'>Probabilities:</h4>
              {Object.entries(result.probabilities).map(([species, prob]) => (
                <div key={species} className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{species}</span>
                    <span>{(prob * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-1">
                    <div
                      className="bg-green-500 h-1 rounded"
                      style={{ width: `${prob * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default PredictForm;

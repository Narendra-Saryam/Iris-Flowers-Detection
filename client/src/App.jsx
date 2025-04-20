
import React, {useState,useEffect } from 'react'
import PredictForm from './Components/Predection/PredictForm'
import Navebar from './Components/Navebar/Navebar'
import Footer from './Components/Footer/Footer'
import Results from './Components/Results/Results'

const App = () => {
  return (
    <div className='bg-[#171d32] h-auto w-full overflow-hidden'>
      <Navebar />
      <PredictForm />
      <Results />
      <Footer />
    </div>
  )
}

export default App
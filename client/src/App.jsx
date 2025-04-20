
import PredictForm from './Components/Predection/PredictForm'
import Navebar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <div className='bg-[#171d32] h-auto w-full overflow-hidden'>
      <Navebar />
      <PredictForm />
      <Footer />
    </div>
  )
}

export default App
import React from 'react'

const Navebar = () => {
  return (
    <div className='fixed left-0 right-0 z-50 p-1 md:p-2 flex flex-row gap-4 sm:gap-0 w-full text-white bg-black bg-opacity-30 items-center justify-between'>
        <h1 className='text-lg sm:text-xl text-center sm:text-left'>Iris Flowers Classification</h1>
        <div className='flex flex-wrap justify-center sm:justify-end gap-4 md:gap-8'>
            <a className='bg-opacity-60 bg-gradient-to-tr from-[#2973B2] via-[#13005A] to-[#2973B2] font-semibold hover:bg-gradient-to-tl hover:from-[#2973B2] hover:via-[#13005A] hover:to-[#2973B2] rounded-full p-2 text-sm sm:text-base' href='https://github.com/Narendra-Saryam/Iris-Flowers-Detection/blob/main/server/About.txt'>About</a>
            <a className='bg-opacity-60 bg-gradient-to-tr from-[#2973B2] via-[#13005A] to-[#2973B2] font-semibold hover:bg-gradient-to-tl hover:from-[#2973B2] hover:via-[#13005A] hover:to-[#2973B2] rounded-full p-2 text-sm sm:text-base' href='https://github.com/Narendra-Saryam/Iris-Flowers-Detection'>Source Code</a>
        </div>
    </div>
  )
}

export default Navebar

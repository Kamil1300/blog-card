import { CardDemo } from '@/components/cards'
import { ModeToggle } from '@/components/toggle'
import {Header} from '@/components/header'
import '@/app/globals.css'


import { FC } from 'react'

interface pageProps {}

const Home: FC<pageProps> = ({}) => {
  return (
    <>
      <Header/>
    <div className='lg:m-10 m-3'>
      <div className="lg:mx-20 mx-8">
      <ModeToggle/>
      </div>
      <div className='flex items-center flex-wrap justify-center m-8 gap-6'>
        <CardDemo className='card-effect fade-in'/>
      </div>

    </div>
    </>
  )
}

export default Home
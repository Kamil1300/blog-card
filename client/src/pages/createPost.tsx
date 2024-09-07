import { CardDemo } from '@/components/cards'
import { ModeToggle } from '@/components/toggle'
import {InputWithButton} from '@/components/input'
import {Header} from '@/components/header'
import '@/app/globals.css'


import { FC } from 'react'

interface pageProps {}

const CreatePost: FC<pageProps> = () => {
  return (
    <>
      <Header/>
    <div className='lg:m-10 m-3'>
      <div className="lg:mx-20 mx-8">
      <ModeToggle/>
      </div>

        <div className='flex flex-col items-center'>
        <InputWithButton />
        </div>
        

    </div>
    </>
  )
}

export default CreatePost
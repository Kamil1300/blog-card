import { CardDemo } from '@/components/cards'
import { ModeToggle } from '@/components/toggle'


import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  return (
    <div className=''>
      <ModeToggle />

      <div className='flex items-center flex-wrap justify-center m-8 gap-6'>
        <CardDemo />
      </div>

    </div>
  )
}

export default page
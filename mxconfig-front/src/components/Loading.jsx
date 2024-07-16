import { Spinner } from '@material-tailwind/react'
import React from 'react'

export default function Loading() {
  return (
    <div className=' w-full h-screen flex items-center justify-center'>
      <Spinner className="h-12 w-12 " />
    </div>
  )
}

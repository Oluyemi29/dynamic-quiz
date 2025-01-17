"use client"
import React from 'react'
import { ImFilesEmpty } from "react-icons/im";

type EmptyProps={
    Heading:string,
    Messages:string
}
const EmptyList = ({Heading,Messages}:EmptyProps) => {
  return (
    <div className='w-full flex flex-col justify-center items-center h-screen'>
      <div>
        <ImFilesEmpty size={32} color='red'/>
        <h1 className='text-faidBlue my-1 text-lg font-semibold'>{Heading}</h1>
        <h1 className='text-faidBlue my-1 text-sm '>{Messages}</h1>
      </div>
    </div>
  )
}

export default EmptyList

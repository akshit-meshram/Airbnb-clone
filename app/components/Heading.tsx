'use client'


interface HeadingProps {
    title: string
    subtitle?: string
    center?: boolean
}

import React from 'react'

const Heading:  React.FC<HeadingProps> = ({
    title,
    subtitle,
    center
}) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className='text-2xl font-bold'>
        {title}
      </div>
      <div className='font-light text-neutral-500 mt-2'>
        {subtitle}
      </div>
    </div>
  )
}

export default Heading

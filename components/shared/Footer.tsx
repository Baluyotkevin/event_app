import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row'>
        <Link href='/'
        >
          <Image
          src="/assets/images/Eventmeet.svg"
          alt="logo"
          width={128}
          height={38}
          />
        </Link>

        <a className='text-purple-400' target="_blank" href='https://www.linkedin.com/in/kevin-baluyot-2102b5bb/'>LinkedIn</a>
        <a className='text-purple-400' target="_blank" href='https://github.com/Baluyotkevin'>Github</a>
        <p>2024 EventMeet. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
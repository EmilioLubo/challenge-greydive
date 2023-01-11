import React from 'react'
import { SocialIcon } from 'react-social-icons'

const Footer = () => {
  return (
    <footer className='w-100'>
        <div className='d-flex justify-content-around align-items-center gap-3 p-5'>
            <SocialIcon  target="_blank" rel="noopener noreferrer" url='https://github.com/EmilioLubo' network='github'/>
            <h6>© Emilio Lubo - 2022</h6>
            <SocialIcon target="_blank" rel="noopener noreferrer" url='https://www.linkedin.com/in/emilio-daniel-lubo-83a444220/' network='linkedin'/>
        </div>
    </footer>
  )
}

export default Footer
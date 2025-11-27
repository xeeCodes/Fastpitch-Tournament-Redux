import React from 'react'
import ball from '../assets/softball.jpg'

function Footer() {
  return (
<footer className="footer footer-horizontal footer-center bg-black text-white py-4 px-10">
  <aside>
          <img src={ball} alt='footer ball' className='w-10 color-white'/>

    <p className="font-bold">
      ACME Industries Ltd.
      <br />
      Providing reliable tech since 1992
    </p>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a>
<i className="fa-brands fa-facebook"></i>      </a>
      <a>
<i className="fa-brands fa-instagram"></i>
      </a>
      <a>
           <i className="fa-brands fa-youtube"></i>

      </a>
    </div>
  </nav>
</footer>
  )
}

export default Footer
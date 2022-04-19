import React from 'react'
import './socials.scss'
import { Link } from 'react-router-dom'

function Socials() {
  return (
    <div id='socials-icons' className='col-md-4 d-flex justify-content-center align-items-center gap-3'>
        <Link to={""}>
         <img src="https://www.cinemaplus.az/site/templates/images/fb.png" alt="social-icon"></img>
         </Link>
         <Link to={""}>
         <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJjb21wX3g1Rl8zMzUtdGVsZWdyYW0iPjxnPjxwYXRoIGQ9Ik00ODQuNjg5LDk4LjIzMWwtNjkuNDE3LDMyNy4zN2MtNS4yMzcsMjMuMTA1LTE4Ljg5NSwyOC44NTQtMzguMzA0LDE3Ljk3MkwyNzEuMiwzNjUuNjMxbC01MS4wMzQsNDkuMDg2ICAgIGMtNS42NDcsNS42NDctMTAuMzcyLDEwLjM3Mi0yMS4yNTYsMTAuMzcybDcuNTk4LTEwNy43MjJMNDAyLjUzOSwxNDAuMjNjOC41MjMtNy41OTgtMS44NDgtMTEuODA5LTEzLjI0Ny00LjIxTDE0Ni45NSwyODguNjE0ICAgIEw0Mi42MTksMjU1Ljk2Yy0yMi42OTQtNy4wODYtMjMuMTA0LTIyLjY5NSw0LjcyMy0zMy41NzlMNDU1LjQyMyw2NS4xNjZDNDc0LjMxNiw1OC4wODEsNDkwLjg1LDY5LjM3NSw0ODQuNjg5LDk4LjIzMXoiIGZpbGw9IiNmZmZmZmYiLz48L2c+PC9nPjxnIGlkPSJMYXllcl8xIi8+PC9zdmc+" alt="social-icon"></img>
         </Link>
         <Link to={""}>
         <img src="https://www.cinemaplus.az/site/templates/images/youtube.png" alt="social-icon"></img>
         </Link>
         <Link to={""}>
         <img src="https://www.cinemaplus.az/site/templates/images/instagram.png" alt="social-icon"></img>
         </Link>
    </div>
  )
}

export default Socials
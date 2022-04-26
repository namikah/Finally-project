import React from 'react'
import './trailer.scss'

function Trailer({url}) {
  return (
    <section id="owl-trailer">
    <div className="video-player">
      <iframe
        width="100%"
        height="600px"
        src={url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </section>
  )
}

export default Trailer
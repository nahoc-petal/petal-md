import React from 'react'

const renderArtists = (artists) => (
  artists.map((d, idx) => {
    let isLastElement = false
    idx + 1 === artists.length ? isLastElement = true : null
    return (<span key={idx}>{d.name}{!isLastElement ? ', ' : null}</span>)
  })
)

const Disc = (props) => (
  <div className="randomDisc">
    <h1 className="title">{renderArtists(props.artists)} - {props.title}</h1>
    <h2 className="subtitle">{props.year !== 0 ? props.year : <br/>}</h2>
    <iframe 
      type="text/html" 
      width="640" 
      height="360"
      src={props.youtubeVideoUrlEmbed}
      frameBorder="0"
      onLoad={props.iframeLoaded}
    />
  </div>
)

export default Disc

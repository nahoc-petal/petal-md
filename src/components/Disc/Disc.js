import React from 'react'
import PropTypes from 'prop-types'

const renderArtists = (artists) => (
  artists.map((d, idx) => {
    let isLastElement = false
    idx + 1 === artists.length ? isLastElement = true : null
    return (<span key={idx}>{d.name}{!isLastElement ? ', ' : null}</span>)
  })
)

const Disc = (props) => {
  const {
    artists,
    title,
    year,
    youtubeVideoUrlEmbed,
    iframeLoaded,
  } = props
  return(
    <div className="randomDisc">
      <h1 className="title">{renderArtists(artists)} - {title}</h1>
      <h2 className="subtitle">{year !== 0 ? year : <br/>}</h2>
      <iframe 
        type="text/html" 
        width="640" 
        height="360"
        src={youtubeVideoUrlEmbed}
        frameBorder="0"
        onLoad={iframeLoaded}
      />
    </div>
  )
}

Disc.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  artists: PropTypes.array.isRequired,
  iframeLoaded: PropTypes.func.isRequired,
  youtubeVideoUrlEmbed: PropTypes.string.isRequired,
};

export default Disc

import React from 'react'
import PropTypes from 'prop-types'

// renders all artists
// separated by a comma (,)
// if there are more than one
const renderArtists = (artists) => (
  artists.map((d, idx) => {
    let isLastElement = false
    idx + 1 === artists.length ? isLastElement = true : null
    return (<span key={idx}>{d.name}{!isLastElement ? ', ' : null}</span>)
  })
)

// dumb component for a single Disc
const Disc = (props) => {
  const {
    artists,
    title,
    year,
    youtubeVideoUrl,
    iframeLoaded,
  } = props

  return(
    <div className="randomDisc">
      <h1 className="title">{artists ? renderArtists(artists) : null} - {title ? title : null}</h1>
      <h2 className="subtitle">{year && year !== 0 ? year : <br/>}</h2>
      {youtubeVideoUrl ?
        <iframe 
          type="text/html" 
          width="640" 
          height="360"
          src={youtubeVideoUrl}
          frameBorder="0"
          onLoad={iframeLoaded ? iframeLoaded : null}
        />
      : <p className="notification">No YouTube link provided</p>}
    </div>
  )
}

Disc.propTypes = {
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  artists: PropTypes.array.isRequired,
  iframeLoaded: PropTypes.func.isRequired,
  youtubeVideoUrl: PropTypes.string.isRequired,
}

export default Disc

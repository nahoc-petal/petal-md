import React from 'react'
import axios from 'axios'
import Disc from './../Disc/Disc';

export default class RandomDisc extends React.Component {
  state = {
    discs: [],
    randomDisc: null,
    isDoneFetching: false,
    youtubeVideoUrlEmbed: null,
    isLoading: null,
  }

  componentWillMount() {
    const apiUrl = 'https://api.discogs.com/users/ausamerika/collection/folders/0/releases'
    axios.get(apiUrl)
      .then(res => {
        const discs = res.data.releases
        this.setState({ 
          discs, 
          isDoneFetching: true,
        })
      })
  }

  fetchYoutubeVideo(randomDisc) {
    if(randomDisc) {
      const apiUrl = randomDisc.basic_information.resource_url
      axios.get(apiUrl)
        .then(res => {
          if(res.data.videos) {
            const randomNumber = Math.floor((Math.random() * res.data.videos.length))
            const youtubeVideoUrl = res.data.videos[randomNumber].uri
            const youtubeVideoUrlEmbed = 'https://youtube.com/embed/' + youtubeVideoUrl.split('=')[1]
            this.setState({ 
              youtubeVideoUrlEmbed,
            })
          }
        })
    }
  }

  renderRandomDisc() {
    const randomNumber = Math.floor((Math.random() * 50))
    this.setState({
      isLoading: true,
      randomDisc: this.state.discs[randomNumber],
    }, () => this.fetchYoutubeVideo(this.state.randomDisc))
  }

  handleIframeLoaded() {
    this.setState({
      isLoading: false,
    })
  }

  render() {
    const {
      randomDisc,
      isDoneFetching,
      youtubeVideoUrlEmbed,
      isLoading,
    } = this.state

    return (
      <section className="section has-text-centered">
        {randomDisc && youtubeVideoUrlEmbed ?
          <Disc 
            title={randomDisc.basic_information.title} 
            year={randomDisc.basic_information.year} 
            artists={randomDisc.basic_information.artists}
            youtubeVideoUrlEmbed={youtubeVideoUrlEmbed}
            iframeLoaded={() => this.handleIframeLoaded()}
          />
        : <div style={{width: 640, height: 360, background: '#fafafa', margin: 'auto', marginTop: '95px'}} />}
        <br/><br/>
        <button 
          disabled={!isDoneFetching || isLoading} 
          className={isLoading ? "button is-primary is-large is-loading" : "button is-primary is-large"}
          type="button" 
          onClick={() => this.renderRandomDisc()}
        >
          Give me a random tune!
        </button>
      </section>
    )
  }
}

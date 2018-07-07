import React from 'react'
import axios from 'axios'
import Disc from './../../components/Disc/Disc'

export default class RandomDisc extends React.Component {
  state = {
    discs: [],
    randomDisc: null,
    isFetching: true,
    youtubeVideoUrl: null,
    isLoading: null,
  }

  componentWillMount() {
    this.fetchAllDiscs()
  }

  // fetchs all the discs from the discogs API
  fetchAllDiscs = () => {
    const apiUrl = 'https://api.discogs.com/users/ausamerika/collection/folders/0/releases'
    axios.get(apiUrl)
      .then(res => {
        const discs = res.data.releases
        this.setState({ 
          discs, 
          isFetching: false,
        })
      })
  }

  // formats URL to an embed URL
  formatYoutubeUrl = (url) => (
    `https://youtube.com/embed/${url.split('=')[1]}`
  )

  // fetches the youtube video URL
  fetchYoutubeVideo(randomDisc) {
    if(randomDisc) {
      const apiUrl = randomDisc.basic_information.resource_url
      axios.get(apiUrl)
        .then(res => {
          if(res.data.videos) {
            const randomNumber = Math.floor((Math.random() * res.data.videos.length))
            const youtubeVideoUrl = this.formatYoutubeUrl(res.data.videos[randomNumber].uri)
            this.setState({ 
              youtubeVideoUrl,
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
      isFetching,
      youtubeVideoUrl,
      isLoading,
    } = this.state

    return (
      <section className="section has-text-centered">
        {randomDisc && youtubeVideoUrl ?
          <Disc 
            title={randomDisc.basic_information.title} 
            year={randomDisc.basic_information.year} 
            artists={randomDisc.basic_information.artists}
            youtubeVideoUrl={youtubeVideoUrl}
            iframeLoaded={() => this.handleIframeLoaded()}
          />
        : <div style={{width: 640, height: 360, background: '#fafafa', margin: 'auto', marginTop: '95px'}} />}
        <br/><br/>
        <button 
          disabled={isFetching || isLoading} 
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

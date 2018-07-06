import React from 'react'
import axios from 'axios'
import Disc from './../Disc/Disc';

export default class RandomDisc extends React.Component {
  state = {
    discs: [],
    randomDisc: null,
    isDoneFetching: false,
    youtubeVideoUrlEmbed: null,
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
            const youtubeVideoUrl = res.data.videos[0].uri
            const youtubeVideoUrlEmbed = 'https://youtube.com/embed/' + youtubeVideoUrl.split('=')[1]
            this.setState({ 
              youtubeVideoUrlEmbed,
            })
          }
        })
    }
  }

  renderRandomDisc() {
    const randomNumber = Math.floor((Math.random() * 50) + 1)
    this.setState({
      randomDisc: this.state.discs[randomNumber],
    }, () => this.fetchYoutubeVideo(this.state.randomDisc))
  }

  render() {
    const {
      randomDisc,
      isDoneFetching,
      youtubeVideoUrlEmbed,
    } = this.state

    return (
      <section className="section has-text-centered">
        {randomDisc && youtubeVideoUrlEmbed ?
          <Disc 
            title={randomDisc.basic_information.title} 
            year={randomDisc.basic_information.year} 
            artists={randomDisc.basic_information.artists}
            youtubeVideoUrlEmbed={youtubeVideoUrlEmbed}
          />
        : null}
        <button 
          disabled={!isDoneFetching} 
          className="button is-primary is-large" 
          type="button" 
          onClick={() => this.renderRandomDisc()}
        >
          Give me a random tune!
        </button>
      </section>
    )
  }
}

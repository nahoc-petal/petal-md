import React from 'react'
import axios from 'axios'
import Disc from './../../components/Disc/Disc'
import arrowDown from './../../assets/images/arrow-down.svg'

export default class RandomDisc extends React.Component {
  state = {
    randomDisc: null,
    youtubeVideoUrl: null,
    isLoading: true,
    totalAmountOfDiscs: null,
  }

  componentWillMount() {
    this.fetchAllDiscs()
  }

  // fetchs all the discs from the discogs API
  fetchAllDiscs = () => {
    const apiUrl = 'https://api.discogs.com/users/ausamerika/collection/folders/0'
    axios.get(apiUrl)
      .then(res => {
        this.setState({ 
          isLoading: false,
          totalAmountOfDiscs: res.data.count,
        })
      })
  }

  // formats URL to an embed URL
  formatYoutubeUrl = (url) => (
    `https://youtube.com/embed/${url.split('=')[1]}`
  )

  // fetches the youtube video URL from a disc information
  fetchYoutubeVideo(randomDisc) {
    if(randomDisc) {
      const apiUrl = randomDisc.basic_information.resource_url
      if(apiUrl) {
        axios.get(apiUrl)
        .then(res => {
          console.log(res)
            const youtubeVideoUrl = res.data.videos ? this.formatYoutubeUrl(res.data.videos[0].uri) : null
            const doneLoading = youtubeVideoUrl ? false : true
            this.setState({ 
              youtubeVideoUrl,
              isLoading: !doneLoading,
            })
        })
      }
    }
  }

  // fetches a disc from the complete collection
  fetchCollectionPerPage = (page) => {
    console.log(page)
    const apiUrl = `https://api.discogs.com/users/ausamerika/collection/folders/0/releases?per_page=1&page=${page}`
    axios.get(apiUrl)
      .then(res => {
        this.setState({ 
          randomDisc: res.data.releases[0],
        }, () => this.fetchYoutubeVideo(this.state.randomDisc))
      })
  }

  // renders a random disc from the full collection
  renderRandomDisc(totalAmountOfDiscs) {
    const randomNumber = Math.floor((Math.random() * totalAmountOfDiscs))
    const page = Math.floor(randomNumber)

    this.setState({
      isLoading: true,
    }, () => this.fetchCollectionPerPage(page))
  }

  // triggered when iframe is done loading
  handleIframeLoaded() {
    this.setState({
      isLoading: false,
    })
  }

  render() {
    const {
      randomDisc,
      youtubeVideoUrl,
      isLoading,
      totalAmountOfDiscs,
    } = this.state

    return (
      <section className="section has-text-centered">
        {randomDisc ?
          <Disc 
            title={randomDisc.basic_information.title} 
            year={randomDisc.basic_information.year} 
            artists={randomDisc.basic_information.artists}
            youtubeVideoUrl={youtubeVideoUrl}
            iframeLoaded={() => this.handleIframeLoaded()}
          />
        : <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 640, 
              height: 360, 
              background: '#fafafa', 
              margin: 'auto', 
              marginTop: '95px'
            }}
          >
            <img 
              src={arrowDown}
              height="100" 
              width="100"
              alt="Arrow down"
            />
          </div>}
        <br/><br/>
        <button 
          disabled={isLoading} 
          className={isLoading ? "button is-primary is-large is-loading" : "button is-primary is-large"}
          type="button" 
          onClick={totalAmountOfDiscs ? () => this.renderRandomDisc(totalAmountOfDiscs) : null}
        >
          Give me a random tune!
        </button>
      </section>
    )
  }
}

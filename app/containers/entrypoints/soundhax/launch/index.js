import React from 'react'
import { browserHistory } from 'react-router'

import section from '../../../cssModules/section.scss'
import content from '../../../cssModules/content.scss'

import styles from './index.css'

let SoundHax = React.createClass({
  getContent () {
    return <div>
      Launch soundhax...
    </div>
  },
  next () {
    this.props.router.push('/decrypt9/launch')
  },
  render () {
    return (
      <section>
        <h2 className={section.title}>Soundhax Launch</h2>
        <div className={`${section.content} ${styles.center} ${styles.content}`}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={browserHistory.goBack}>Back</div>
          <div className={`${content.button} ${content.buttonNext}`} onClick={this.next}>Next</div>
        </div>
      </section>
    )
  }
})

export default SoundHax

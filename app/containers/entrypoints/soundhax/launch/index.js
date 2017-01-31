import React from 'react'
import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

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
          <RaisedButton label='Back' onClick={browserHistory.goBack} />
          <RaisedButton className={content.buttonNext} label='Next' onClick={this.next} />
        </div>
      </section>
    )
  }
})

export default SoundHax

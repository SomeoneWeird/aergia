import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import section from '../cssModules/section.scss'

export default class HomePage extends Component {
  constructor (props) {
    super(props)
    this.next = this.next.bind(this)
  }
  next () {
    this.props.router.push('/config/model')
  }
  render () {
    return (
      <section className={section.intro}>
        <h2 className={section.title}>Aergia</h2>
        <div className={section.content}>
          <p>An interactive guide to B9S + Luma on your 3DS</p>
          <br />
          <br />
          <RaisedButton label='Start' onClick={this.next} />
        </div>
      </section>
    )
  }
}

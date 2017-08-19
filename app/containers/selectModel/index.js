import React, { Component } from 'react'

import { browserHistory } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

import config from '../../config'

import section from '../cssModules/section.scss'

import s from './index.css'

const images = {
  '2ds': {
    nonXL: require('./images/2ds.png')
  },
  o3ds: {
    nonXL: require('./images/old/nonxl.png'),
    XL: require('./images/old/xl.png')
  },
  n3ds: {
    nonXL: require('./images/new/nonxl.png'),
    XL: require('./images/new/xl.png')
  }
}

class Device extends Component {
  constructor (props) {
    super(props)
  }
  getName () {
    let n = ''
    switch (this.props.model) {
      case '2ds': { n = '2DS'; break }
      case 'o3ds': { n = 'Old 3DS'; break }
      case 'n3ds': { n = 'New 3DS'; break }
    }

    if (this.props.XL) {
      n += ' XL'
    }

    return n
  }
  getImage () {
    console.log('props:', this.props)
    return images[this.props.model][this.props.XL ? 'XL' : 'nonXL']
  }
  render () {
    return (
      <div className={section.device + ' col-xs-4'}>
        <div onClick={this.props.onClick} className={section.deviceName}>{this.getName()}</div>
        <img onClick={this.props.onClick} src={this.getImage()} />
      </div>
    )
  }
}

const totalSteps = 2
const nextScreen = '/config/region'

export default class selectModel extends Component {
  constructor () {
    super()
    this.state = {
      step: 1
    }
    this.goBack = this.goBack.bind(this)
  }
  setModel (model) {
    return () => {
      config.model = model

      if (model === 'o2ds') {
        // Skip next screen if device is a 2DS
        // they don't have XL models
        config.XL = false
        return this.setState({
          ...this.state,
          step: this.state.step + 1
        }, function () {
          this.goForward()
        })
      }

      this.goForward()
    }
  }
  setXL (isXL) {
    return () => {
      config.XL = isXL
      this.goForward()
    }
  }
  goBack () {
    if (this.state.step === 1) {
      // go back
      return browserHistory.goBack()
    } else {
      this.setState({
        ...this.state,
        step: this.state.step - 1
      })
    }
  }
  goForward () {
    if (this.state.step === totalSteps) {
      this.props.router.push(nextScreen)
    } else {
      this.setState({
        ...this.state,
        step: this.state.step + 1
      })
    }
  }
  getContent () {
    switch (this.state.step) {
      case 1: {
        return <div className='row middle-xs'>
          <Device onClick={this.setModel('n3ds')} model='n3ds' />
          <Device onClick={this.setModel('o3ds')} model='o3ds' />
          <Device onClick={this.setModel('o2ds')} model='2ds' />
        </div>
      }
      case 2: {
        return <div className={section.device + ' row'}>
          <Device onClick={this.setXL(true)} model={config.model} XL={true} />
          <Device onClick={this.setXL(false)} model={config.model} XL={false}/>
        </div>
      }
    }
  }
  getTitle () {
    switch (this.state.step) {
      case 1: {
        return 'Select your device model'
      }
      case 2: {
        return 'Is your device an XL model?'
      }
    }
  }
  render () {
    return (
      <section>
        <h2 className={section.title}>{this.getTitle()}</h2>
        <div className={section.content}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <RaisedButton label='Back' onClick={this.goBack} />
        </div>
      </section>
    )
  }
}

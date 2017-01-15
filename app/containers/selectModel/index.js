import React, { Component } from 'react';

import { Link, browserHistory } from 'react-router';

import config from '../../config';

import section from '../cssModules/section.scss';
import content from '../cssModules/content.scss';

const images = {
  twoDS: require('./images/2ds.png'),
  o3DS: require('./images/old/nonxl.jpg'),
  o3DSXL: require('./images/old/xl.png'),
  n3DS: require('./images/new/nonxl.png'),
  n3DSXL: require('./images/new/xl.png')
}

class Device extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className={section.device + " col-xs-6"}>
        <div onClick={this.props.onClick} className={section.deviceName}>{this.props.name}</div>
        <img onClick={this.props.onClick} src={this.props.image} />
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
  getIsXLContent () {
    if (config.model === 'n3ds') {
      return <div className={section.device}>
        <img onClick={this.setXL(true)} src={images.n3DSXL} />
        <img onClick={this.setXL(false)} src={images.n3DS} />
      </div>
    } else {
      return <div className={section.device}>
        <img onClick={this.setXL(true)} src={images.o3DSXL} />
        <img onClick={this.setXL(false)} src={images.o3DS} />
      </div>
    }
  }
  getContent () {
    switch (this.state.step) {
      case 1: {
        return <div className="row middle-xs">
          <Device onClick={this.setModel('n3ds')} name='New 3DS' image={images.n3DS} />
          <Device onClick={this.setModel('o3ds')} name='Old 3DS' image={images.o3DS} />
          <Device onClick={this.setModel('o2ds')} name='2DS' image={images.twoDS} />
        </div>
      }
      case 2: {
        return <div>
          Is your device an XL model?
          {this.getIsXLContent()}
        </div>
      }
    }
  }
  render() {
    return (
      <section>
        <h2 className={section.title}>Model Selection</h2>
        <div className={section.content}>
          {this.getContent()}
        </div>
        <div className={section.navigation}>
          <div className={content.button} onClick={this.goBack}>Back</div>
        </div>
      </section>
    )
  }
}

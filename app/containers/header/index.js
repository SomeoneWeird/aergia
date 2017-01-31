import React from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import open from 'open'

export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sidebarOpen: false
    }
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.openGithub = this.openGithub.bind(this)
  }
  toggleSidebar () {
    this.setState({
      ...this.state,
      sidebarOpen: !this.state.sidebarOpen
    })
  }
  openGithub () {
    open('https://github.com/SomeoneWeird/aergia')
    this.setState({
      ...this.state,
      sidebarOpen: false
    })
  }
  render () {
    return (
      <div style={{width:"100%"}}>
        <AppBar
          title='AERGIA'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
          onLeftIconButtonTouchTap={this.toggleSidebar}
        />
        <Drawer
          docked={false}
          open={this.state.sidebarOpen}
          onRequestChange={(sidebarOpen) => {
            this.setState({
              ...this.state,
              sidebarOpen
            })
          }}
        >
          <MenuItem onClick={this.openGithub}>Github</MenuItem>
        </Drawer>
      </div>
    )
  }
}

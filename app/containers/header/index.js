import React from 'react';
import AppBar from 'material-ui/AppBar';

function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

const Header = () => (
  <AppBar
    title="AERGIA"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    onLeftIconButtonTouchTap={handleTouchTap}
  />
);

export default Header;

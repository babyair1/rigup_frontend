import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TheatersIcon from '@material-ui/icons/Theaters';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { userLogout } from '../redux/actions'
import { connect } from 'react-redux';

class Navbar_RightMenu extends Component {
    state = {
        open: false
    }

    onLogoutClick = () => {
        this.setState({ open: false })
        this.props.userLogout()
        this.props.history.push('/')
    }
    onLinkClick = (destination) => {
        this.setState({ open: false })
        this.props.history.push(destination)
    }

    handleToggle = () => this.setState({ open: !this.state.open })
    handleClose = () => this.setState({ open: false })
    handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault()
            this.setState({ open: false })
        }
    }

    renderListMenu = () => {
        const { open } = this.state
        if (this.props.user.role_id === 1) {
            return (
                <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={this.handleListKeyDown}>
                            <MenuItem onClick={() => this.onLinkClick(`/admindashboard`)}>
                                <AccountCircleIcon />
                                Admin Dashboard
                            </MenuItem>
                            <MenuItem onClick={this.onLogoutClick}>
                                <ExitToAppIcon />
                                Logout
                            </MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            )
        } else {
            return (
                <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={this.handleListKeyDown}>
                            <MenuItem onClick={() => this.onLinkClick(`/userprofile`)}>
                                <AccountCircleIcon />
                                Profile
                            </MenuItem>
                            <MenuItem onClick={() => this.onLinkClick(`/usercart`)}>
                                <ShoppingCartIcon />
                                My Cart
                            </MenuItem>
                            <MenuItem onClick={() => this.onLinkClick(`/usertransactions`)}>
                                <TheatersIcon />
                                My Transactions
                            </MenuItem>
                            <MenuItem onClick={this.onLogoutClick}>
                                <ExitToAppIcon />
                                Logout
                            </MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            )
        }
    }

    render() {
        const { open } = this.state
        return (
            <div className="dropdownMenu">
                <Button
                    ref="anchorRef"
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    variant='text'
                    onClick={this.handleToggle}
                >
                    <div className="username">{this.props.user.fullname}</div>
                    <AccountCircleIcon />
                </Button>
                <Popper open={open} anchorEl={this.refs.anchorRef} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            {this.renderListMenu()}
                        </Grow>
                    )}
                </Popper>
            </div>
        )
    }
}

export default withRouter(connect(null, { userLogout })(Navbar_RightMenu))
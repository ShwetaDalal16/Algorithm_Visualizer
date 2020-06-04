import React, { Component } from 'react';
import { Button } from 'reactstrap';


class Header extends Component {
    render() {
        return (
            <div className="header">
                <Button color="primary"
                    onClick={this.props.onClick}>Search</Button>
            </div>
        );
    }
}

export default Header;
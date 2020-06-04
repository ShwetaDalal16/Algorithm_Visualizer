import React, { Component, PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import Visualizer from './VisualizerComponent';


class Main extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="container">
                <Helmet>
                    <title>Algorithm Visualizer</title>
                </Helmet>
                <div className="container">
                    <Visualizer/>
                </div>
            </div>
        );
    }
}

export default Main;
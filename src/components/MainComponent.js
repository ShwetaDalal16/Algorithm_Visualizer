import React, { Component, PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import Visualizer from './VisualizerComponent';
import Comparison from './ComparisonComponent';
import Header from './HeaderComponent';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';

class Main extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Algorithm Visualizer</title>
                </Helmet>
                <Router>
                <Header />
                    <Switch>
                        <Route path="/home" component={Visualizer} />
                        <Route exact path='/Compare' component={() => <Comparison />} />
                        <Redirect to="/home" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Main;
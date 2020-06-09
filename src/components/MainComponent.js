import React, {PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import Visualizer from './VisualizerComponent';
import Comparison from './ComparisonComponent';
import Header from './HeaderComponent';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Transform from './TransformTest';

class Main extends PureComponent {

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
                        <Route exact path='/transform' component={Transform}/>
                        <Redirect to="/home" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Main;
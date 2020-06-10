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
                        <Route path="/Algorithm_Visualizer/home" component={Visualizer} />
                        <Route path='/Algorithm_Visualizer/Compare' component={() => <Comparison />} />
                        <Route path='/Algorithm_Visualizer/transform' component={Transform}/>
                        <Redirect to="/Algorithm_Visualizer/home" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Main;
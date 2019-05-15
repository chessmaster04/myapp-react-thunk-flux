// @flow
import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router';

type Props = {};
class App extends PureComponent<Props> {
    render() {
        return (
            <>
                <Switch>
                    <Route exact path="/">
                        text
                    </Route>
                </Switch>
            </>
        );
    }
}

export default App;

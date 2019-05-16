// @flow
import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router';

import { News } from './sections';

type Props = {};
class App extends PureComponent<Props> {
    render() {
        return (
            <>
                <Switch>
                    <Route exact path="/">
                        text
                    </Route>
                    <Route path="/news" component={News} />
                </Switch>
            </>
        );
    }
}

export default App;

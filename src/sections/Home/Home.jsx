// @flow
import React from 'react';
import type { Node, Element } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { initNews, onInitNews } from './reducers/home';

export class Home extends React.Component<any> {
    componentDidMount() {
        this.props.actions.initNews();
    }

    renderNewsItem(item: number): Element<'li'> {
        return <li key={item}>{item}</li>;
    }

    render() {
        return (
            <>
                Home
                <ul>
                    {this.props.news &&
                        this.props.news.map(this.renderNewsItem)}
                </ul>
            </>
        );
    }
}

export default connect(
    state => ({
        news: state.home.news,
    }),
    dispatch => ({
        actions: bindActionCreators(
            {
                initNews,
                onInitNews,
            },
            dispatch,
        ),
    }),
)(Home);

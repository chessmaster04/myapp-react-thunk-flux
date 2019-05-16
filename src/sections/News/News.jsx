// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as news_actions from './reducers/news';

type Props = {
    actions: any,
    news: [],
};
export class News extends Component<Props> {
    componentDidMount() {
        const { actions } = this.props;
        actions.getNews();
    }

    render() {
        const { news } = this.props;
        return (
            <>
                <h1>News</h1>
                {Array.isArray(news) &&
                    news.map(item => {
                        return <div key={item.id}>{item.title}</div>;
                    })}
            </>
        );
    }
}

export default connect(
    state => ({
        news: state.news.news,
    }),
    dispatch => ({
        actions: bindActionCreators({ ...news_actions }, dispatch),
    }),
)(News);

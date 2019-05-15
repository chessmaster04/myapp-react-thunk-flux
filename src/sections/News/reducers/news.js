import { createAction, handleActions, combineActions } from 'redux-actions';
import axios from '../../../axios';

export const onGetNews = createAction('ON_GET_NEWS');
export const onGetNewsItem = createAction('ON_GET_NEWS_ITEM');
export const onSetNewsItem = createAction('ON_SET_NEWS_ITEM');

export const getNews = () => async dispatch => {
    return await axios({
        url: `/news`,
        method: 'GET',
    })
        .then(res => {
            // console.log(res.data.news);
            dispatch(
                onGetNews({
                    news: res.data.news,
                }),
            );
        })
        .catch(error => {
            console.log(error);
        });
};

export const getNewsItem = news_id => async dispatch => {
    return await axios({
        url: `/news/${news_id}`,
        method: 'GET',
    })
        .then(res => {
            // console.log(res.data);
            dispatch(
                onGetNewsItem({
                    newsItem: res.data.newsItem,
                }),
            );
        })
        .catch(error => {
            // console.log(error);
            console.log('error');
        });
};

export const setNewsItem = news_id => async (dispatch, getState) => {
    return await axios({
        url: `/news`,
        method: 'POST',
    })
        .then(res => {
            // console.log(res.data);
            // console.log(getState());
            dispatch(
                onSetNewsItem({
                    news: getState().news.concat([res.data.newsItem]),
                }),
            );
        })
        .catch(error => {
            // console.log(error);
            console.log('error');
        });
};

const defaultState = {
    news: null,
    newsItem: null,
};

export default handleActions(
    {
        [combineActions(onGetNews, onGetNewsItem, onSetNewsItem)]: (
            state,
            action,
        ) => ({
            ...state,
            ...action.payload,
        }),
    },
    defaultState,
);

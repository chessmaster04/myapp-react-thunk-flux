import { createAction, handleActions, combineActions } from 'redux-actions';
import axios from '../../../axios';

export const onGetNews = createAction('ON_GET_NEWS');
export const onGetNewsItem = createAction('ON_GET_NEWS_ITEM');
export const onSetNewsItem = createAction('ON_SET_NEWS_ITEM');
export const onUpdateNewsItem = createAction('ON_UPDATE_NEWS_ITEM');
export const onDelNewsItem = createAction('ON_DEL_NEWS_ITEM');

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
            console.log(error);
            console.log('error');
        });
};

export const setNewsItem = data => async (dispatch, getState) => {
    return await axios({
        url: `/news`,
        method: 'POST',
        data,
    })
        .then(res => {
            // console.log(res.data);
            // console.log(getState());
            dispatch(
                onSetNewsItem({
                    news: getState().news.news.concat([res.data.newsItem]),
                }),
            );
        })
        .catch(error => {
            console.log(error);
            console.log('error');
        });
};

export const updateNewsItem = data => async (dispatch, getState) => {
    return await axios({
        url: `/news/${data.id}`,
        method: 'Put',
        data,
    })
        .then(res => {
            // console.log(res.data);
            // console.log(getState());
            dispatch(
                onUpdateNewsItem({
                    newsItem: res.data.newsItem,
                    news: getState()
                        .news.news.filter(
                            item => item.id !== res.data.newsItem.id,
                        )
                        .push(res.data.newsItem),
                }),
            );
        })
        .catch(error => {
            console.log(error);
            console.log('error');
        });
};

export const delNewsItem = data_id => async (dispatch, getState) => {
    return await axios({
        url: `/news/${data_id}`,
        method: 'Delete',
    })
        .then(res => {
            // console.log(res.data);
            // console.log(getState());
            dispatch(
                onDelNewsItem({
                    newsItem: res.data.newsItem,
                    news: getState().news.news.filter(
                        item => item.id !== res.data.newsItem.id,
                    ),
                }),
            );
        })
        .catch(error => {
            console.log(error);
            console.log('error');
        });
};

const defaultState = {
    news: null,
    newsItem: null,
};

export default handleActions(
    {
        [combineActions(
            onGetNews,
            onGetNewsItem,
            onSetNewsItem,
            onUpdateNewsItem,
            onDelNewsItem,
        )]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    defaultState,
);

import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { route } from '../../../constants';

export const onInitNews = createAction('ON_INIT_NEWS');

export const initNews = () => async dispatch => {
    // return await axios({
    //     url: `${route}/news`,
    //     headers: { 'content-type': 'application/json' },
    //     method: 'GET',
    // }).then( res => {
    //     // console.log(res.data.news);
    //     dispatch(onInitNews({
    //         news: res.data.news
    //     }))
    // }).catch( error => {
    //     // console.log(error);
    // })
    dispatch(
        onInitNews({
            news: [1, 2, '4'],
        }),
    );
};

const defaultState = {
    news: null,
};

export default handleActions(
    {
        [onInitNews]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    defaultState,
);

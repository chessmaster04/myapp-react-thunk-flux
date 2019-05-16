import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';
import axios from '../../../axios';

import {
    onGetNews,
    getNews,
    onGetNewsItem,
    getNewsItem,
    onSetNewsItem,
    onUpdateNewsItem,
    setNewsItem,
    updateNewsItem,
    onDelNewsItem,
    delNewsItem,
} from './news';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

const news = [
    {
        id: 1,
        title: 'News1',
    },
    {
        id: 2,
        title: 'News2',
    },
    {
        id: 3,
        title: 'News3',
    },
];

const newNewsItem = {
    id: 4,
    title: 'News4',
};

const changedNewsItem = {
    id: 2,
    title: 'News41',
};

const deletedNewsItem = {
    id: 3,
    title: 'News3',
};

describe('News', () => {
    afterEach(() => {
        mockAxios.reset();
        // mockAxios.restore(); // remove mocks
    });

    beforeEach(() => {
        mockAxios.onGet(`/news`).reply(200, {
            news,
        });

        mockAxios.onGet(/\/news\/\d+/).reply(config => {
            const id = config.url.split('/')[4] * 1;
            const newsItemList = news.filter(item => item.id === id);
            return [
                200,
                {
                    newsItem:
                        newsItemList.length === 1 ? newsItemList[0] : null,
                },
            ];
        });

        mockAxios.onPost(`/news`).reply(config => {
            return [201, { newsItem: JSON.parse(config.data) }];
        });

        mockAxios.onPut(/\/news\/\d+/).reply(config => {
            const id = config.url.split('/')[4] * 1;
            const newData = JSON.parse(config.data);
            const existsNewsItem = news.some(item => item.id === id);
            if (existsNewsItem) {
                return [
                    200,
                    {
                        newsItem: newData,
                    },
                ];
            }
            return [
                404,
                {
                    newsItem: null,
                },
            ];
        });

        mockAxios.onDelete(/\/news\/\d+/).reply(config => {
            const id = config.url.split('/')[4] * 1;
            const newsItemList = news.filter(item => item.id === id);
            return [
                newsItemList.length === 1 ? 200 : 404,
                {
                    newsItem:
                        newsItemList.length === 1 ? newsItemList[0] : null,
                },
            ];
        });
    });

    describe('reducers', () => {
        it('getNews', () => {
            const expectedActions = [onGetNews({ news })];

            const defaultState = {
                news: null,
            };

            const store = mockStore(defaultState);

            return getNews()(store.dispatch).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('getNewsItem: receiving existed news item with id 1', () => {
            const id = 1;
            const newsItem = news.filter(item => item.id === id)[0];

            const expectedActions = [onGetNewsItem({ newsItem })];
            const defaultState = {
                newsItem: null,
            };

            const store = mockStore(defaultState);

            return getNewsItem(id)(store.dispatch).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('getNewsItem: receiving existed news item with id incorrect 1', () => {
            const id = 10;
            const newsItem = null;

            const expectedActions = [onGetNewsItem({ newsItem })];
            const defaultState = {
                newsItem: null,
            };

            const store = mockStore(defaultState);

            return getNewsItem(id)(store.dispatch).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('setNewsItem:', () => {
            const expectedActions = [
                onSetNewsItem({ news: news.concat([newNewsItem]) }),
            ];
            const defaultState = {
                news,
            };

            const store = mockStore(defaultState);

            return setNewsItem(newNewsItem)(
                store.dispatch,
                store.getState,
            ).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('updateNewsItem:', () => {
            const expectedActions = [
                onUpdateNewsItem({
                    newsItem: changedNewsItem,
                    news: news
                        .filter(item => item.id !== changedNewsItem.id)
                        .push(changedNewsItem),
                }),
            ];
            const defaultState = {
                newsItem: null,
                news,
            };

            const store = mockStore(defaultState);

            return updateNewsItem(changedNewsItem)(
                store.dispatch,
                store.getState,
            ).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('delNewsItem:', () => {
            const expectedActions = [
                onDelNewsItem({
                    newsItem: deletedNewsItem,
                    news: news.filter(item => item.id !== deletedNewsItem.id),
                }),
            ];
            const defaultState = {
                newsItem: null,
                news,
            };

            const store = mockStore(defaultState);

            return delNewsItem(deletedNewsItem.id)(
                store.dispatch,
                store.getState,
            ).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});

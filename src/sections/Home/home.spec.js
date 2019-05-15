import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';
import axios from 'axios';
import Enzyme, { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { asap } from 'rxjs/internal/scheduler/asap';
import { route } from "../../constants";
import { onInitNews, initNews } from "./reducers/home";
import ConnectedHome, { Home } from "./Home";
Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockAxios = new MockAdapter(axios);

describe('Home', () => {
    // describe('actions', () => {
    //     afterEach(() => {
    //         mockAxios.reset()
    //         mockAxios.restore()
    //     });

    //     it('Init News', () => {
    //         mockAxios.onGet(`${route}/news`).reply(200, {
    //             news: [1, 2, 3]
    //         });

    //         const expectedActions = [
    //             onInitNews({news: [1, 2, 3]})
    //         ]

    //         const store = mockStore({})

    //         return initNews()(store.dispatch).then(() => {
    //             expect(store.getActions()).toEqual(expectedActions)
    //         })
    //     });
    //     it('Init News', () => {
    //         mockAxios.onGet(`${route}/news`).reply(200, {
    //             news: null
    //         });

    //         const expectedActions = [
    //             onInitNews({news: [1, 2, 3]})
    //         ]

    //         const store = mockStore({})

    //         return initNews()(store.dispatch).then(() => {
    //             expect(store.getActions()).not.toEqual(expectedActions)
    //         })
    //     });
    // });
    describe('<Home />', () => {
        it('Init News', done => {
            const actions = {
                initNews: jest.fn(fn => fn),
            };

            const defaultState = {
                news: [1, 2, 3],
            };

            const wrapper = shallow(<Home {...{ ...defaultState, actions }} />);
            console.log(wrapper.debug());
            expect(wrapper.find('li')).toHaveLength(3);
            expect(actions.initNews).toHaveBeenCalled();
            done();
        });
    });
});

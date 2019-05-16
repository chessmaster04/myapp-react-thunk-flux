import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { News } from './News';

Enzyme.configure({ adapter: new Adapter() });

const actions = {
    getNews: jest.fn(fn => fn),
    setNewsItem: jest.fn(fn => fn),
    updateNewsItem: jest.fn(fn => fn),
    delNewsItem: jest.fn(fn => fn),
};

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

describe('<News/>', () => {
    it('News with null data', done => {
        const defaultState = {
            news: null,
        };

        const wrapper = shallow(<News {...{ ...defaultState, actions }} />);
        expect(actions.getNews).toHaveBeenCalled();
        // expect(actions.setNewsItem).toHaveBeenCalled();
        // expect(actions.updateNewsItem).toHaveBeenCalled();
        // expect(actions.delNewsItem).toHaveBeenCalled();
        done();
    });

    it('News with 3 items', done => {
        const defaultState = {
            news,
        };

        const wrapper = shallow(<News {...{ ...defaultState, actions }} />);
        expect(wrapper.find('div')).toHaveLength(3);
        expect(actions.getNews).toHaveBeenCalled();
        // expect(actions.setNewsItem).toHaveBeenCalled();
        // expect(actions.updateNewsItem).toHaveBeenCalled();
        // expect(actions.delNewsItem).toHaveBeenCalled();
        done();
    });

    it('News with wrong data value: true', done => {
        const defaultState = {
            news: true,
        };

        const wrapper = shallow(<News {...{ ...defaultState, actions }} />);
        expect(actions.getNews).toHaveBeenCalled();
        // expect(actions.setNewsItem).toHaveBeenCalled();
        // expect(actions.updateNewsItem).toHaveBeenCalled();
        // expect(actions.delNewsItem).toHaveBeenCalled();
        done();
    });

    it('News with wrong data value: array with items with boolean values', done => {
        const defaultState = {
            news: [true, true, false],
        };

        const wrapper = shallow(<News {...{ ...defaultState, actions }} />);
        expect(
            wrapper
                .find('div')
                .first()
                .text(),
        ).not.toHaveLength(0);
        expect(actions.getNews).toHaveBeenCalled();
        // expect(actions.setNewsItem).toHaveBeenCalled();
        // expect(actions.updateNewsItem).toHaveBeenCalled();
        // expect(actions.delNewsItem).toHaveBeenCalled();
        done();
    });
});

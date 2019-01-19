import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios'
import Root from 'Root';
import App from 'components/app';

beforeEach(() => {
    moxios.install();
    moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
        status: 200,
        response: [{ name: 'Fetched #1'}, { name: 'Fetched #2'}]
    });
});

afterEach(() => {
    moxios.uninstall();
});

it('can fetch a list of comments and display them', (done) => {
    // Attempt to render entire app
    const wrapped = mount(
        <Root>
            <App />
        </Root>
    );

    // Find 'fetchComments' button - click it
    wrapped.find('.fetch-comments').simulate('click');

    setTimeout(() => {
        // Expect to find a list of comments - LIs
        expect(wrapped.find('li').length).toEqual(2);
        done();
    }, 100);

});

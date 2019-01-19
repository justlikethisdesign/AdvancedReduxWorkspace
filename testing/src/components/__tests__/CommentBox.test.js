import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'components/CommentBox';

let wrapped;

beforeEach(() => {
    wrapped = mount(<CommentBox />);
});

afterEach(() => {
    wrapped.unmount();
});

it('has a text area and button', () => {
    expect(wrapped.find('textarea').length).toEqual(1);
    expect(wrapped.find('button').length).toEqual(1);
});

it('has a text area that users can type in', () => {

    const comment = 'new comment';

    wrapped.find('textarea').simulate('change', {
        target: { value: comment }
    });
    wrapped.update();

    expect(wrapped.find('textarea').prop('value')).toEqual(comment);

});

it('submits the form and empties the textarea', () => {
    const comment = 'new comment';
    wrapped.find('textarea').simulate('change', {
        target: { value: comment }
    });
    wrapped.update();
    wrapped.find('form').simulate('submit');
    wrapped.update();
    expect(wrapped.find('textarea').prop('value')).toEqual('');
});

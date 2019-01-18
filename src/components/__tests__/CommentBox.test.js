import React from 'react';
import { mount } from 'enzyme';
import CommentBox from 'components/CommentBox';

beforeEach(() => {
    let wrapped;
});

it('has a text area and button', () => {
    wrapped = mount(<CommentBox />);

    expect(wrapped.find('textarea').length).toEqual(1);
    expect(wrapped.find('button').length).toEqual(1);
});

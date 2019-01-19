import commentsReducer from 'reducers/comments';
import { SAVE_COMMENT } from 'actions/types';

it('handles actions of type SAVE_COMMENT', () => {

    const comment = 'New Comment';

    const action = {
        type: SAVE_COMMENT,
        payload:comment
    };

    const newState = commentsReducer([], action);

    expect(newState).toEqual([comment])    
});

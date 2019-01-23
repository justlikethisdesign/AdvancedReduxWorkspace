export default ({ dispatch }) => next => action => {

    // Check to see if the action has a promise on its payload
    // If it does, wait for a resolve
    // If it doesnt, pass on to next middleware
    if( !action.payload || !action.payload.then ){
        return next(action);
    }

    // We want to wait for promise to resolve
    // get its data and create a new action with data
    // and dispatch it
    action.payload.then(function(response) {
        const newAction = { ...action, payload: response }
        dispatch(newAction);
    });

};

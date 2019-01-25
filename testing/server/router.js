module.exports = function(app){

    app.get('/', function(req, res, next) {
        res.send(['String 1', 'string 2', 'jump']);
    });

}

module.exports = function () {
    
    return {
        notFoundMiddleware: notFoundMiddleware,
        send404: send404
    }
    
    function notFoundMiddleware() {
        send404(req, res, 'API endpoint not found');
    }
    
    function send404 (req, res, description) {
        var data = {
            status: 404,
            message: 'Not Found',
            description: description,
            url: req.url
        };
        res.status(404)
            .send(data)
            .end();
    }
}
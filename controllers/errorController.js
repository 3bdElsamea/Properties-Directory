// Development error handler
const  devError = (err, res) => {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
}

// Production error handler
const prodError = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'development') {
        devError(err, res);
    }
    else if(process.env.NODE_ENV === 'production') {
        prodError(err, res);
    }
}
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
    // if(err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    // }
    // else {
    //     console.error('ERROR 💥', err);
    //     return res.status(500).json({
    //         status: 'error',
    //         message: 'Something went wrong!'
    //     })
    // }
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
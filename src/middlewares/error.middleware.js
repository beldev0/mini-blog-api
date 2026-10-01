const globalErrorHandler = (err, req, res, next) => {
    if(err) {
        console.log(err);
        
        if(err.code == 'Validation Error') {
            return res.status(err.statusCode).json({"success":false, error:err.error})
        }

        if(err.code == '23505' || err.code == '23503' || err.code == '23502') {
            return res.status(400).json({"success":false, error:err.detail})
        }

        return res.status(400).json({"success":false, error:[err.message]})
    }
}

module.exports = globalErrorHandler
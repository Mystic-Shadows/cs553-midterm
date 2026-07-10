export function logRequest(req, res) {

    const receiveTime = Date.now();

    res.on('finish', () => {
        console.log(
            `Finished processing request
    method: ${req.method}
    path: ${req.path}
    result: ${res.statusCode}
    time to process: ${Date.now() - receiveTime} ms`
        )
    });

}
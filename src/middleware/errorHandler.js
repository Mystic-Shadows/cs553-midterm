export function validateRequest(req, res, next) {

    const title = req.body?.title;
    const course = req.body?.course;
    const completedText = req.body?.completed?.trim().toLowerCase();
    const completedValidity = completedText === "true" || completedText === "false";

    if (req.method === "POST" || req.method === "PUT") {
        if (!(title && course && completedValidity)) {
            return res.status(400).json({
                error: "Bad Request",
                message: "A title, course, and completed status is required."
            });
        }
    }
    else if (req.method === "PATCH") {
        if (!(title || course || completedValidity)) {
            return res.status(400).json({
                error: "Bad Request",
                message: "A title, course, or completed status is required."
            });
        }
    }

    next();
}
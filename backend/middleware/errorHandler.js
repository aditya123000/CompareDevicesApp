const errorHandler = (err, req, res, _next) => {
  void _next;

  const statusCode = res.statusCode >= 400 ? res.statusCode : err.status || 500;
  console.error(JSON.stringify({ level: "error", event: "request_failed", requestId: req.requestId, statusCode, message: err.message, stack: err.stack }));
  const message = statusCode >= 500 ? "Internal server error" : err.message || "Request failed";

  return res.status(statusCode).json({ message, requestId: req.requestId });
};

export default errorHandler;

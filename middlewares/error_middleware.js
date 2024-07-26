const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: "Validation failed", errors });
  } else if (err.code && err.code === 11000) {
    return res
      .status(400)
      .json({ message: "Duplicate key error", error: err.message });
  } else {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export default errorHandler;

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
  return true;
};

const validateRequired = (fields) => {
  return Object.entries(fields).every(([key, value]) => {
    if (!value) {
      throw new Error(`${key} is required`);
    }
    return true;
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};

export default {
  validateEmail,
  validateRequired,
  errorHandler,
};

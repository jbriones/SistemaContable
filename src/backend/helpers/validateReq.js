exports.isValid = (req, res) => {
  const errors = req.validationErrors();
  if (errors) {
    res.send(500, errors);
    return false;
  }
  return true;
}

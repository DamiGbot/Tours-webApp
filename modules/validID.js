const validID = (req, res, tours) => {
  const id = req.params.id * 1;
  if (id > tours.length - 1) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
};

module.exports = {
  validID,
};

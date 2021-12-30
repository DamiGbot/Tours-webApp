const fs = require('fs');
const path = require('path');

const writeFile = (res, tourData, newData = null) => {
  fs.writeFile(
    path.resolve('dev-data', 'data', 'tours-simple.json'),
    JSON.stringify(tourData),
    (err) => {
      res.status(newData ? 201 : 204).json({
        status: 'success',
        data: {
          tour: newData,
        },
      });
    }
  );
};

module.exports = {
  writeFile,
};

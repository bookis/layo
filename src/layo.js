const fs = require('fs');

class Layo {
  constructor(layout, view) {
    this.layout = layout;
    this.view   = view;
  }

  render() {
    return Promise.all([this.readLayout(), this.readView()])
      .then((results) => {
        return results[0].replace(/{{.+render.+}}/, results[1]);
      })
      .catch((err) => {
        return err;
      })
  }

  readLayout() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.layout, "UTF8", (err, data) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(data);
        }
      });
    });
  }
  readView() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.view, "UTF8", (err, data) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = Layo;



import * as fs from 'fs';

class Repository {
  filename: string;
  constructor(filename: string) {
    if (!filename) {
      throw new Error('Filename is required to create a datastore!');
    }

    this.filename = filename;

    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '');
    }
  }

  getAll() {
    return JSON.parse(
      fs.readFileSync(this.filename, {
        encoding: 'utf8'
      })
    );
  }

  write(data: string) {
    fs.appendFileSync(this.filename, data);
  }
}
export const repo = new Repository('logs.txt');

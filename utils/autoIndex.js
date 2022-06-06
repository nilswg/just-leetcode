// @ts-check
import { readdir, stat } from 'fs';
import { resolve } from 'path';

const HOME_URL = `https://github.com/nilswg/just-leetcode/blob/main/`;

(async () => {
  const walk = (dir, done) => {
    var results = [];
    readdir(dir, function (err, list) {
      if (err) return done(err);
      let pending = list.length;
      if (!pending) return done(null, results);
      list.forEach(function (file) {
        file = resolve(dir, file);
        stat(file, function (err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function (err, res) {
              results = results.concat(res);
              if (!--pending) done(null, results);
            });
          } else {
            results.push(file);
            if (!--pending) done(null, results);
          }
        });
      });
    });
  };

  function getJsFileName() {
    return new Promise((resolve, reject) => {
      walk('../JS', function (err, results) {
        if (err) {
          reject(err);
        }
        try {
          results = results
            .map((url) => {
              return url.split('\\JS\\')[1].split('\\');
            })
            .filter((url) => {
              //只要目錄在目錄下的的，配置相關檔案都不要。
              const isNotRootDirectory = url.length > 1;

              // 檢查檔案的格式是否正確。
              const isValidFileName = new RegExp(/p[0-9]+_[\w]+.js/).test(
                url[url.length - 1]
              );

              return isNotRootDirectory && isValidFileName;
            })
            .map((x) => {
              const tag = x[x.length - 1].match(/[0-9]{4}/)[0];

              return {
                key: tag,
                name: x[x.length - 1],
                value: `[p${tag}_js]: ${HOME_URL + `/JS/` + x.join('/')}`,
              };
            });

          results.sort((a, b) => {
            return a.key - b.key;
          });

          resolve(results);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  function getRustFileName() {
    return new Promise((resolve, reject) => {
      walk('../Rust/src/problems/', function (err, results) {
        if (err) {
          reject(err);
        }
        try {
          results = results
            .map((url) => {
              return url.split('\\Rust\\src\\problems\\')[1].split('\\');
            })
            .filter((url) => {
              // 檢查檔案的格式是否正確。
              const isValidFileName = new RegExp(/p[0-9]+_[\w]+.rs/).test(
                url[url.length - 1]
              );

              return isValidFileName;
            })
            .map((x) => {
              const tag = x[x.length - 1].match(/[0-9]{4}/)[0];
              return {
                key: tag,
                name: x[x.length - 1],
                value: `[p${tag}_rs]: ${HOME_URL + `/Rust/src/problems/` + x}`,
              };
            });
          results.sort((a, b) => {
            return a.key - b.key;
          });

          resolve(results);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  /**
   * @param {string} str
   * @param {number} size
   * @return {string}
   */
  function setToFit(str, size) {
    if (str.length > size){
      str = str.slice(0, size - 3);
      str += '...';
    }
    str = str + ''.padEnd(Math.max(size - str.length, 0), ' ');
    return str;
  }

  const js = await getJsFileName();
  const rs = await getRustFileName();

  const mp = {};
  js.forEach((x) => {
    const key = Number(x.key);
    if (!mp[key]) {
      mp[key] = [];
    }

    mp[key][0] = x;
  });
  rs.forEach((x) => {
    const key = Number(x.key);
    if (!mp[key]) {
      mp[key] = [];
    }

    mp[key][1] = x;
  });

  // console.log(mp);

  let res = `
# just-leetcode

## 目 錄

| Title                                  | JavaScript    | Rust          |
|:---------------------------------------|:-------------:|:-------------:|\n`;

  let LargestItem =
    js.length >= rs.length ? js[js.length - 1] : rs[rs.length - 1];
  let maxLen = Number(LargestItem.key);
  console.log('maxLen:', maxLen);

  for (let i = 0; i < maxLen; i++) {
    const x = mp[i.toString()];
    if (x) {
      let title = x[0]?.name ?? x[1]?.name;
      title = setToFit(title, 40);

      let jsSol = x[0] ? `[✔][p${[x[0].key]}_js]` : ``;
      jsSol = setToFit(jsSol, 15);

      let rsSol = x[1] ? `[✔][p${[x[1].key]}_rs]` : ``;
      rsSol = setToFit(rsSol, 15);

      res += `|${title}|${jsSol}|${rsSol}|\n`;
    }
  }

  res += '\n';

  for (let i = 0; i < maxLen; i++) {
    const x = mp[i.toString()];
    if (x) {
      let quoteTitle = (x[0] ?? x[1]).key;
      res += `<!-- ${quoteTitle} -->\n`;

      res += x[0] ? `${[x[0].value]}\n` : ``;
      res += x[1] ? `${[x[1].value]}\n` : ``;

      res += '\n'
    }
  }

  console.log(res);
})();

// console.log(jsFileNames)

// https://github.com/nilswg/just-leetcode/blob/main/JS/HashMap/easy/p0001_twoSum.js
// https://github.com/nilswg/just-leetcode/blob/main/HashMap/easy/p0001_twoSum.js',

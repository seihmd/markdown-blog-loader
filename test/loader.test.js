import test from 'ava';
import webpack from 'webpack';
import path from 'path';
import MemoryFileSystem from 'memory-fs';

const OUTPUT = path.join(__dirname, 'dist');

function getConfig(testFile) {
  return {
    entry: path.resolve(__dirname, `./posts/${testFile}`),
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: require.resolve('../')
            }
          ]
        }
      ]
    },
    output: {
      path: OUTPUT,
      filename: 'bundle.js'
    }
  };
}

function execTest(t, testFile, outputIncludes) {
  const compiler = webpack(getConfig(testFile), (err, stats) => {
    if (err) {
      t.end(err);
    }
    if (stats.hasErrors()) {
      t.end(stats.compilation.errors[0]);
    }
    if (stats.hasWarnings()) {
      t.end(stats.compilation.warnings[0]);
    }

    const output = stats.compilation.assets['bundle.js'].source();
    t.truthy(output.includes(outputIncludes));

    t.end();
  });
  compiler.outputFileSystem = new MemoryFileSystem();
}

test.cb('yaml-front-matter', t => {
  const fileName = 'yaml_post.md';
  const output =
    '{"data":{"title":"this is a test with yaml-front-matter","tags":["yaml-tag"],"date":"2018-01-01"},"content":"\\n# YEAH THIS IS A TEST POST\\n"}';
  execTest(t, fileName, output);
});

test.cb('json-front-matter', t => {
  const fileName = 'json_post.md';
  const output =
    '{"data":{"title":"this is a test with json-front-matter","tags":["json-tag"],"date":"2018-01-02"},"content":"\\n# YEAH THIS IS A TEST POST\\n"}';
  execTest(t, fileName, output);
});

test.cb('js-front-matter', t => {
  const fileName = 'js_post.md';
  const output =
    '{"data":{"title":"this is a test with js-front-matter","tags":["js-tag"],"date":"2018-01-03"},"content":"\\n# YEAH THIS IS A TEST POST\\n"}';
  execTest(t, fileName, output);
});

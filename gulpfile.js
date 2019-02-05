const gulp = require('gulp');
const fs = require('fs');
const { closeSync, openSync } = require('fs');
const yargs = require('yargs');
const exec = require('child_process').exec;

const touch = filename => closeSync(openSync(filename, 'w'));

gulp.task('create', async function() {
	const name = yargs.argv.vers
		? 'react-native init --version ' + yargs.argv.vers + ' ' + yargs.argv.name
		: 'react-native init ' + yargs.argv.name;
	const path = yargs.argv.name;
	exec(name, async function() {
		process.chdir(path);
		touch('rn-cli.config.js');
		fs.writeFileSync('rn-cli.config.js', config);
		if (fs.existsSync('App.js')) fs.unlinkSync('App.js');
		exec(
			'yarn add --dev typescript react-native-typescript-transformer',
			function() {
				exec('yarn tsc --init --pretty --jsx react', function() {
					exec('yarn add --dev @types/react @types/react-native', function() {
						const folders = [
							'src',
							'src/api',
							'src/components',
							'src/hocs',
							'src/router',
							'src/screens',
							'src/stores',
							'src/types',
							'src/typings',
							'src/augmentations',
							'src/utils',
							'src/utils/validators'
						];

						folders.forEach(dir => {
							if (!fs.existsSync(dir)) {
								fs.mkdirSync(dir);
								if (dir === 'src') {
									fs.writeFileSync(`${dir}/App.tsx`, '');
								} else {
									fs.writeFileSync(`${dir}/index.ts`, '');
								}
								console.log('📁  folder created:', dir);
							}
						});
					});
				});
			}
		);
	});
});

const config = `module.exports = {
	getTransformModulePath() {
	  return require.resolve("react-native-typescript-transformer");
	},
	getSourceExts() {
	  return ["ts", "tsx"];
	}
  };`;

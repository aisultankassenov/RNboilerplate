const gulp = require('gulp');
const fs = require('fs');
const { closeSync, openSync } = require('fs');
const path = require('path');
const template = require('gulp-template');
const yargs = require('yargs');
const exec = require('child_process').exec;

const touch = filename => closeSync(openSync(filename, 'w'));
const data = new Uint8Array(Buffer.from('Hello Node.js'));

const root = '';

const resolveToComponents = (glob = '') => {
	return path.join(root, '', glob);
};

gulp.task('component', () => {
	const cap = val => {
		return val.charAt(0).toUpperCase() + val.slice(1);
	};
	const name = yargs.argv.name;
	const parentPath = yargs.argv.parent || '';
	const destPath = path.join(resolveToComponents(), parentPath, name);
	console.log('\nChange index.ts file located in src/screens!!!\n');
	return gulp
		.src(path.join(__dirname, 'generator', 'component/**/*.**'))
		.pipe(
			template({
				name: name,
				upCaseName: cap(name)
			})
		)
		.pipe(gulp.dest(destPath));
});

gulp.task('create', async function() {
	const name = 'react-native init ' + yargs.argv.name;
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
									fs.writeFileSync(`${dir}/App.tsx`, data);
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

const minimist = require('minimist');
const { exec, spawn } = require('child_process');

const { b: branches = ['master', 'dev', 'rc'] } = minimist(process.argv.slice(2));

exec('git symbolic-ref --short HEAD | xargs echo -n', (err, branch) => {
    if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        // не удалось получить имя ветки - прерываем операцию
        process.exit(1);
    }

    if (!branches.includes(branch)) {
        // в текущей ветке тесты не запускаем
        return;
    }

    const subprocess = spawn('npm', ['test'], { stdio: 'inherit', shell: true });

    subprocess.on('close', (code) => {
        if (code !== 0) {
            // eslint-disable-next-line no-console
            console.log(`::: Tests failed :( ${code}\n`
                + '::: "git reset HEAD~1 --soft" - cancel last commit');
        }

        process.exit(code);
    });
});

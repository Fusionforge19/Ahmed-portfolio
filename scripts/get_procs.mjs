import { execSync } from 'child_process';

const output = execSync('wmic process where "name like \'%dart%\' or name like \'%cmd%\' or name like \'%powershell%\'" get ProcessId,ParentProcessId,CommandLine,Caption /format:csv', { encoding: 'utf8' });
console.log(output);

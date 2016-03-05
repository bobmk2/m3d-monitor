var m3dcap = require('m3d-capture');
var clc = require('cli-color');
var ProgressBar = require('progress');

var interfaceName = process.argv[2];
if (typeof interfaceName === 'undefined') {
  console.log('please set interface name as first argument.');
  console.log('ex) node index.js lo0');
  return;
}

console.log(clc.bgXterm(33).white('   M3D Monitor   '));

m3dcap.on(m3dcap.EVENT_DATA_RECEIVE, function(obj) {
  if (obj.hasOwnProperty('currentJob')) {
    bar.update(parseFloat(obj.currentJob.percentComplete));
  }
});

m3dcap.on(m3dcap.EVENT_JOB_START, function(obj) {
  bar = new ProgressBar(obj.currentJob.jobName + ' |:bar| :percent :etas', {
    complete: '█',
    incomplete: '-',
    width: 20,
    total: 100
  });
  console.log(clc.bgRed.white(' Print Start '));
});

m3dcap.on(m3dcap.EVENT_JOB_FINISH, function(obj) {
  bar.update(1.0);
  console.log(clc.bgGreen.white(' Print Finished '));
});

m3dcap.run(interfaceName, {});
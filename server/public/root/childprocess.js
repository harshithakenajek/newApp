const { spawn, fork } = require('child_process');

if(process.argv[2]=='child'){
    console.log("I am inside child");
}else{
    console.log(__filename);
    var filename ='/home/techjini/Desktop/nodejs/bookApp/server/server'
    var child = spawn(process.execPath,[filename]);
    
    child.stdout.on('data',function (data){
        console.log('from the child',data.toString());
        console.log('spawn process',process.pid,process.ppid);
    });

    var forkchild = fork('./server/public/root/worker');
//fork a child and doesn't wait for spawn process to complete - run in background
forkchild.on('message', function(m) {
  // Receive results from child process
  console.log('received: ' + m);
});

// Send child process some work
forkchild.send('Please up-case this string');
}

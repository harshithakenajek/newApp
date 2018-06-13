const childp = require('child_process');
var forkchild = childp.fork('./server/public/root/worker');
if(process.argv[2]=='child'){
    console.log("I am inside child");
}else{
    console.log(__filename);
    var filename ='/home/techjini/Desktop/nodejs/bookApp/server/server.js'
    var child = childp.spawn(process.execPath,[filename]);
    child.stdout.on('data',function (data){
        console.log('from the child',data.toString());
    });

    
//fork a child and doesn't wait for spawn process to complete - run in background
forkchild.on('message', function(m) {
  // Receive results from child process
  console.log('received: ' + m);
});

// Send child process some work
forkchild.send('Please up-case this string');
}

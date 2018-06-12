const spawn = require('child_process').spawn;
if(process.argv[2]=='child'){
    console.log("I am inside child");
}else{
    console.log(__filename);
    var filename ='/home/techjini/Desktop/nodejs/bookApp/server/server.js'
    var child = spawn(process.execPath,[filename]);
    child.stdout.on('data',function (data){
        console.log('from the child',data.toString());
    })
}

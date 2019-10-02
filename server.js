const WebSocketServer = require('ws').Server;

webSocketServer = new WebSocketServer({ port: 8080 })

let clients = [];
let connectNum = 0;

webSocketServer.on('connection',(ws)=>{
    clients.push(ws);
    ++connectNum;
    console.log(`连接的数量为: ${connectNum}`);
    // 检测消息
    ws.on('message',(message)=> {
        console.log(message);
        let objMessage = JSON.parse(message);
        console.log(objMessage.data);
    })
    // 随机发送消息
   setInterval(()=>{
       if(connectNum!==0){
           setTimeout(()=>{
               console.log(`发送返回消息`);
              //  从连接池中取得最新的连接
              clients[clients.length - 1].send(JSON.stringify({ data:'来自服务器的消息' }))

           },Math.random() * 10000 *3)
       } else {
           console.log(`无法连接客户端`);
       }
   },1000)
  //  检测关闭
  ws.on('close',()=>{
      console.log(`有链接断开`);
      connectNum -- ;
  })    
})
/**
 * Created by NICK on 16/4/1.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

var Etcd = require("node-etcd");

etcd = new Etcd('127.0.0.1', '4001');

//etcd.set("a", "1");


etcd.get("queue", function (err, data) {
    console.log(data.node.nodes);
});

etcd.leaderStats(console.log);
etcd.selfStats(console.log);

//etcd.create("queue", "first")
//etcd.create("queue", "next", console.log)
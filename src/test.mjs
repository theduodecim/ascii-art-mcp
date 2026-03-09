import { spawn } from "child_process";

const proc = spawn("node", ["dist/server.js"], {
  stdio: ["pipe", "pipe", "pipe"]
});

proc.stderr.on("data", (d) => {
  console.log("LOG:", d.toString());
});

proc.stdout.on("data", (d) => {
  console.log("SERVER:", d.toString());
});

function send(msg) {
  const json = JSON.stringify(msg);

  const payload =
    `Content-Length: ${Buffer.byteLength(json)}\r\n\r\n${json}\r\n`;

  console.log("\nSENDING:\n", json, "\n");

  proc.stdin.write(payload);
}

setTimeout(() => {
  send({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "tester", version: "1.0" }
    }
  });
}, 500);

setTimeout(() => {
  send({
    jsonrpc: "2.0",
    method: "initialized",
    params: {}
  });
}, 1000);

setTimeout(() => {
  send({
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list"
  });
}, 1500);

setTimeout(() => {
  proc.kill();
  console.log("TEST FINISHED");
}, 4000);
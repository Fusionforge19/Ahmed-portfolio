async function checkClient() {
  const res = await fetch('http://localhost:63730/dwds/src/injected/client.js');
  const text = await res.text();
  console.log('client.js length:', text.length);
  const restartMatches = text.match(/.{0,50}hotRestart.{0,50}/gi);
  console.log('restart matches:', restartMatches);
}
checkClient();

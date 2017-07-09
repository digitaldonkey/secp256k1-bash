const shell = require('shelljs');
const ethutil = require('ethereumjs-util');

var msgHash, v, r, s, recovered_address = false, debug = false;

// Performance test only.
// var time0 = process.hrtime();

if (!process.argv[2]) {
  shell.echo(
  "HELP for " +  process.argv[1].replace(/^.*[\\\/]/, '') + " \n \
  \n \
  1) Implemented EcRecover like in solidity \n \
     ecrecover(msgHash, v, r, s) \n \
  node runSecp265k1.js 0xdc0e5f8d3edf066da77f7a5664ca95fc75854567901aca68abb36987a46021b7 0x1b 0x627c13c55329e7eb3b377930e00b1186bf3115a9b4a45218eb8530caefbf1255 0x02edfaeb33a4c5f848b55ad5438c6e50160397bd47811f70df2173e536b4dd2c true \n \
  \n \
  2) Given signature \n \
  node runSecp265k1.js 0xdc0e5f8d3edf066da77f7a5664ca95fc75854567901aca68abb36987a46021b7 0x627c13c55329e7eb3b377930e00b1186bf3115a9b4a45218eb8530caefbf125502edfaeb33a4c5f848b55ad5438c6e50160397bd47811f70df2173e536b4dd2c1b true \n \
  \n \
  Last param triggers debug mode. \n \
  \n \
");
  shell.exit(1);
}

// Validate message_hash (argv[2])
if (process.argv[2].substr(0,2) !== '0x' || process.argv[2].length !== 66) {
  throw 'Argument 1 "message_hash" must be hex char string 66 length icl "0x"-prefix.';
}
else {
  msgHash = process.argv[2].substr(2);
}

// PARAMETER
// We can have 2 + 1 args: msgHash signature [+debug] -> argv.length <=3
//  OR
// msgHash signature.v signature.r signature.s [+debug] -> argc.length >= 4

// ecrecover(msgHash, signature, [+debug])
if (process.argv.length <=5) {
  // Validate message_signature.
  if (process.argv[3] && process.argv[3].substr(0,2) !== '0x' || process.argv[3].length !== 132) {
    throw 'Argument 2 "message_signature" must be Hex string 132 length with prefix.';
  }
  // Signature hash given (msgHash, message_signature).
  // SEE: https://github.com/ethereumjs/ethereumjs-util/blob/master/index.js#L327-L334
  // https://github.com/MetaMask/eth-sig-util/blob/master/index.js#L21-L25
  r = process.argv[3].substr(2, 64);
  s = process.argv[3].substr(66, 64);
  v = process.argv[3].substr(130, 2);
  debug = (process.argv[4]);
}
// ecrecover(msgHash, v, r, s, [+debug])
else if(process.argv.length >= 6) {
  // Signature parameters (msgHash, v, r, s).
  if ((process.argv[3].substr(0,2) !== '0x' || process.argv[4].length <= 6)
      && (process.argv[4].substr(0,2) !== '0x' || process.argv[4].length !== 66)
      && (process.argv[5].substr(0,2) !== '0x' || process.argv[5].length !== 66)
  ) {
    throw 'Argument 2-4 "v, r, s" must be Hex string with prefix.';
  }
  v = process.argv[3].substr(2);
  r = process.argv[4].substr(2);
  s = process.argv[5].substr(2);
  debug = (process.argv[6]);
}

if (debug) {
  console.log('# Notice debug mode enabled \n');
  console.log('msgHash: ' + msgHash);
  console.log('r: ' +  r);
  console.log('s: ' + s);
  console.log('v: ' + v + '\n');
}

var recovered_pubkey = ethutil.ecrecover(Buffer.from(msgHash, 'hex'), parseInt(v, 16), Buffer.from(r, 'hex'), Buffer.from(s, 'hex'));
recovered_address = ethutil.pubToAddress(recovered_pubkey);

if (recovered_address) {
  shell.echo('0x' +recovered_address.toString('hex'));
  if (debug) {
    console.log('recovered_pubkey: ' + recovered_pubkey.toString('hex'));
    console.log('recovered_address: ' + recovered_address.toString('hex') + '\n')
  }
  // console.log('\nRuntime: ' + process.hrtime(time0)[1]/1000000 + 'ms');
  shell.exit(0);
}
else {
  shell.exit(1);
}

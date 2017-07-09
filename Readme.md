runSecp265k1
============

This tool let you decode Ethereum Secp265k1 signatures in a terminal.

## Install
Requires node & npm.

```
git clone https://github.com/digitaldonkey/secp256k1-bash.git
npm install
```

## Usage
There are 2 variants. The later one is compatible with Ethereum ecrecover (`ecrecover(msgHash, v, r, s)`).

Last param will print debug output too.

```
node runSecp265k1 <message hash> <signature> [true]
node runSecp265k1 <message hash> <v> <r> <s> [true]
```

**Return** value is the Ethereum's public address (as Hex string).

## Examples

### Call EcRecover like in solidity
```
node runSecp265k1.js 0xdc0e5f8d3edf066da77f7a5664ca95fc75854567901aca68abb36987a46021b7 0x1b 0x627c13c55329e7eb3b377930e00b1186bf3115a9b4a45218eb8530caefbf1255 0x02edfaeb33a4c5f848b55ad5438c6e50160397bd47811f70df2173e536b4dd2c
```

`0x4097752d39b5fb5c9b2490d53fb3d50f355dad7a`

### Decode given signature
```
node runSecp265k1.js 0xdc0e5f8d3edf066da77f7a5664ca95fc75854567901aca68abb36987a46021b7 0x627c13c55329e7eb3b377930e00b1186bf3115a9b4a45218eb8530caefbf125502edfaeb33a4c5f848b55ad5438c6e50160397bd47811f70df2173e536b4dd2c1b
```

`0x4097752d39b5fb5c9b2490d53fb3d50f355dad7a`


"use strict";

const Decimal = require("decimal.js");
const Decimal8 = Decimal.clone({ precision: 8, rounding: 8 });

// Blackcoin block reward is static 10000 BLK until it wasn't (PoS transition).
// For the explorer, we can simplify or add eras if needed.
// Early Blackcoin had PoW phase.
// Block 1 was 10000 BLK.
// We will define a simple era structure for now.
const blockRewardEras = [new Decimal8(10000)];

const currencyUnits = [
    {
        type: "native",
        name: "BLK",
        multiplier: 1,
        default: true,
        values: ["", "blk", "BLK"],
        decimalPlaces: 8
    },
    {
        type: "native",
        name: "mBLK",
        multiplier: 1000,
        values: ["mblk"],
        decimalPlaces: 5
    },
    {
        type: "native",
        name: "bits",
        multiplier: 1000000,
        values: ["bits"],
        decimalPlaces: 2
    },
    {
        type: "native",
        name: "sats",
        multiplier: 100000000,
        values: ["sats", "satoshis"],
        decimalPlaces: 0
    },
    {
        type: "exchanged",
        name: "USD",
        multiplier: "usd",
        values: ["usd"],
        decimalPlaces: 2,
        symbol: "$"
    },
    {
        type: "exchanged",
        name: "EUR",
        multiplier: "eur",
        values: ["eur"],
        decimalPlaces: 2,
        symbol: "€"
    },
];

module.exports = {
    name: "Blackcoin",
    ticker: "BLK",
    logoUrlsByNetwork: {
        "main": "./img/logo/blackcoin.svg", // Placeholder, need to ensure this file exists or use generic
        "test": "./img/logo/blackcoin-test.svg",
        "regtest": "./img/logo/blackcoin-regtest.svg",
        "signet": "./img/logo/blackcoin-signet.svg"
    },
    coinIconUrlsByNetwork: {
        "main": "./img/logo/blackcoin-icon.svg",
        "test": "./img/logo/blackcoin-test-icon.svg",
        "signet": "./img/logo/blackcoin-signet-icon.svg",
        "regtest": "./img/logo/blackcoin-regtest-icon.svg"
    },
    coinColorsByNetwork: {
        "main": "#181818", // Blackcoin dark theme
        "test": "#1daf00",
        "signet": "#af008c",
        "regtest": "#777"
    },
    siteTitlesByNetwork: {
        "main": "Blackcoin Explorer",
        "test": "Blackcoin Testnet Explorer",
        "regtest": "Blackcoin Regtest Explorer",
        "signet": "Blackcoin Signet Explorer",
    },
    demoSiteUrlsByNetwork: {
        "main": "",
        "test": "",
        "signet": "",
    },
    knownTransactionsByNetwork: {
        main: "", // Fill with meaningful tx if known, or leave empty to disable specific highlight
        test: "",
        signet: ""
    },
    miningPoolsConfigUrls: [
        // Standard mining pools often don't support BLK in the same way, optional
    ],
    maxBlockWeight: 4000000,
    maxBlockSize: 1000000, // Legacy matching
    minTxBytes: 166,
    minTxWeight: 166 * 4,
    difficultyAdjustmentBlockCount: 1440, // Sample difficulty every ~1 day (1440 mins) to avoid OOM with continuous adjustment
    maxSupplyByNetwork: {
        "main": new Decimal(100000000), // Approx
        "test": new Decimal(100000000),
        "regtest": new Decimal(100000000),
        "signet": new Decimal(100000000)
    },
    targetBlockTimeSeconds: 64,
    targetBlockTimeMinutes: 1.066, // 64 / 60
    currencyUnits: currencyUnits,
    currencyUnitsByName: { "BLK": currencyUnits[0], "mBLK": currencyUnits[1], "bits": currencyUnits[2], "sats": currencyUnits[3] },
    baseCurrencyUnit: currencyUnits[3],
    defaultCurrencyUnit: currencyUnits[0],
    feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],

    halvingBlockIntervalsByNetwork: {
        "main": 210000, // Unused for BLK really
        "test": 210000,
        "regtest": 150,
        "signet": 210000
    },

    terminalHalvingCountByNetwork: {
        "main": 32,
        "test": 32,
        "regtest": 32,
        "signet": 32
    },

    coinSupplyCheckpointsByNetwork: {
        "main": [0, new Decimal(0)],
        "test": [0, new Decimal(0)],
        "signet": [0, new Decimal(0)],
        "regtest": [0, new Decimal(0)]
    },

    utxoSetCheckpointsByNetwork: {
        "main": {
        }
    },

    genesisBlockHashesByNetwork: {
        "main": "000001faef25dec4fbcf906e6242621df2c183bf232f263d0ba5b101911e4563",
        "test": "0000000000000000000000000000000000000000000000000000000000000000", // TODO: Find testnet genesis
        "regtest": "0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206",
        "signet": "00000008819873e925422c1ff0f99f7cc9bbb232af63a077a480a3633bee1ef6",
    },
    // Leaving genesis coinbase transactions empty for now unless found. 
    // They are primarily for display on the genesis block page without RPC.
    genesisCoinbaseTransactionIdsByNetwork: {
        "main": "",
        "test": "",
        "regtest": "",
        "signet": ""
    },
    genesisCoinbaseTransactionsByNetwork: {
        "main": {},
        "test": {},
        "regtest": {},
        "signet": {}
    },
    genesisBlockStatsByNetwork: {
        "main": {},
        "test": {},
        "regtest": {},
        "signet": {}
    },
    testData: {
        txDisplayTestList: {}
    },
    genesisCoinbaseOutputAddressScripthash: "",
    historicalData: [], // Add historical price data if available
    exchangeRateData: {
        jsonUrl: "https://api.coingecko.com/api/v3/simple/price?ids=blackcoin&vs_currencies=usd,eur", // Example
        responseBodySelectorFunction: function (responseBody) {
            if (responseBody.blackcoin) {
                return {
                    usd: responseBody.blackcoin.usd,
                    eur: responseBody.blackcoin.eur
                };
            }
            return null;
        }
    },
    blockRewardFunction: function (blockHeight, chain) {
        // Simple return for now
        return new Decimal8(1.5); // Verify current reward scheme
    }
};

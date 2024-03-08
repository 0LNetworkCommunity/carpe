# Carpe - The 0L Desktop Wallet and Miner

## Download the App

Currently Windows and Mac are supported:

- [Download Windows 10+](https://github.com/0LNetworkCommunity/carpe/releases/download/v1.0.2/carpe_1.0.2_x64_en-US.msi) and read the [Windows instructions](docs/start-carpe-windows.md)

- [Download MacOs 11+](https://github.com/0LNetworkCommunity/carpe/releases/download/v1.0.2/carpe_1.0.2_x64.dmg) and read the [Mac instructions](docs/start-carpe-mac.md)

On Windows, currently, Microsoft Edge WebView2 must be installed manually first.
https://developer.microsoft.com/en-us/microsoft-edge/webview2/consumer

# About

Carpe is a desktop "wallet" that connects to the 0L network and lets you create accounts, do some account management. It also is a light "miner" allowing you to mine coins! To learn more about 0L itself follow the link: [0L introduction](https://github.com/OLSF/libra#readme).

# Creating Accounts

Like any account-based blockchain, any new account address you create in the Carpe app will initially be inactive. For the account to become active, it will need to be sent at least one coin. Until that happens your account does not exist "on chain". 

You can either have a friend send you a coin or you can use the drip function in discord here: https://discord.gg/0lnetwork. Go to the getting started section and hop in the carpe-onboarding channel where you simply type '/drip' and enter your adress from your carpe app. The bot will then send you one libra which will activate your account on-chain.

It may take a few seconds, but if it doesn't automatically update your account, you can always hower over the avatar in the top right corner of the app. Click settings on the drop-down menu, and update the playlist which will refresh your connection to the chain and then a simple restart of the app should get you set up for success. 

This can be done as maany times as you'd like, but will often only be necessary on rare occassions.

**Please note that there's currently a limit on the first transfer for a 1000 Libra**

[Join us on Discord and get onboarded](https://discord.gg/AzCp63pggW)

## Configuring slow wallets:

## Canary Testers

If you want to help test upcoming versions, you should install the [Canary Release of Carpe](docs/canary-releases.md).

## Development

If you are a developer and want to contribute to the project, please continue with the [development environment setup](docs/devs/get-started.md).

# Usage of Carpe

## Initial start

After successful installation and first start, you should see an initial screen, which let's you create your account:

![screen01](./img/welcome-carpe.png)

## Create an account

If this is your first usage, you should just click on "new account" and then on "generate keys". You can click on "generate keys" as often as you like until you are happy with the proposed account number.

Then please write down the ACCOUNT ADDRESS, AUTH KEY and the RECOVERY PHRASE.

This is essential, as otherwise you will very likely loose your earned coins.

After writing this down, click on "submit".

## About private keys

Since Carpe needs to send transactions to the blockchain, it will need a private key (which is derived from the mnemonic above). Carpe stores the private key on the OS "keyring", as is the best practice for wallets.

On MacOS you will be prompted for your OS login password (on Windows and Ubuntu you may be prompted based on your settings). As you can see from the instructions, this authorization is only used to read and write to the Carpe Keystore.

![screen01](./img/keyring.png)

## Get a friend to onboard

Until you can use the newly created account, you need some 0L user who "onboards" you. Please send the displayed "authkey" to this person.

After the onboarding transaction has been done, the wallet will show some BALANCE for your account and no longer the text "Account not on chain".

If you don't yet have a friend on 0L, come to the [Discord Server](https://discord.gg/AzCp63pggW) and make a new friend that can send your onboarding transaction.

## Mining

After your account has been onboarded, new menus appear on top of the screen. Switch to "MINER" to earn coins.

To start mining, just click on the red toggle button, so it turns into green color.

## Configuring a slow wallet

To configure a slow wallet, select an account you would like to configure and hover next to the avatar.

A new button will appear. Once pressed the section account info appears.

Below the information about your address and authkey: press the plus in the box that says account acctions, and you will see a button with the text "SET SLOW WALLET ..." on it. 
Once clicked, you will yet again be asked to cofirm that you really wish to turn this account into a slow wallet. 

**A word of caution once set you cannot undo this and the wallet will forever be a slow wallet.**

You need to have at least 1 libra in your account to configure the slow wallet as it is an on-chain event.

For a visual walk-through of how to set a slow wallet, check the screencast below

![settingSlowWallet](https://github.com/Teisson/carpe/assets/97843018/143f3abd-4f32-4301-8762-0896b8bc882b)


## DANGER

There are some dangerous buttons on the "TRANSACTIONS" and "SETTINGS" screens. Don't use them until you know what they do.


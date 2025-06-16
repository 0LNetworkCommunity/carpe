# Carpe Usage Guide

## Initial Setup

After successful installation and launching Carpe for the first time, you'll see a welcome screen that allows you to create your account:

![Welcome Screen](./img/welcome-carpe.png)

## Creating Your Account

If this is your first time using Carpe, follow these steps:

1. Click on "New Account"
2. Click on "Generate Keys"
3. You can click "Generate Keys" multiple times until you're satisfied with the proposed account number
4. **Important**: Write down the following information in a secure location:
   - **Account Address**
   - **Auth Key**
   - **Recovery Phrase**

⚠️ **Critical**: Store this information securely. Without it, you will lose access to your earned coins permanently.

5. After securely recording this information, click "Submit"

## Understanding Private Keys

Carpe needs to send transactions to the blockchain, which requires a private key (derived from your mnemonic phrase). Following security best practices, Carpe stores your private key in your operating system's "keyring" or credential manager.

On macOS, you'll be prompted for your system login password. On Windows and Ubuntu, you may be prompted based on your system settings. This authorization is only used to securely read and write to the Carpe keystore.

![Keyring Access](./img/keyring.png)

## Getting Onboarded

Before you can use your newly created account, you need an existing OpenLibra network user to "onboard" you by sending the initial transaction. Here's how:

1. Share your displayed **Auth Key** with an existing OpenLibra user
2. After the onboarding transaction is completed, your wallet will show a balance
3. The "Account not on chain" message will disappear

**Need help getting onboarded?** If you don't have a friend on the OpenLibra network yet, join our [Discord Server](https://discord.gg/AzCp63pggW) and share your OpenLibra public address in the onboarding channel.

## ⚠️ Important Safety Notice

The "Transactions" and "Settings" screens contain potentially dangerous operations. Do not use these features until you fully understand their implications and consequences.

## Setting Up SlowWallet

SlowWallet is an advanced feature that provides additional security for your funds.

**Prerequisites:**
- Your wallet balance must maintain at least 10 Libra
- **This operation is irreversible - proceed only if you understand the implications**

### Steps to Enable SlowWallet:

1. Click the Settings icon next to the wallet address you want to configure

   ![SlowWallet Setup Step 1](./img/slowwallet-step-1.jpg)

2. If you already have a SlowWallet configured, you'll see this confirmation screen:

   ![SlowWallet Already Configured](./img/slowwallet-step-done.png)

3. If it's not yet a SlowWallet, you'll see the setup option. Click the "SET SLOW WALLET" button:

   ![SlowWallet Setup Step 2](./img/slowwallet-step-2.jpg)

4. The system will prompt for authorization. Wait for the transaction to complete successfully:

   ![Authorization Prompt](./img/keyring.png)

   ![SlowWallet Success](./img/slowwallet-step-success.png)

## Getting Help

If you encounter any issues during setup or usage, please join our [Discord Server](https://discord.gg/AzCp63pggW) for support and feedback.

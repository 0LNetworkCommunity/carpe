<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
import AccountFromMnem from "./wallet/AccountFromMnem.svelte";

  let result: string = "";

  let swarm_running: string = "";
  let swarm_files: string = "";

  let authkey: string = "";
  let account: string = "4c613c2f4b1e67ca8d98a542ee3f59f5";
  let mnemonic: string = "";

  let home: string = "";
  // let sourcePath: string = "/Users/ping/workspace/libra/";
  let sourcePath: string = "/Users/lucas/code/rust/ol/";

  const keygen = async () => {
    invoke("keygen", {})
      .then((res) => {
        let o = JSON.parse(res);
        if ("account" in o) {
          console.log(o);
          account = o.account;
          authkey = o.authkey;
          mnemonic = o.mnemonic;
        }
        result = res;
      })
      .catch((e) => console.error(e));
  };

  const easySwarm = async () => {
    invoke("easy_swarm", {
      sourcePath: sourcePath,
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const initSwarm = async () => {
    invoke("init_swarm", {
      swarmPath: home.concat("swarm_temp"),
      swarmPersona: "alice",
      sourcePath: sourcePath,
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const init = async () => {
    invoke("init_user", {
      authkey: authkey,
      account: account,
      // pathStr: home,
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const demoTx = async () => {
    invoke("demo_tx", {
      account: account,
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const demo = async () => {
    invoke("demo", {
      configDir: home.concat("/swarm_temp"),
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const miner = async () => {
    invoke("swarm_miner", {
      swarmDir: home.concat("swarm_temp"),
      swarmPersona: "alice",
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const swarmCheck = async () => {
    invoke("swarm_process", {})
      .then((res) => (swarm_running = res))
      .catch((e) => console.error(e));

    invoke("swarm_files", {
      swarmDir: home.concat("swarm_temp"),
    })
      .then((res) => (swarm_files = res))
      .catch((e) => console.error(e));
  };

  /*
  window.__TAURI__.path.homeDir().then(dir =>{
    home = dir
   });
   */
</script>

<main>
  <div>
    <div>
      <div>
        <!-- <h3>Home {home} account: {account}</h3> -->
        <!-- <span uk-icon="icon: home" /> -->

        <button class="uk-button uk-button-default" on:click={keygen}
          >Keygen</button
        >

        <button class="uk-button uk-button-default" on:click={init}>Init</button
        >

        <AccountFromMnem/>

        <div>
          <h2>swarm</h2>
          <div>
            <p>start swarm with: needs swarm_temp absolute path</p>
            <p>
              NODE_ENV="test" cargo run -p libra-swarm -- --libra-node
              target/debug/libra-node -c {home}swarm_temp
            </p>
          </div>
          <p>swarm running: {swarm_running}</p>
          <p>swarm files: {swarm_files}</p>

          <button class="uk-button uk-button-default" on:click={swarmCheck}
            >Check Swarm</button
          >

          <button class="uk-button uk-button-default" on:click={initSwarm}
            >Init Alice</button
          >

          <button class="uk-button uk-button-default" on:click={demo}
            >Swarm Demo Tx</button
          >

          <button class="uk-button uk-button-default" on:click={miner}
            >Mine Once</button
          >

          <h2>TestNet</h2>
          <button class="uk-button uk-button-default" on:click={demoTx}>Demo Tx</button
          >
        </div>
      </div>
      <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
        <h5 class="uk-card-title">Debugging</h5>

            <table class="uk-table uk-table-divider">
              <thead>
                <tr>
                  <th>Path</th>
                  <th>Address</th>
                  <th>Mnem</th>
                </tr>
              </thead>
              <tbody>
                <!-- {#each accounts as account} -->
                  <tr>
                    <td>{home}</td>
                    <td>{account}</td>
                    <td>{mnemonic}</td>
                  </tr>
                <!-- {/each} -->
              </tbody>
            </table>

        <p>
          {#if result.length !== 0}
            {result}
          {:else}
            No result yet.
          {/if}
        </p>
      </div>
    </div>
  </div>
</main>

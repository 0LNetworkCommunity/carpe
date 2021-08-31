<script lang="ts">

  import UIkit from 'uikit';
  import Icons from 'uikit/dist/js/uikit-icons';

  // loads the Icon plugin
  UIkit.use(Icons);


// // components can be called from the imported UIkit reference
// UIkit.notification('Hello world.');

  import { invoke } from "@tauri-apps/api/tauri";

  let result: string = "";

  let swarm_running: string = "";
  let swarm_files: string = "";

  let authkey: string = "";
  let account: string = "";

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
      swarmPath: home.concat('swarm_temp'),
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
      pathStr: home,
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const demo = async () => {
    invoke("demo", {
      configDir: home.concat('/swarm_temp'),
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const miner = async () => {
    invoke("swarm_miner", {
      swarmDir: home.concat('swarm_temp'),
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
      swarmDir: home.concat('swarm_temp'),
    })
      .then((res) => (swarm_files = res))
      .catch((e) => console.error(e));
  };


  window.__TAURI__.path.homeDir().then(dir =>{
    home = dir
   });
</script>

<main>
  <div>
    <div class="uk-background-primary">
      <div>
        <p>0L Light Node</p>
      </div>
      <div>
        <h3>Home {home} account: {account}</h3>
        <span uk-icon="icon: home"></span>
        <!-- <CardSubtitle>Example of async call to Tauri</CardSubtitle> -->
        <!-- <CardText>Write something below and press the a.</CardText> -->
        <!-- <Input type="text" bind:value={input} /> -->
        <!-- <a color="primary" on:click={handleClick}>Call Rust</a> -->
        <!-- <a on:click={hello}>Hello</a> -->

        <a on:click={keygen}>Keygen</a>

        <a on:click={init}>Init</a>

        <div>
          <h3>swarm</h3>
          <div>
            <p>start swarm with: needs swarm_temp absolute path</p>
            <p>
              NODE_ENV="test" cargo run -p libra-swarm -- --libra-node
              target/debug/libra-node -c {home}swarm_temp
            </p>
          </div>
          <p>swarm running: {swarm_running}</p>
          <p>swarm files: {swarm_files}</p>

          <button class="uk-button uk-button-default">Start Swarm</button>
          <!-- <button class="uk-button uk-button-default" on:click={easySwarm}>Start Swarm</button> -->

          <a on:click={swarmCheck}>Check Swarm</a>

          <a on:click={initSwarm}>Init Alice</a>

          <a on:click={demo}>Swarm Demo Tx</a>

          <a on:click={miner}>Mine Once</a>

          
        </div>
      </div>
      <div>
        {#if result.length !== 0}
          {result}
        {:else}
          No result yet.
        {/if}
      </div>
    </div>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

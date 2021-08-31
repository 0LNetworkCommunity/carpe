<script lang="ts">
  import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Container,
  } from "sveltestrap";

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

  // const start_swarm = async () => {
  //   invoke("start_swarm", {
  //     libraNode: sourcePath.concat("target/release/libra-node"),
  //     configPath: home.concat('swarm_temp'),
  //     numNodes: 0,
  //     numFullNodes: 0,
  //   })
  //     .then((res) => (result = res))
  //     .catch((e) => console.error(e));
  // };
  // const init_swarm_miner = async () => {
  //     invoke('init_swarm_miner',{
  //        swarmPath: '/Users/ping/swarm',
  //        swarmPersona: 'alice',
  //        sourcePath: '/Users/ping/workspace/libra',
  //     })
  //       .then((res) => result = res)
  //       .catch((e) => console.error(e))
  //     };

  window.__TAURI__.path.homeDir().then(dir =>{
    home = dir
   });
</script>

<main>
  <Container>
    <Card class="mb-3">
      <CardHeader>
        <CardTitle>0L Light Node</CardTitle>
      </CardHeader>
      <CardBody>
        <h3>Home {home} account: {account}</h3>

        <!-- <CardSubtitle>Example of async call to Tauri</CardSubtitle> -->
        <!-- <CardText>Write something below and press the button.</CardText> -->
        <!-- <Input type="text" bind:value={input} /> -->
        <!-- <Button color="primary" on:click={handleClick}>Call Rust</Button> -->
        <!-- <Button on:click={hello}>Hello</Button> -->

        <Button on:click={keygen}>Keygen</Button>

        <Button on:click={init}>Init</Button>

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

          <Button on:click={easySwarm}>Start Swarm</Button>

          <Button on:click={swarmCheck}>Check Swarm</Button>

          <Button on:click={initSwarm}>Init Alice</Button>

          <Button on:click={demo}>Swarm Demo Tx</Button>

          <Button on:click={miner}>Mine Once</Button>

          
        </div>
      </CardBody>
      <CardFooter>
        {#if result.length !== 0}
          {result}
        {:else}
          No result yet.
        {/if}
      </CardFooter>
    </Card>
  </Container>
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

<script lang="ts">
  import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Container,
    Input,
  } from "sveltestrap";

  import { invoke } from "@tauri-apps/api/tauri";

  let input: string = "";
  let result: string = "";

  let swarm_running: string = "";
  let swarm_files: string = "";

  let authkey: string = "";
  let account: string = "";

  let temp_path: string = "/Users/lucas/code/rust/tauri-demo";
  let swarm_path: string = "/Users/lucas/code/rust/ol/swarm_temp";
  let source_path: string = "/Users/lucas/code/rust/ol/";
  // https://github.com/OLSF/libra/blob/main/ol/documentation/devs/swarm_qa_tools.md

  const hello = async () => {
    invoke("hello", {
      hello: account,
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

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

  const initSwarm = async () => {
    invoke("init_swarm", {
      swarmPath: swarm_path,
      swarmPersona: "alice",
      sourcePath: source_path,
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const init = async () => {
    invoke("init_user", {
      authkey: authkey,
      account: account,
      pathStr: temp_path,
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const demo = async () => {
    invoke("demo", {
      configDir: swarm_path,
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const miner = async () => {
    invoke("swarm_miner", {
      swarmDir: swarm_path,
      swarmPersona: "alice",
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const swarmProcess = async () => {
    invoke("swarm_process", {})
      .then((res) => (swarm_running = res))
      .catch((e) => console.error(e));
    invoke("swarm_process", {
      swarmDir: swarm_path
    })
      .then((res) => (swarm_running = res))
      .catch((e) => console.error(e));
  };

  // const wizard_user = async () => {
  //   invoke("wizard_user", {
  //     home: input,
  //     blockZero: "",
  //   })
  //     .then((res) => (result = res))
  //     .catch((e) => console.error(e));
  // };


  // const stop_node = async () => {
  //   invoke("stop_node", {})
  //     .then((res) => (result = res))
  //     .catch((e) => console.error(e));
  // };
  // const stop_mining = async () => {
  //   invoke("stop_mining", {})
  //     .then((res) => (result = res))
  //     .catch((e) => console.error(e));
  // };
</script>

<main>
  <Container>
    <Card class="mb-3">
      <CardHeader>
        <CardTitle>0L Light Node</CardTitle>
      </CardHeader>
      <CardBody>
        <h3>account: {account}</h3>

        <!-- <CardSubtitle>Example of async call to Tauri</CardSubtitle> -->
        <!-- <CardText>Write something below and press the button.</CardText> -->
        <!-- <Input type="text" bind:value={input} /> -->
        <!-- <Button color="primary" on:click={handleClick}>Call Rust</Button> -->
        <!-- <Button on:click={hello}>Hello</Button> -->

        <Button on:click={keygen}>Keygen</Button>

        <Button on:click={init}>Init</Button>

        <div>
          <h3> swarm </h3>
          <p> swarm running: {swarm_running} </p>
          <p> swarm files: {swarm_files} </p>

          <Button on:click={swarmProcess}>Check Swarm</Button>
          
          <Button on:click={initSwarm}>Init Swarm</Button>

          <Button on:click={demo}>Swarm Demo Tx</Button>

          <Button on:click={miner}>Mine Once</Button>
        </div>

        <!-- <Button color="danger" on:click={wizard_user}>wizard-user</Button>
        <Button color="danger" on:click={wizard_user_check}
          >wizard-user-check</Button
        > -->
        <!-- <br /> -->
        <!-- <Button color="danger" on:click={mining}>Start mining</Button>
        <Button color="danger" on:click={stop_mining}>Stop mining</Button>
        <Button color="danger" on:click={start_node}>Start node</Button>
        <Button color="danger" on:click={stop_node}>Stop node</Button> -->
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

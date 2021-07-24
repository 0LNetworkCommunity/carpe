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
  
  let authkey: string = "";
  let account: string = "";


  const handleClick = async () => {
    invoke("keygen", {})
      .then((res) => {
        let o = JSON.parse(res);
        if ('account' in o) {
          console.log(o);
          account = o.account;
        }
        result = res;
      })
      .catch((e) => console.error(e));
  };

  const wizard_user = async () => {
    invoke("wizard_user", {
      home: input,
      blockZero: "",
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };
  const wizard_user_check = async () => {
    invoke("wizard_user_check", {
      home: "/Users/ping/.0L/account.json",
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };
  const mining = async () => {
    invoke("start_mining", {
      home: "/Users/ping/.0L",
      swarmPath: "/Users/ping/swarm",
      swarmPersona: "alice",
      isOperator: false,
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };
  const start_node = async () => {
    invoke("start_node", {
      swarmPath: "/Users/ping/.0L",
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };
  const stop_node = async () => {
    invoke("stop_node", {})
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };
  const stop_mining = async () => {
    invoke("stop_mining", {})
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };
</script>

<main>
  <Container>
    <Card class="mb-3">
      <CardHeader>
        <CardTitle>0L Light Node</CardTitle>
      </CardHeader>
      <CardBody>
         <h1> account: {account}</h1>

        <CardSubtitle>Example of async call to Tauri</CardSubtitle>
        <CardText>Write something below and press the button.</CardText>
        <Input type="text" bind:value={input} />
        <Button color="primary" on:click={handleClick}>Call Rust</Button>
        <Button color="danger" on:click={handleClick}>Keygen</Button>
        <Button color="danger" on:click={wizard_user}>wizard-user</Button>
        <Button color="danger" on:click={wizard_user_check}
          >wizard-user-check</Button
        >
        <br />
        <Button color="danger" on:click={mining}>Start mining</Button>
        <Button color="danger" on:click={stop_mining}>Stop mining</Button>
        <Button color="danger" on:click={start_node}>Start node</Button>
        <Button color="danger" on:click={stop_node}>Stop node</Button>
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

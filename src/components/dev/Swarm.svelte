<script lang="ts">
    import { invoke } from "@tauri-apps/api/tauri";
    let home_path = "";
    let swarm_running = "";
    let swarm_files = "";

  const easySwarm = async () => {
    invoke("easy_swarm", {})
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const initSwarm = async () => {
    invoke("init_swarm", {})
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };


  const demo = async () => {
    invoke("demo", {
      configDir: home_path.concat("/swarm_temp"),
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const miner = async () => {
    invoke("swarm_miner", {
      swarmDir: home_path.concat("swarm_temp"),
      swarmPersona: "alice",
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const swarmCheck = async () => {
    invoke("swarm_process", {})
      .then((res) => (swarm_running = res))
      .catch((e) => console.error(e));

    invoke("swarm_files", {})
      .then((res: JSON) => {
        console.log(res);
        swarm_files = res;
      })
      .catch((e) => console.error(e));
  };

</script>
<main>
    <div class="uk-margin">
      <h2>swarm</h2>
      <div>
        <p>start swarm with: needs swarm_temp absolute path</p>
        <p>
          NODE_ENV=test cargo run -p diem-swarm -- --diem-node
          target/debug/diem-node -c your/home/.0L/swarm_temp
        </p>
      </div>
      <p>swarm running: {swarm_running}</p>
      <p>swarm path: {swarm_files.path_exists} - {swarm_files.path} </p>
      <p>alice config path: {swarm_files.config_path_exists} - {swarm_files.config_path} </p>
      <p>alice proof zero path: {swarm_files.proof_exists} - {swarm_files.proof_path} </p>

      <button class="uk-button uk-button-default" on:click={easySwarm}
        >Start Swarm</button
      >

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
    </div>
</main>
<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { account } from "../../accounts";
  import { errors, responses } from "../../debug";
  let home_path = "";
  let swarm_running = "";
  let swarm_files = "";

  const easySwarm = async () => {
    invoke("easy_swarm", {})
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };

  const initAliceFiles = async () => {
    invoke("init_swarm", {})
      .then((res) => {
        result = res;
        swarmCheck();
      })
      .catch((e) => console.error(e));
  };

  const demo = async () => {
    invoke("swarm_demo_tx", {})
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

  const initAliceKeys = async () => {
    invoke("init_from_mnem", { mnem: alice_mnem })
      .then((res) => {
        responses.set(res);
        account.set(res);

        UIkit.notification({
          message: `private key ${res}`,
          pos: "bottom-center",
          status: "success",
          timeout: 3000,
        });
      })
      .catch((error) => {
        window.alert(error);
        errors.set(error);
      });
  };

  let alice_mnem =
    "talent sunset lizard pill fame nuclear spy noodle basket okay critic grow sleep legend hurry pitch blanket clerk impose rough degree sock insane purse";
</script>

<main>
  <div class="uk-margin">
    <h2>swarm</h2>
    <div>
      <p>start swarm with:</p>
      <p>
        NODE_ENV=test cargo run -p diem-swarm -- --diem-node
        target/debug/diem-node -c ~/.0L/swarm_temp
      </p>

      <p>Carpe expects the swarm files to be in ~/.0L/swarm_temp</p>
    </div>
    <h4>Swarm Diagnostics</h4>
    <p>swarm running: {swarm_running}</p>
    <p>swarm path: {swarm_files.path_exists} - {swarm_files.path}</p>
    <p>
      alice config path: {swarm_files.config_path_exists} - {swarm_files.config_path}
    </p>
    <p>
      alice proof zero path: {swarm_files.proof_exists} - {swarm_files.proof_path}
    </p>

    <div uk-grid>
      <button class="uk-button uk-button-default" on:click={swarmCheck}
        >Check Swarm</button
      >

      <button class="uk-button uk-button-default" on:click={initAliceFiles}
        >Init Alice Files</button
      >

      <button class="uk-button uk-button-default" on:click={initAliceKeys}
        >Init Alice Keys</button
      >

      <button class="uk-button uk-button-default" on:click={demo}
        >Swarm Demo Tx</button
      >

      <button class="uk-button uk-button-default" on:click={miner}
        >Mine Once</button
      >
    </div>
  </div>
</main>

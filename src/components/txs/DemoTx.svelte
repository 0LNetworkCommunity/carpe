<script>
    const demoTx = async () => {
    invoke("demo_tx", {
      account: account,
    })
      .then((res) => (result = res))
      .catch((e) => console.error(e));
  };
</script>


<main>
  <button class="uk-button uk-button-default" on:click={demoTx}>Demo Tx</button>
</main>

<script>
  export let loading = true;
</script>

<style>
  .splash-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }

  .logo {
    width: 150px;
    height: 150px;
  }

  h1 {
    margin-top: 20px;
    font-size: 2rem; 
  }
</style>

{#if loading}
  <div class="splash-container">
    <img src="/libra.png" alt="Libra Logo" class="logo" />
    <h1 class="uk-text-muted">Carpe Libra</h1>
  </div>
{/if}

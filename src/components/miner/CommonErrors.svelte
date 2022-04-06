<script lang="ts">
  import DiscoError from "./cards/DiscoError.svelte";
  import InvalidProof from "./cards/InvalidProof.svelte";
  import TooManyProofs from "./cards/TooManyProofs.svelte";
  import WrongDifficulty from "./cards/WrongDifficulty.svelte";

</script>

<main class="uk-margin">
  <div class="uk-grid uk-child-width-expand">
    <WrongDifficulty/>
    <TooManyProofs/>
    <InvalidProof/>
    <DiscoError/>
  </div>
</main>
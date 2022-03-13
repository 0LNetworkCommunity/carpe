<script lang="ts">
  import { _ } from "svelte-i18n";
  import CardAlert from "../../layout/CardAlert.svelte";
</script>

<main>
  <CardAlert>
    <span slot="title">{$_("miner.cards.cant_start.title")} </span>
    <div slot="body">
      <p> {$_("miner.cards.cant_start.body")} </p>
    </div>
  </CardAlert>
</main>
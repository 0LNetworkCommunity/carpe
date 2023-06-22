<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { get_metadata } from "../../networks";

  let metadata: string;
  get_metadata()
  .then((r: string) => {
    metadata = r;
  });

</script>

<main>
  <div class="uk-margin-bottom">
    <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">
      Chain Metadata
    </h4>
    <div>
      <span>API index: {metadata} </span>
    </div>
  </div>
</main>

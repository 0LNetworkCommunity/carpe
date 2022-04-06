<script lang="ts">
  import { _ } from "../../lang/i18n";
  import { setLocale } from "../../preferences";

</script>

<main class="uk-margin">
  <h4 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> {$_("settings.langapp_settings.title")}</h4>
  
  <form id="account-form">
    <fieldset class="uk-fieldset">
      <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin"> {$_("settings.langapp_settings.lang")} </h5>
      <p>{$_("settings.langapp_settings.lang_description")}</p>
      <button class="uk-button uk-button-default" type="button">{$_("settings.langapp_settings.lang_button")}</button>
      <div uk-dropdown="mode: click">
        <ul class="uk-nav uk-dropdown-nav">
          <li><a class="uk-text-muted" href={"#"} on:click={() => setLocale("en")}>English</a></li>
          <li><a class="uk-text-muted" href={"#"} on:click={() => setLocale("zh_cn")}>中文</a></li>
          <li><a class="uk-text-muted" href={"#"} on:click={() => setLocale("fr")}>French</a></li>
          <li><a class="uk-text-muted" href={"#"} on:click={() => setLocale("de")}>German</a></li>
          <li><a class="uk-text-muted" href={"#"} on:click={() => setLocale("es")}>Spanish</a></li>
          <li><a class="uk-text-muted" href={"#"} on:click={() => setLocale("it")}>Italian</a></li>
          <li><a class="uk-text-muted" href={"#"} on:click={() => setLocale("pt")}>Portuguese</a></li>
          <li><a class="uk-text-muted" href={"#"} on:click={() => setLocale("ar")}>Arabic</a></li>
        </ul>
      </div>

  <!-- <h5 class="uk-text-light uk-text-uppercase uk-text-muted uk-text-thin">{$_("settings.langapp_settings.theme")}</h5>
  <p>{$_("settings.langapp_settings.theme_description")}</p> -->

    </fieldset>
  </form>
</main>

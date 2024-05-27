<script>
  export let showNoteColumn = false
</script>

<tr>
  <td>
    <span class="pulse" style="display: inline-block; width: 30px; height: 20px;"></span>
  </td>
  {#if showNoteColumn}
    <td class="uk-text-left uk-transition-toggle uk-table-shrink note-column">
      <span class="pulse" style="display: inline-block; width: 100px; height: 20px;"></span>
    </td>
  {/if}
  <td class="uk-transition-toggle uk-table-shrink" style="cursor: grab">
    <div class="uk-flex-inline">
      <span
        class="uk-text-truncate pulse"
        style={showNoteColumn
          ? 'width: 26vw; display: inline-block'
          : 'width: 32vw; display: inline-block'}>X</span
      >
    </div>
  </td>
  <td class="uk-text-right">
    <span class="pulse" style="display: inline-block; width: 50px; height: 20px;"></span>
  </td>
  <td class="uk-text-right uk-text-nowrap">
    <span class="pulse" style="display: inline-block; width: 100px; height: 20px;"></span>
  </td>
</tr>

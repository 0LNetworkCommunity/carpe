<script lang="ts">
  /* Account events table with pagination */
  import { _ } from "svelte-i18n";
  import PageNumber from "./PageNumber.svelte";
  import { printCoins } from "../../coinHelpers";

  export let events;
  
  const maxPageSize = 5;
  const eventTypesDic = {
    receivedpayment: $_("events.received_payment"),
    sentpayment: $_("events.sent_payment")
  }

  $: pages = splitPages(events, maxPageSize);  
  let pageIndex = 1; // [ 1 ... pages length ]
  
  function splitPages(items, pageSize: number) {
    let ret = {};
    let num = 1;
    for (let i = 0; i < items.length; i = i + pageSize) {
      let nextPage = items.slice(i, i + pageSize);
      ret[num] = nextPage;
      num++;
    }
    return ret;
  }  

  function previousPageClick() {
    if (pageIndex > 1) {
      pageIndex = pageIndex - 1;
    }    
  }

  function nextPageClick() {
    if (pageIndex < Object.keys(pages).length) {
      pageIndex = pageIndex + 1;
    }    
  }

  function formatEventType(type) {
    const value = eventTypesDic[type];
    return value || type;
  }
</script>

<main>
  <!-- Table -->
  <table class="uk-table uk-table-divider">
    <thead>
      <tr>
        <th class="uk-text-right">{$_("events.version")}</th>
        <th class="uk-text-center" style="width: 98px">{$_("events.type")}</th>
        <th class="uk-text-right">{$_("events.amount")}</th>
        <th class="uk-text-center">{$_("events.sender")}</th>
        <th class="uk-text-center">{$_("events.receiver")}</th>
      </tr>
    </thead>
    <tbody>
      {#each pages[pageIndex] as event}
        <tr>
          <td class="uk-text-right">{event.transaction_version}</td>
          <td class="uk-text-center">{formatEventType(event.data.type)}</td>
          <td class="uk-text-right">{printCoins(event.data.amount.amount)}</td>
          <td class="uk-text-center">{event.data.sender}</td>
          <td class="uk-text-center">{event.data.receiver}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- 
    Pagination Controller

    case 0:
    < 1 2 3 4 5 6 7 >

    case 1:
    < 1 2 3 4 5 … 8 >

    case 2:
    < 1 … 4 5 6 7 8 >

    case 3:
    < 1 … 3 4 5 … 8 >   
  -->
  {#if Object.keys(pages).length > 1}
    <div class="pagination-container uk-text-center">
      <a 
        href={'#'}
        class="previous-page-btn uk-align-left uk-text-center" 
        on:click={previousPageClick} 
      >
        <span uk-icon="chevron-left"></span>
      </a>
      <div class="page-numbers-container uk-align-left ">
        <!-- Case 0 -->
        {#if Object.keys(pages).length <= 7}
          {#each Object.keys(pages) as number}
            <PageNumber number={Number(number)} bind:index={pageIndex} />
          {/each}
        <!-- Case 1 -->
        {:else if pageIndex <= 4}
          <PageNumber number={1} bind:index={pageIndex} />
          <PageNumber number={2} bind:index={pageIndex} />
          <PageNumber number={3} bind:index={pageIndex} />
          <PageNumber number={4} bind:index={pageIndex} />
          <PageNumber number={5} bind:index={pageIndex} />
          <div class="uk-text-center uk-align-left reticence">...</div>
          <PageNumber number={Object.keys(pages).length} bind:index={pageIndex} />
        <!-- Case 2 -->
        {:else if Object.keys(pages).length - pageIndex < 4}
          <PageNumber number={1} bind:index={pageIndex} />
          <div class="uk-text-center uk-align-left reticence">...</div>
          <PageNumber number={Object.keys(pages).length - 4} bind:index={pageIndex} />
          <PageNumber number={Object.keys(pages).length - 3} bind:index={pageIndex} />
          <PageNumber number={Object.keys(pages).length - 2} bind:index={pageIndex} />
          <PageNumber number={Object.keys(pages).length - 1} bind:index={pageIndex} />
          <PageNumber number={Object.keys(pages).length} bind:index={pageIndex} />
        <!-- Case 3 -->
        {:else}
          <PageNumber number={1} bind:index={pageIndex} />
          <div class="uk-text-center uk-align-left reticence">...</div>
          <PageNumber number={pageIndex - 1} bind:index={pageIndex} />
          <PageNumber number={pageIndex} bind:index={pageIndex} />
          <PageNumber number={pageIndex + 1} bind:index={pageIndex} />
          <div class="uk-text-center uk-align-left reticence">...</div>
          <PageNumber number={Object.keys(pages).length} bind:index={pageIndex} />
        {/if}
      </div>
      <a 
        href={'#'}
        class="next-page-btn uk-align-left uk-text-center"
        on:click={nextPageClick}
      >
        <span uk-icon="chevron-right"></span>
      </a>
    </div>    
  {/if}   
</main>

<style>
  .pagination-container {
    display: flex; 
    width: fit-content; 
    margin: auto;         
    -webkit-touch-callout: none;
      -webkit-user-select: none;
        -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
  }

  .page-numbers-container {
    width: fit-content;
    height: fit-content;
    padding: 0px 10px 0px 10px;
    margin: 0px;
    border-radius: 30px;
    background-color: #F0F0F0;
  }
  .previous-page-btn {
    display: flex;
    justify-content: center;
    width: 20px; 
    height: 20px; 
    border-radius: 100%; 
    color: grey;
    background-color: #F0F0F0; 
    border-radius: 100%; 
    padding: 5px; 
    margin: 0px 10px 0px 0px;
  }

  .next-page-btn {
    display: flex;
    justify-content: center;
    width: 20px; 
    height: 20px; 
    border-radius: 100%; 
    color: grey;
    background-color: #F0F0F0; 
    border-radius: 100%; 
    padding: 5px; 
    margin: 0px 0px 0px 10px;
  }
  .reticence {
    width: 20px; 
    height: 20px; 
    padding: 5px; 
    margin: 0px;
    line-height: 20px !important;
  }
</style>
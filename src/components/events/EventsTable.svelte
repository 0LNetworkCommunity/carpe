<script lang="ts">
  /* Table with pagination */

  import { get_locale } from "../../accountActions";
  import PageNumber from "./PageNumber.svelte";

  export let events;
  
  const maxPageSize = 5;
  const eventTypesDic = {
    receivedpayment: "Received Payment",
    sentpayment: "Sent Payment",
  }

  $: pages = splitPages(events, maxPageSize);  

  let currentPageIndex = 1;
  
  function splitPages(events, pageSize: number) {
    let ret = {};
    let num = 1;
    for (let i = 0; i < events.length; i = i + pageSize) {
      let nextPage = events.slice(i, i + pageSize);
      ret[num] = nextPage;
      num++;
    }
    return ret;
  }  

  function previousPageClick() {
    if (currentPageIndex > 1) {
      currentPageIndex = currentPageIndex - 1;
    }    
  }

  function nextPageClick() {
    if (currentPageIndex < Object.keys(pages).length) {
      currentPageIndex = currentPageIndex + 1;
    }    
  }

  // TODO: move to tauri commands
  function formatAmount(balance) {
    const balanceScaled = balance / 1000000;

    return balanceScaled.toLocaleString(get_locale(), {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function formatEventType(type) {
    const value = eventTypesDic[type];
    return value || type;
  }
</script>

<main class="uk-height-viewport">
    <!-- Table -->
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th class="uk-text-right">Version</th>
          <th class="uk-text-center">Type</th>
          <th class="uk-text-right">Amount</th>
          <th class="uk-text-center">Sender</th>
          <th class="uk-text-center">Receiver</th>
        </tr>
      </thead>
      <tbody>
        {#each pages[currentPageIndex] as event}
          <tr>
            <td class="uk-text-right">{event.transaction_version}</td>
            <td class="uk-text-center">{formatEventType(event.data.type)}</td>
            <td class="uk-text-right">{formatAmount(event.data.amount.amount)}</td>
            <td class="uk-text-center">{event.data.sender}</td>
            <td class="uk-text-center">{event.data.receiver}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <!-- Controller -->
    {#if Object.keys(pages).length > 1}
      <div class="uk-text-center" style="
        width: fit-content;
        margin: auto;
        -webkit-touch-callout: none;
          -webkit-user-select: none;
           -khtml-user-select: none;
             -moz-user-select: none;
              -ms-user-select: none;
                  user-select: none;">
        <a 
          class="uk-icon-link uk-align-left uk-text-center" 
          style="width: 20px; height: 20px; border-radius: 100%; background-color: #F0F0F0; border-radius: 100%; padding: 5px; margin: 5px;" 
          uk-icon="chevron-left" 
          on:click={previousPageClick} 
        ></a>
        <!-- Case 0 -->
        {#if Object.keys(pages).length <= 5}
          {#each Object.keys(pages) as number}
            <PageNumber number={Number(number)} bind:current={currentPageIndex} />
          {/each}
        <!-- Case 1 -->
        {:else if currentPageIndex <= 3}
          <PageNumber number={1} bind:current={currentPageIndex} />
          <PageNumber number={2} bind:current={currentPageIndex} />
          <PageNumber number={3} bind:current={currentPageIndex} />
          <PageNumber number={4} bind:current={currentPageIndex} />
          <div class="uk-text-center uk-align-left" style="width: 20px; height: 20px; padding: 5px; margin: 5px;">...</div>
          <PageNumber number={Object.keys(pages).length} bind:current={currentPageIndex} />
        <!-- Case 2 -->
        {:else if Object.keys(pages).length - currentPageIndex < 3}
          <PageNumber number={1} bind:current={currentPageIndex} />
          <div class="uk-text-center uk-align-left" style="width: 20px; height: 20px; padding: 5px; margin: 5px;">...</div>
          <PageNumber number={Object.keys(pages).length - 3} bind:current={currentPageIndex} />
          <PageNumber number={Object.keys(pages).length - 2} bind:current={currentPageIndex} />
          <PageNumber number={Object.keys(pages).length - 1} bind:current={currentPageIndex} />
          <PageNumber number={Object.keys(pages).length} bind:current={currentPageIndex} />
        <!-- Case 3 -->
        {:else}
          <PageNumber number={1} bind:current={currentPageIndex} />
          <div class="uk-text-center uk-align-left" style="width: 20px; height: 20px; padding: 5px; margin: 5px;">...</div>
          <PageNumber number={currentPageIndex - 1} bind:current={currentPageIndex} />
          <PageNumber number={currentPageIndex} bind:current={currentPageIndex} />
          <PageNumber number={currentPageIndex + 1} bind:current={currentPageIndex} />
          <div class="uk-text-center uk-align-left" style="width: 20px; height: 20px; padding: 5px; margin: 5px;">...</div>
          <PageNumber number={Object.keys(pages).length} bind:current={currentPageIndex} />
        {/if}
        <a 
          class="uk-icon-link uk-align-left uk-text-center"
          style="width: 20px; height: 20px; border-radius: 100%; background-color: #F0F0F0; border-radius: 100%; padding: 5px; margin: 5px;"
          uk-icon="chevron-right"
          on:click={nextPageClick}
        ></a>
      </div>    
    {/if}   
</main>


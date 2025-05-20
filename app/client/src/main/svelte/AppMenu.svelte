<script>
  export let open = false;
</script>

<button
  class="text-white hover:text-gray-300 cursor-pointer mr-2 border-none focus:outline-none"
  class:open
  on:click={() => (open = !open)}
  aria-label="Menu"
>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    {#if open}
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    {:else}
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    {/if}
  </svg>
</button>

<style>
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 0.375rem;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }
</style>

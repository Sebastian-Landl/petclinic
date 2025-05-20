<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import filterProps from "../filterProps.js";
  const props = filterProps(["disabled", "label", "title", "value", "placeholder"], $$props);
  export let disabled = false;
  export let label = undefined;
  export let title = undefined;
  export let value;
  export let placeholder = "";
  let focused;
  let element;
  export function focus() {
    element.focus();
  }
  $: valueInternal = value;
  function onChange() {
    value = valueInternal;
    dispatch("change", value);
  }
</script>

<div class="mt-1 relative">
  {#if label}
    <label
      for="input-{label}"
      class="block text-sm font-medium text-github-text mb-1"
    >
      {label}
    </label>
  {/if}
  <input
    id="input-{label}"
    bind:this={element}
    type="text"
    {...props}
    {title}
    {disabled}
    {placeholder}
    class="block w-full px-3 py-2 border border-github-border rounded-md shadow-sm placeholder-github-gray
           focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500
           text-github-text bg-white text-sm
           {disabled ? 'opacity-60 cursor-not-allowed bg-github-bg' : ''}"
    aria-label={label}
    bind:value={valueInternal}
    on:change={onChange}
    on:input
    on:keydown
    on:keypress
    on:keyup
    on:click
    on:focus={() => (focused = true)}
    on:focus
    on:blur={() => (focused = false)}
    on:blur
  />
</div>

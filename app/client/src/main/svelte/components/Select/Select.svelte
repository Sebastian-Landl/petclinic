<script>
  import { createEventDispatcher, tick } from "svelte";
  const dispatch = createEventDispatcher();
  import filterProps from "../filterProps.js";
  const props = filterProps(
    [
      "allItem",
      "disabled",
      "label",
      "nullable",
      "title",
      "value",
      "valueGetter",
    ],
    $$props
  );
  export let allItem;
  export let disabled = false;
  export let label = undefined;
  export let nullable = false;
  export let title = undefined;
  export let value;
  export let valueGetter = undefined;

  let _focused;
  let _element;
  export function focus() {
    _element.focus();
  }

  $: _primitive =
    allItem.slice(0, 1).findIndex((e) => typeof e !== "object") !== -1;

  $: _allItemIndexed = allItem.map((e, i) => itemMapper(e, i));
  function itemMapper(e, i) {
    if (_primitive) {
      return {
        value: e,
        text: e,
      };
    } else {
      return {
        value: i,
        text: e.text,
      };
    }
  }

  $: _itemSelected = itemSelected(value);
  function itemSelected(v) {
    if (_primitive) {
      return v;
    } else {
      if (typeof valueGetter === "function") {
        return allItem.findIndex((e) => valueGetter(e) === v);
      } else {
        return allItem.findIndex((e) => itemString(e) === itemString(v));
      }
    }
  }
  function itemString(item) {
    if (typeof item?.value !== "object") {
      return item?.value;
    } else {
      return item?.value ? JSON.stringify(item.value) : null;
    }
  }

  async function onChange({ target }) {
    if (_primitive) {
      value = target.value || null;
    } else {
      const item = target.value ? allItem[target.value] : {};
      if (typeof valueGetter === "function") {
        value = valueGetter(item);
      } else {
        value = item;
      }
    }
    await tick();
    await dispatch("change", value);
  }
</script>

<div class="mt-1 relative">
  {#if label}
    <label
      for="select-{label}"
      class="block text-sm font-medium text-github-text mb-1"
    >
      {label}
    </label>
  {/if}

  <div class="relative">
    <select
      id="select-{label}"
      bind:this={_element}
      {...props}
      {title}
      {disabled}
      class="block w-full px-3 py-2 pr-10 border border-github-border rounded-md shadow-sm
             focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500
             text-github-text bg-white text-sm appearance-none
             {disabled ? 'opacity-60 cursor-not-allowed bg-github-bg' : ''}"
      aria-label={label}
      value={_itemSelected}
      on:change={onChange}
      on:input
      on:keydown
      on:keypress
      on:keyup
      on:click
      on:focus={() => (_focused = true)}
      on:focus
      on:blur={() => (_focused = false)}
      on:blur
    >
      {#if nullable}
        <option value={null}>&nbsp;</option>
      {/if}
      {#each _allItemIndexed as item}
        <option value={item.value}>{item.text}</option>
      {/each}
    </select>

    <!-- Custom dropdown arrow -->
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-github-gray">
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</div>

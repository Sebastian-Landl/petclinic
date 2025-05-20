<script>
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";

  export let value = "";
  export let label = "";
  export let disabled = false;
  export let placeholder = "HH:MM";

  const dispatch = createEventDispatcher();

  let hours = "";
  let minutes = "";
  let internalUpdate = false;

  // Function to pad numbers with leading zeros
  function padZero(num) {
    return num.toString().padStart(2, "0");
  }

  // Parse the value into hours and minutes
  function parseValue(val) {
    if (!val) return { h: "", m: "" };
    const [h, m] = val.split(":");
    return { h: h || "", m: m || "" };
  }

  // Initialize hours and minutes from the initial value
  onMount(() => {
    const { h, m } = parseValue(value);
    hours = h;
    minutes = m;
  });

  // Watch for external value changes
  $: if (!internalUpdate && value) {
    const { h, m } = parseValue(value);
    if (h !== hours) hours = h;
    if (m !== minutes) minutes = m;
  }

  // Update the value when hours or minutes change
  function updateValue() {
    if (hours !== "" && minutes !== "") {
      internalUpdate = true;
      const newValue = `${padZero(parseInt(hours, 10))}:${padZero(parseInt(minutes, 10))}`;
      if (newValue !== value) {
        value = newValue;
        dispatch("change", value);
      }
      setTimeout(() => {
        internalUpdate = false;
      }, 0);
    }
  }

  function validateHours(event) {
    const input = event.target;
    let val = parseInt(input.value, 10);

    if (isNaN(val)) {
      hours = "";
    } else {
      val = Math.max(0, Math.min(23, val));
      hours = val.toString();
      updateValue();
    }
  }

  function validateMinutes(event) {
    const input = event.target;
    let val = parseInt(input.value, 10);

    if (isNaN(val)) {
      minutes = "";
    } else {
      val = Math.max(0, Math.min(59, val));
      minutes = val.toString();
      updateValue();
    }
  }
</script>

<div class="mt-1 relative">
  {#if label}
    <label
      for="time-input-{label}-hours"
      class="block text-sm font-medium text-github-text dark:text-github-darkText mb-1"
    >
      {label}
    </label>
  {/if}
  <div class="flex items-center">
    <input
      id="time-input-{label}-hours"
      type="number"
      min="0"
      max="23"
      placeholder="HH"
      class="w-16 px-2 py-2 border border-github-border rounded-l-md shadow-sm
             focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500
             text-github-text bg-white text-sm text-center
             dark:bg-github-darkHeader dark:border-github-darkBorder dark:text-github-darkText
             {disabled ? 'opacity-60 cursor-not-allowed bg-github-bg dark:bg-github-darkBg' : ''}"
      bind:value={hours}
      on:change={validateHours}
      {disabled}
      aria-label="{label} hours"
    />
    <span class="px-1 text-github-text dark:text-github-darkText">:</span>
    <input
      id="time-input-{label}-minutes"
      type="number"
      min="0"
      max="59"
      placeholder="MM"
      class="w-16 px-2 py-2 border border-github-border rounded-r-md shadow-sm
             focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500
             text-github-text bg-white text-sm text-center
             dark:bg-github-darkHeader dark:border-github-darkBorder dark:text-github-darkText
             {disabled ? 'opacity-60 cursor-not-allowed bg-github-bg dark:bg-github-darkBg' : ''}"
      bind:value={minutes}
      on:change={validateMinutes}
      {disabled}
      aria-label="{label} minutes"
    />
  </div>
</div>

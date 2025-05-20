<script>
  import filterProps from "../filterProps.js";
  const props = filterProps(
    ["checked", "clicked", "disabled", "outlined", "title", "variant"],
    $$props
  );
  export let checked = false;
  export let clicked = 0;
  export let disabled = false;
  export let outlined = false;
  export let title = undefined;
  export let variant = "primary"; // primary, success, danger

  let element;
  export function focus() {
    element.focus();
  }
  function onClick() {
    checked = !checked;
    clicked++;
  }

  // GitHub-style button classes
  const baseClasses = "text-sm font-medium rounded-md py-1.5 px-3 border focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Variant classes
  const variantClasses = {
    primary: "bg-github-link border-github-link text-white hover:bg-primary-600 focus:ring-primary-500",
    success: "bg-github-success border-github-success text-white hover:bg-green-600 focus:ring-green-500",
    danger: "bg-github-danger border-github-danger text-white hover:bg-red-600 focus:ring-red-500",
  };

  // Outlined variant classes
  const outlinedClasses = {
    primary: "bg-white border-github-border text-github-text hover:bg-github-hover focus:ring-primary-500",
    success: "bg-white border-github-border text-github-success hover:bg-github-hover focus:ring-green-500",
    danger: "bg-white border-github-border text-github-danger hover:bg-github-hover focus:ring-red-500",
  };
</script>

<button
  type="button"
  bind:this={element}
  {...props}
  {title}
  {disabled}
  class:disabled
  class="{baseClasses} {outlined ? outlinedClasses[variant] : variantClasses[variant]} {disabled ? 'opacity-60 cursor-not-allowed' : ''}"
  on:click={onClick}
  on:click
  on:mouseover
  on:focus
  on:blur
>
  <slot />
</button>

<style lang="postcss">
  button.disabled {
    user-select: none;
    pointer-events: none;
  }
</style>

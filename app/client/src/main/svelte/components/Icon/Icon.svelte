<script>
  import filterProps from "../filterProps.js";
  const props = filterProps(
    ["checked", "clicked", "disabled", "name", "outlined", "title", "variant", "size"],
    $$props
  );
  export let checked = false;
  export let clicked = 0;
  export let disabled = false;
  export let name;
  export let outlined = false;
  export let title = undefined;
  export let variant = "default"; // default, primary, success, danger
  export let size = "md"; // sm, md, lg

  let element;
  export function focus() {
    element.focus();
  }
  function onClick() {
    checked = !checked;
    clicked++;
  }

  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8 p-1.5 text-sm",
    md: "w-10 h-10 p-2 text-base",
    lg: "w-12 h-12 p-2 text-xl"
  };

  // Variant classes
  const variantClasses = {
    default: outlined
      ? "bg-white border border-github-border text-github-text hover:bg-github-hover dark:bg-github-darkHeader dark:border-github-darkBorder dark:text-github-darkText dark:hover:bg-github-darkHover"
      : "bg-github-bg border border-github-border text-github-text hover:bg-github-hover dark:bg-github-darkBg dark:border-github-darkBorder dark:text-github-darkText dark:hover:bg-github-darkHover",
    primary: outlined
      ? "bg-white border border-github-link text-github-link hover:bg-github-hover dark:bg-github-darkHeader dark:border-github-darkLink dark:text-github-darkLink dark:hover:bg-github-darkHover"
      : "bg-github-link border border-github-link text-white hover:bg-primary-600 dark:bg-github-darkLink dark:border-github-darkLink dark:text-white dark:hover:bg-primary-700",
    success: outlined
      ? "bg-white border border-github-success text-github-success hover:bg-github-hover dark:bg-github-darkHeader dark:border-github-darkSuccess dark:text-github-darkSuccess dark:hover:bg-github-darkHover"
      : "bg-github-success border border-github-success text-white hover:bg-green-600 dark:bg-github-darkSuccess dark:border-github-darkSuccess dark:text-white dark:hover:bg-green-700",
    danger: outlined
      ? "bg-white border border-github-danger text-github-danger hover:bg-github-hover dark:bg-github-darkHeader dark:border-github-darkDanger dark:text-github-darkDanger dark:hover:bg-github-darkHover"
      : "bg-github-danger border border-github-danger text-white hover:bg-red-600 dark:bg-github-darkDanger dark:border-github-darkDanger dark:text-white dark:hover:bg-red-700"
  };
</script>

<button
  type="button"
  bind:this={element}
  {...props}
  {title}
  {disabled}
  class:disabled
  class="rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
         {sizeClasses[size]} {variantClasses[variant]}
         {disabled ? 'opacity-60 cursor-not-allowed' : ''}"
  on:click={onClick}
  on:click
  on:mouseover
  on:focus
  on:blur
>
  <div class="flex justify-center items-center">
    <i
      {title}
      aria-hidden="true"
      class="material-icons select-none"
    >
      {name}
    </i>
  </div>
</button>

<style lang="postcss">
  button.disabled {
    user-select: none;
    pointer-events: none;
  }
</style>

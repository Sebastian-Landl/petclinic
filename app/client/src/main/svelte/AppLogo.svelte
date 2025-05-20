<script>
  export let open = false;
</script>

<a
  class="flex items-center text-white hover:text-gray-300 cursor-pointer mr-4 border-none focus:outline-none"
  class:open
  href="/home"
  on:click={() => (open = false)}
>
  <img src="/pets.png" alt="Petclinic" class="h-8 w-8 mr-2" />
  <span class="font-semibold text-xl hidden sm:inline-block">Petclinic</span>
</a>

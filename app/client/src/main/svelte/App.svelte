<script>
  import "./index.css";
  import Menu from "./components/Menu";
  import Toast from "./components/Toast";
  import Router from "./pager/Router.svelte";
  import Route from "./pager/Route.svelte";
  import RouteNotFound from "./pager/RouteNotFound.svelte";
  import AppHelp from "./AppHelp.svelte";
  import AppHome from "./AppHome.svelte";
  import AppMenu from "./AppMenu.svelte";
  import Enum from "./pages/Enum.svelte";
  import Owner from "./pages/Owner.svelte";
  import OwnerViewer from "./pages/OwnerViewer.svelte";
  import Pet from "./pages/Pet.svelte";
  import PetViewer from "./pages/PetViewer.svelte";
  import Vet from "./pages/Vet.svelte";
  import VetViewer from "./pages/VetViewer.svelte";
  import Visit from "./pages/Visit.svelte";

  let menuVisible = false;
  let searchQuery = "";

  // Navigation items with icons
  const navItems = [
    { name: "Home", path: "/home", icon: "home" },
    { name: "Owners", path: "/owner", icon: "person" },
    { name: "Pets", path: "/pet", icon: "pets" },
    { name: "Visits", path: "/visit", icon: "event" },
    { name: "Vets", path: "/vet", icon: "medical_services" },
  ];

  // Handle search
  function handleSearch(e) {
    if (e.key === 'Enter') {
      console.log('Searching for:', searchQuery);
      // Implement search functionality here
    }
  }
</script>

<article class="flex flex-col h-screen">
  <!-- GitHub-like header -->
  <header class="flex items-center justify-between bg-github-header text-white p-2 h-16 border-b border-github-border">
    <div class="flex items-center">
      <!-- Hamburger menu for mobile -->
      <div class="md:hidden">
        <AppMenu bind:open={menuVisible} />
      </div>

      <!-- Logo -->
      <a href="/home" class="flex items-center text-white hover:text-gray-300 mr-4">
        <img src="/pets.png" alt="Petclinic" class="h-8 w-8 mr-2" />
        <span class="font-semibold text-xl">Petclinic</span>
      </a>

      <!-- Main navigation - desktop only -->
      <nav class="hidden md:flex space-x-4">
        {#each navItems as item}
          <a
            href={item.path}
            class="flex items-center px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 rounded-md"
          >
            <i class="material-icons text-sm mr-1">{item.icon}</i>
            {item.name}
          </a>
        {/each}
      </nav>
    </div>

    <!-- Search bar -->
    <div class="hidden md:flex flex-1 max-w-xl mx-4">
      <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i class="material-icons text-gray-400 text-sm">search</i>
        </div>
        <input
          type="text"
          bind:value={searchQuery}
          on:keydown={handleSearch}
          placeholder="Search..."
          class="block w-full pl-10 pr-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
        />
      </div>
    </div>

    <!-- Right side navigation -->
    <div class="flex items-center">
      <a href="/help" class="text-white hover:text-gray-300 p-2 rounded-md hover:bg-gray-700">
        <i class="material-icons">help_outline</i>
      </a>
    </div>
  </header>

  <div class="flex flex-1 overflow-hidden">
    <!-- Sidebar - GitHub style -->
    <aside class="hidden md:block w-64 bg-white border-r border-github-border overflow-y-auto">
      <div class="p-4">
        <div class="mb-4">
          <h3 class="text-sm font-semibold text-github-text mb-2">Client</h3>
          <ul class="space-y-1">
            <li>
              <a href="/owner" class="flex items-center px-2 py-1 text-sm text-github-text hover:bg-github-hover rounded-md">
                <i class="material-icons text-github-gray text-sm mr-2">person</i>
                Owners
              </a>
            </li>
            <li>
              <a href="/pet" class="flex items-center px-2 py-1 text-sm text-github-text hover:bg-github-hover rounded-md">
                <i class="material-icons text-github-gray text-sm mr-2">pets</i>
                Pets
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-github-text mb-2">Clinic</h3>
          <ul class="space-y-1">
            <li>
              <a href="/visit" class="flex items-center px-2 py-1 text-sm text-github-text hover:bg-github-hover rounded-md">
                <i class="material-icons text-github-gray text-sm mr-2">event</i>
                Visits
              </a>
            </li>
            <li>
              <a href="/vet" class="flex items-center px-2 py-1 text-sm text-github-text hover:bg-github-hover rounded-md">
                <i class="material-icons text-github-gray text-sm mr-2">medical_services</i>
                Vets
              </a>
            </li>
            <li>
              <a href="/enum/skill" class="flex items-center px-2 py-1 text-sm text-github-text hover:bg-github-hover rounded-md">
                <i class="material-icons text-github-gray text-sm mr-2">psychology</i>
                Skills
              </a>
            </li>
            <li>
              <a href="/enum/species" class="flex items-center px-2 py-1 text-sm text-github-text hover:bg-github-hover rounded-md">
                <i class="material-icons text-github-gray text-sm mr-2">category</i>
                Species
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <!-- Mobile menu -->
    <Menu bind:show={menuVisible}>
      <div class="flex flex-col p-4 text-github-text gap-2">
        <span class="text-lg font-semibold capitalize">Client</span>
        <div class="flex flex-col p-2 gap-2">
          {#each navItems as item}
            <a
              on:click={() => (menuVisible = false)}
              href={item.path}
              class="flex items-center px-2 py-1 text-sm hover:bg-github-hover rounded-md"
            >
              <i class="material-icons text-github-gray text-sm mr-2">{item.icon}</i>
              {item.name}
            </a>
          {/each}
        </div>
      </div>
    </Menu>

    <!-- Main content area -->
    <main class="flex-1 overflow-y-auto bg-github-bg p-4">
      <Toast />
    <Router>
      <Route path="/" component={AppHome} />
      <Route path="/home" component={AppHome} />
      <Route path="/help" component={AppHelp} />
      <Route path="/owner" component={Owner} />
      <Route path="/owner/:id" component={OwnerViewer} />
      <Route path="/pet" component={Pet} />
      <Route path="/pet/:id" component={PetViewer} />
      <Route path="/visit" component={Visit} />
      <Route path="/vet" component={Vet} />
      <Route path="/vet/:id" component={VetViewer} />
      <Route path="/enum/skill" component={Enum} art="skill" />
      <Route path="/enum/species" component={Enum} art="species" />
      <RouteNotFound>
        <h1>Ups!</h1>
      </RouteNotFound>
    </Router>
      </main>
    </div>

    <!-- GitHub-style footer -->
    <footer class="bg-white border-t border-github-border py-6 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center mb-4 md:mb-0">
            <img src="/pets.png" alt="Petclinic" class="h-6 w-6 mr-2" />
            <span class="text-sm text-github-gray">© 2023 Petclinic</span>
          </div>

          <nav class="flex flex-wrap justify-center gap-4">
            <a href="/help" class="text-sm text-github-gray hover:text-github-link">Help</a>
            <a href="/help" class="text-sm text-github-gray hover:text-github-link">Terms</a>
            <a href="/help" class="text-sm text-github-gray hover:text-github-link">Privacy</a>
            <a href="/help" class="text-sm text-github-gray hover:text-github-link">Status</a>
            <a href="/help" class="text-sm text-github-gray hover:text-github-link">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
</article>

<script>
  import { onMount } from "svelte";
  import { toast } from "./components/Toast";
  import { fetchDoc } from "./utils/rest.js";

  import { apiExplorerUrl } from "./utils/rest.js";
  let apiExplorer = apiExplorerUrl();

  import { apiGraphiqlUrl } from "./utils/rest.js";
  let apiGraphiql = apiGraphiqlUrl();

  let versionUrl = "/version";
  let versionHtml = "loading ..";
  onMount(async () => {
    fetchDoc(versionUrl, "text/html")
      .then((res) => res.text())
      .then((html) => {
        versionHtml = html;
      })
      .catch((err) => {
        console.log(err);
        toast.push(err.toString());
      });
  });
</script>

<div class="max-w-4xl mx-auto">
  <div class="github-card">
    <div class="github-card-header">
      <h1 class="text-2xl font-semibold">Welcome to Petclinic</h1>
    </div>
    <p class="mb-4">
      Petclinic is a sample application that demonstrates how to build a Spring Boot application with a Svelte frontend.
    </p>
    <div class="flex items-center mb-6">
      <img src="/pets.png" alt="Pets" class="w-16 h-16 mr-4" />
      <div>
        <h3 class="text-lg font-semibold">Petclinic Application</h3>
        <p class="text-github-gray">Manage your veterinary clinic with ease</p>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <!-- Version Card -->
    <div class="github-card">
      <div class="github-card-header">
        <h2 class="text-lg font-semibold">Application Version</h2>
      </div>
      <div class="text-sm">
        {#if versionHtml}
          {@html versionHtml}
        {:else}
          <div class="flex justify-center items-center h-12">
            <div class="animate-pulse flex space-x-4">
              <div class="h-2 bg-github-border rounded w-24"></div>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- API Explorer Card -->
    <div class="github-card">
      <div class="github-card-header">
        <h2 class="text-lg font-semibold">API Explorer</h2>
      </div>
      <div class="flex items-center">
        <i class="material-icons text-github-gray mr-2">explore</i>
        <a href={apiExplorer} target="_blank" class="text-github-link hover:underline">
          Open API Explorer
        </a>
      </div>
      <div class="mt-4 flex items-center">
        <i class="material-icons text-github-gray mr-2">code</i>
        <a href={apiGraphiql} target="_blank" class="text-github-link hover:underline">
          Open GraphiQL
        </a>
      </div>
    </div>
  </div>

  <!-- Quick Links -->
  <div class="github-card">
    <div class="github-card-header">
      <h2 class="text-lg font-semibold">Quick Navigation</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <a href="/owner" class="flex items-center p-3 border border-github-border rounded-md hover:bg-github-hover">
        <i class="material-icons text-github-gray mr-2">person</i>
        <span>Owners</span>
      </a>
      <a href="/pet" class="flex items-center p-3 border border-github-border rounded-md hover:bg-github-hover">
        <i class="material-icons text-github-gray mr-2">pets</i>
        <span>Pets</span>
      </a>
      <a href="/vet" class="flex items-center p-3 border border-github-border rounded-md hover:bg-github-hover">
        <i class="material-icons text-github-gray mr-2">medical_services</i>
        <span>Vets</span>
      </a>
      <a href="/visit" class="flex items-center p-3 border border-github-border rounded-md hover:bg-github-hover">
        <i class="material-icons text-github-gray mr-2">event</i>
        <span>Visits</span>
      </a>
      <a href="/enum/skill" class="flex items-center p-3 border border-github-border rounded-md hover:bg-github-hover">
        <i class="material-icons text-github-gray mr-2">psychology</i>
        <span>Skills</span>
      </a>
      <a href="/enum/species" class="flex items-center p-3 border border-github-border rounded-md hover:bg-github-hover">
        <i class="material-icons text-github-gray mr-2">category</i>
        <span>Species</span>
      </a>
    </div>
  </div>
</div>

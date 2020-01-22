<script>
  export let components = [];
  export let elements = [];
  export let name = undefined;
</script>

{#each components as component}
  <svelte:component this={component} />
{/each}
{#each elements as element}
  <svelte:component this={element} />
{/each}

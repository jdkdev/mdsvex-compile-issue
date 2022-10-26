<script context="module">
  import h1 from './H1.svelte'
  export {h1}
</script>

<script>
  export let title;
</script>

<slot>
  <!-- the mdsvex content will be slotted in here -->
</slot>

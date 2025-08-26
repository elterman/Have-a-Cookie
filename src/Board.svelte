<script>
    import { ss } from './state.svelte';

    const tiles = $derived(ss.tileSets[ss.step - 1]);
</script>

<div class="board"> </div>

<style>
    .board {
        grid-area: 1/1;
        display: grid;
        place-self: center;
        z-index: 1;
    }
</style>

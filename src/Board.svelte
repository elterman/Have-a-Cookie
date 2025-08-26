<script>
    import { ss } from './state.svelte';
    import Tile from './Tile.svelte';

    const tiles = $derived(ss.tileSets ? ss.tileSets[ss.step - 1] : []);
</script>

<div class="board {ss.paused ? 'paused' : ''}">
    {#each tiles as tile (tile.row * 100 + tile.col)}
        <Tile {tile} />
    {/each}
</div>

<style>
    .board {
        grid-area: 3/1;
        display: grid;
        place-self: center;
        z-index: 1;
        filter: drop-shadow(0 4px 4px #00000080);
    }

    .paused {
        filter: brightness(0.45);
    }
</style>

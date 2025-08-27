<script>
    import Plate from '$lib/images/Plate.webp';
    import Coin from '$lib/images/Coin.webp';
    import Trap from '$lib/images/Death.webp';
    import Flag from '$lib/images/Flag.webp';
    import { BOARD_SIZE, COIN, MIN_GAME_DIMENSION, TRAP } from './const';
    import { ss } from './state.svelte';
    import { samePos } from './utils';

    const { tile } = $props();
    const { row, col, item } = $derived(tile);
    const id = $derived(`tile-${row * 10 + col}`);
    const area = $derived(`${row}/${col}`);
    const flag = $derived(!ss.over && (item === COIN || item === TRAP));
    const coin = $derived(ss.over && item === COIN);
    const trap = $derived(ss.over && item === TRAP);
    const dim = $derived(ss.size + MIN_GAME_DIMENSION - 1);
    const width = $derived(BOARD_SIZE / dim);
    const flagSize = $derived(width / 1.8);
    const coinSize = $derived(width / 1.7);
    const trapSize = $derived(width / 1.9);
    const sel = $derived(ss.over && ss.selected && samePos(ss.selected, tile));
</script>

<div {id} class="tile {ss.puased || ss.over ? 'ro' : ''}" style="grid-area: {area}; width: {width}px; height: {width}px;">
    <div class={`tile-inner${sel ? '-selected' : ''}`}>
        <img class="plate" src={Plate} alt="" width="100%" height="100%" />
        {#if !ss.paused}
            {#snippet content(img, sz)}
                <div class="tile-content">
                    <img src={img} alt="" width={sz} style="filter: drop-shadow(0 0 {sz / 10}px black);" />
                </div>
            {/snippet}
            {#if coin}
                {@render content(Coin, coinSize)}
            {/if}
            {#if trap}
                {@render content(Trap, trapSize)}
            {/if}
            {#if flag}
                {@render content(Flag, flagSize)}
            {/if}
        {/if}
    </div>
</div>

<style>
    .tile {
        display: grid;
        box-sizing: border-box;
        padding: 2.3%;
        cursor: pointer;
    }

    .tile-inner,
    .tile-inner-selected {
        display: grid;
    }

    .tile-inner-selected {
        filter: sepia(1) saturate(3);
    }

    .tile-content {
        grid-area: 1/1;
        place-self: center;
        z-index: 3;
        display: grid;
    }

    .ro {
        pointer-events: none;
    }

    .plate {
        grid-area: 1/1;
    }
</style>

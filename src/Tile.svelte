<script>
    import Plate from '$lib/images/Plate.webp';
    import Coin from '$lib/images/Coin.webp';
    import Trap from '$lib/images/Death.webp';
    import Flag from '$lib/images/Flag.webp';
    import { BOARD_SIZE, COIN, LOST, MIN_GAME_DIMENSION, TILE_SET_SIZE, TRAP, WON } from './const';
    import { _stats, ss } from './state.svelte';
    import { samePos } from './utils';
    import { _sound } from './sound.svelte';

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
    let pressed = $state();
    let _this = $state();

    const processClick = () => {
        ss.selected = { row, col };

        if (!item) {
            const nextStep = ss.step === TILE_SET_SIZE ? 1 : ss.step + 1;
            ss.step = nextStep;

            return;
        }

        ss.over = item === TRAP ? LOST : WON;
        _sound.play(ss.over);

        const { plays } = _stats;
        // const pnts = over === LOST ? 0 : soloPoints;

        // setStats({ plays: plays + 1, total_points: total_points + pnts, best_points: Math.max(best_points, pnts) });

        // if (best_points > 10 && pnts > best_points) {
        //     setAlert({ alert: S_BEST_SCORE });
        // }
    };

    $effect(() => {
        const onTransitionEnd = () => {
            if (pressed) {
                pressed = false;
            } else {
                processClick();
            }
        };

        _this.addEventListener('transitionend', onTransitionEnd);
        return () => this.removeEventListener('transitionend', onTransitionEnd);
    });

    const onPointerDown = () => {
        pressed = true;
    };
</script>

<div
    {id}
    bind:this={_this}
    class="tile {ss.puased || ss.over ? 'ro' : ''} {pressed ? 'pressed' : ''}"
    style="grid-area: {area}; width: {width}px; height: {width}px;"
    onpointerdown={onPointerDown}>
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
        transition: scale 0.1s;
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

    .pressed {
        scale: 0.7;
    }
</style>

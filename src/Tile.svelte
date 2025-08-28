<script>
    import Coin from '$lib/images/Coin.webp';
    import Trap from '$lib/images/Death.webp';
    import Flag from '$lib/images/Flag.webp';
    import BlackPlate from '$lib/images/Plate Black.webp';
    import WhitePlate from '$lib/images/Plate White.webp';
    import Plate from '$lib/images/Plate.webp';
    import { BOARD_SIZE, COIN, LOST, MIN_GAME_DIMENSION, TILE_SET_SIZE, TRAP, WON } from './const';
    import { onOver } from './shared.svelte';
    import { _sound } from './sound.svelte';
    import { ss } from './state.svelte';
    import { samePos } from './utils';

    const { tile } = $props();
    const { row, col, item } = $derived(tile);
    const id = $derived(tile.id);
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

    const onClick = () => {
        ss.selected = { row, col };

        if (!item) {
            const nextStep = ss.step === TILE_SET_SIZE ? 1 : ss.step + 1;
            ss.step = nextStep;

            return;
        }

        onOver(item === COIN ? WON : LOST);
    };

    $effect(() => {
        const onTransitionEnd = () => {
            if (pressed) {
                pressed = false;
            } else {
                onClick();
            }
        };

        _this.addEventListener('transitionend', onTransitionEnd);
        return () => _this.removeEventListener('transitionend', onTransitionEnd);
    });

    const onPointerDown = () => {
        _sound.play('tap');
        pressed = true;
    };
</script>

<div
    {id}
    bind:this={_this}
    class="tile {ss.paused || ss.over ? 'ro' : ''} {pressed ? 'pressed' : ''} {ss.over === LOST ? 'shake' : ''}"
    style="grid-area: {area}; width: {width}px; height: {width}px;"
    onpointerdown={onPointerDown}>
    <img class="plate" src={ss.over && coin ? WhitePlate : sel && trap ? BlackPlate : Plate} alt="" width="100%" height="100%" />
    {#if !ss.paused || ss.over}
        {#snippet content(img, sz)}
            {@const filter = `drop-shadow(0 0 ${sz / 10}px black) saturate(${sel && trap ? 2 : 1})`}
            <div class="tile-content">
                <img src={img} alt="" width={sz} style="filter: {filter};" />
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

<style>
    .tile {
        display: grid;
        box-sizing: border-box;
        padding: 2.3%;
        cursor: pointer;
        transition: scale 0.1s;
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

    .shake {
        animation: shake 0.1s alternate 2 ease-in-out;
    }

    @keyframes shake {
        from {
            transform: scale(1, 1);
        }
        33% {
            transform: scale(1, 1.2);
        }
        66% {
            transform: scale(1.2, 1);
        }
        to {
            transform: scale(1, 1);
        }
    }
</style>

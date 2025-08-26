<script>
    import BlackSizeL from '$lib/images/Size L Black.webp';
    import SizeL from '$lib/images/Size L.webp';
    import BlackSizeM from '$lib/images/Size M Black.webp';
    import SizeM from '$lib/images/Size M.webp';
    import BlackSizeS from '$lib/images/Size S Black.webp';
    import SizeS from '$lib/images/Size S.webp';
    import BlackSizeXL from '$lib/images/Size XL Black.webp';
    import SizeXL from '$lib/images/Size XL.webp';
    import BlackSizeXS from '$lib/images/Size XS Black.webp';
    import SizeXS from '$lib/images/Size XS.webp';
    import Resume from '$lib/images/Resume.webp';
    import Start from '$lib/images/Start.webp';
    import { onSizeSet } from './shared.svelte';
    import { _sound } from './sound.svelte';
    import { ss } from './state.svelte';
    import ToolButton from './Tool Button.svelte';

    const sizes = [
        [SizeXS, BlackSizeXS],
        [SizeS, BlackSizeS],
        [SizeM, BlackSizeM],
        [SizeL, BlackSizeL],
        [SizeXL, BlackSizeXL],
    ];

    const onSizeSelect = (op) => {
        _sound.play('tap');

        onSizeSet(op);
    };

    const onStartOrResume = () => {
        ss.paused = false;

        if (ss.secs === 0) {
            _sound.play('dice');
        }
    };
</script>

<div class="start-prompt">
    {#if ss.secs === 0}
        <div class="sizes">
            {#each sizes as sob, i (i)}
                {@const current = i + 1 === ss.size}
                <div class={current ? 'ro' : ''}>
                    <ToolButton id={`size-${i + 1}`} src={sob[current ? 0 : 1]} onClick={() => onSizeSelect(i + 1)} />
                </div>
            {/each}
        </div>
        <div class="start">
            <ToolButton id="start" src={Start} width={100} onClick={onStartOrResume} />
        </div>
    {:else}
        <div class="start">
            <ToolButton id="start" src={Resume} width={100} onClick={onStartOrResume} />
        </div>
    {/if}
</div>

<style>
    .start-prompt {
        grid-area: 3/1;
        display: grid;
        gap: 20px;
        z-index: 1;
        place-content: center;
    }

    .sizes {
        display: grid;
        grid-auto-flow: column;
        gap: 20px;
        place-content: center;
        filter: drop-shadow(0 2px 3px black);
    }

    .ro {
        pointer-events: none;
    }

    .start {
        filter: drop-shadow(0 2px 5px black);
    }
</style>

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
    import ToolButton from './Tool Button.svelte';

    const sizes = [
        [SizeXS, BlackSizeXS],
        [SizeS, BlackSizeS],
        [SizeM, BlackSizeM],
        [SizeL, BlackSizeL],
        [SizeXL, BlackSizeXL],
    ];

    const onClick = () => {};
</script>

<div class="start-prompt">
    <div class="sizes">
        {#each sizes as sob, i (i)}
            <ToolButton id={`size-${i + 1}`} src={sob[0]} onClick={() => onClick(i + 1)}/>
        {/each}
    </div>
</div>

<style>
    .start-prompt {
        grid-area: 3/1;
        display: grid;
        z-index: 1;
    }

    .sizes {
        display: grid;
        grid-auto-flow: column;
        gap: 20px;
        place-content: center;
        filter: drop-shadow(0 2px 3px black);
    }
</style>

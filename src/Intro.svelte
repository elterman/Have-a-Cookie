<script>
    import { fade } from 'svelte/transition';
    import { DEFAULT_GAME_SIZE, PROMPT_RESUME, PROMPT_START } from './const';
    import PromptPanel from './Prompt Panel.svelte';
    import { _sound } from './sound.svelte';
    import { ss } from './state.svelte';
    import { tapOrClick } from './utils';
    import { onSizeSet } from './shared.svelte';

    const ul = '<ul style="margin: 15px 0 0 0;">';
    const li = '<li style="margin: 10px 0 0 -20px;">';
    const cookie = '<span class="cookie">';
    const napkin = '<span class="cookie">';
    // const napkin = '<span style="color: coral;">';
    const toast = '<span class="toast">';
    const click = tapOrClick();

    const CONTENT = `
        <span>How quickly can you find the delicious ${cookie}cookie</span> hiding under a ${napkin}napkin?</span>
        ${ul}
        ${li}${napkin}Napkins</span> mark either the ${cookie}cookie</span> or a ${toast}burnt toast</span>.</li>
        ${li}${click} a ${napkin}napkin</span> if you think it hides the ${cookie}cookie</span>. Otherwise, tap an empty plate.</li>
        ${li}${toast}Toasts</span> may move with each tap, but the ${cookie}cookie</span> stays in the same spot.</li>
        </ul>`;

    const resume = $derived(ss.cells.length && !ss.over);
    const label = $derived(resume ? PROMPT_RESUME : PROMPT_START);

    const onClick = () => {
        _sound.play('plop');

        if (!ss.size) {
            onSizeSet(DEFAULT_GAME_SIZE);
        }

        if (!ss.over) {
            ss.paused = true;
        }

        ss.intro = false;
    };
</script>

{#if ss.intro}
    <div class="intro" in:fade>
        <div class="title-panel">
            <span class="title cookie">HAVE A COOKIE</span>
            <span class="subtitle toast">DON'T BE TOAST</span>
        </div>
        <div class="content" tabindex="-1">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html CONTENT}
        </div>
        <div class="buttons">
            <PromptPanel ops={[{ label, style: `font-size: ${resume ? 28 : 36}px;`, onClick }]} />
        </div>
    </div>
{/if}

<style>
    .intro {
        place-self: center;
        grid-area: 1/1;
        display: grid;
        gap: 50px;
        justify-items: center;
    }

    .title-panel {
        display: grid;
        place-items: center;
        filter: drop-shadow(0px 2px 5px black);
    }

    .title {
        font-size: 38px;
    }

    .subtitle {
        font-size: 30px;
    }

    .content {
        font-size: 21px;
        display: grid;
        align-content: start;
        width: 330px;
        filter: drop-shadow(0 2px 3px black);
    }

    .buttons {
        place-self: center;
        filter: drop-shadow(0 2px 5px black);
    }
</style>

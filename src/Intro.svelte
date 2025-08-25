<script>
    import { fade } from 'svelte/transition';
    import { PROMPT_RESUME, PROMPT_START } from './const';
    import PromptPanel from './Prompt Panel.svelte';
    import { onStart } from './shared.svelte';
    import { _sound } from './sound.svelte';
    import { ss } from './state.svelte';
    import { tapOrClick } from './utils';

    const ul = '<ul style="margin: 15px 0 0 0;">';
    const li = '<li style="margin: 10px 0 0 -20px;">';
    const gold = '<span style="color: var(--gold);">';
    const red = '<span style="color: var(--red);">';
    const click = tapOrClick();

    const CONTENT = `
        <span>How quickly can you find the delicious ${gold}cookie</span> hiding some-where on the table?</span>
        ${ul}
        ${li}${red}Napkins</span> mark either the ${gold}cookie</span> or a ${gold}burnt toast</span>.</li>
        ${li}${click} a ${red}napkin</span> if you think it hides the ${gold}cookie</span>. Otherwise, tap an empty plate.</li>
        ${li}${gold}Toasts</span> may move with each tap, but the ${gold}cookie</span> stays in the same spot.</li>
        </ul>`;

    const resume = $derived(ss.cells.length && !ss.over);
    const label = $derived(resume ? PROMPT_RESUME : PROMPT_START);

    const onClick = () => {
        _sound.play('plop');

        ss.intro = false;

        if (!resume) {
            onStart();
        }
    };
</script>

{#if ss.intro}
    <div class="intro" in:fade>
        <div class="title">
            <span>HAVE A COOKIE</span>
            <span class="subtitle">DON'T BE TOAST</span>
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

    .title {
        display: grid;
        place-items: center;
        font-size: 38px;
        color: var(--gold);
    }

    .subtitle {
        font-size: 30px;
        color: var(--red);
    }

    .content {
        font-size: 20px;
        display: grid;
        align-content: start;
        width: 330px;
    }

    .buttons {
        place-self: center;
    }
</style>

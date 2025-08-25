<script>
    import { fade } from 'svelte/transition';
    import { PROMPT_RESUME, PROMPT_START } from './const';
    import PromptPanel from './Prompt Panel.svelte';
    import { ss } from './state.svelte';
    import { tapOrClick } from './utils';
    import { onStart } from './shared.svelte';
    import { _sound } from './sound.svelte';

    const ul = '<ul style="margin: 15px 0 0 0;">';
    const li = '<li style="margin: 5px 0 0 -20px;">';
    const click = tapOrClick();

    const CONTENT = `
        <span>Remove counterfeit bills from circulation as quickly as possible.</span>
        ${ul}
        ${li}Only one-dollar bills are real.</li>
        ${li}${click} a banknote to select its denomination.</li>
        ${li}Then select all other bills of the same value.</li>
        ${li}Once complete, the selected bills are destroyed and replaced.</li>
        ${li}Selecting a real bill ends the game in failure.</li>
        ${li}Otherwise, the game ends when only one-dollar bills remain.</li>
        </ul>`;

    const resume = $derived(ss.cells.length && !ss.over);
    const label = $derived(resume ? PROMPT_RESUME : PROMPT_START);
    const fsz = $derived(resume ? 29 : 32);

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
        <div class="title chevalier">
            <span>you only</span>
            <span>leave ones</span>
        </div>
        <div class="content" tabindex="-1">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html CONTENT}
        </div>
        <div class="buttons">
            <PromptPanel ops={[{ label, style: `font-size: ${fsz}px;`, onClick }]} />
        </div>
    </div>
{/if}

<style>
    .intro {
        place-self: center;
        grid-area: 1/1;
        display: grid;
        justify-items: center;
        margin-top: 15px;
    }

    .title {
        display: grid;
        place-items: center;
        font-size: 48px;
        line-height: 1em;
    }

    .content {
        color: var(--sn);
        font-family: PFD Mono;
        font-weight: bold;
        font-size: 18px;
        display: grid;
        align-content: start;
        width: 330px;
        margin: 40px 0 25px;
    }

    .buttons {
        place-self: center;
    }
</style>

import { APP_STATE, PROMPT_PLAY_AGAIN, TICK_MS, TIME_OUT_SECS, WON } from './const';
import { _sound } from './sound.svelte';
import { _prompt, _stats, ss } from './state.svelte';
import { post, retile } from './utils';

export const log = (value) => console.log($state.snapshot(value));

export const persist = () => {
    const json = JSON.stringify({ ..._stats, sfx: _sound.sfx, music: _sound.music });
    localStorage.setItem(APP_STATE, json);
};

export const showIntro = (value, plop = true) => {
    // _prompt.set(null);

    plop && _sound.play('plop');
    ss.intro = true;
    ss.paused = true;
};

export const onStartOrResume = () => {
    delete ss.paused;
    delete ss.startPrompt;

    if (ss.ticks === 0) {
        _sound.play('dice');

        _stats.plays += 1;
        persist();

        startTimer();
    }
};

export const onPlayAgain = () => {
    _sound.play('plop');
    delete ss.over;
    ss.paused = true;
    ss.ticks = 0;
    onSizeSet(ss.size);
    ss.startPrompt = true;
};

export const startTimer = () => {
    stopTimer();
    ss.ticks = 0;

    post(() => {
        if (!ss.over) {
            onTick();
            ss.timer = setInterval(onTick, TICK_MS);
        }
    }, 1000);
};

export const stopTimer = () => {
    clearInterval(ss.timer);
    delete ss.timer;
};

export const selectedCells = () => ss.cells.filter((c) => c.selected);

export const selectedValueCells = () => ss.cells.filter((c) => c.value && c.value === ss.selected);

const onTick = () => {
    if (ss.paused) {
        return;
    }

    ss.ticks += 1;
    const secs = elapsedSecs();

    if (secs >= TIME_OUT_SECS) {
        onOver('lost');
        return;
    }
};

export const onOver = (over) => {
    if (ss.over) {
        return;
    }

    _sound.play(over);
    ss.over = over;
    stopTimer();

    if (over === WON) {
        _stats.won += 1;
        const secs = elapsedSecs();

        _stats.total_secs += secs;

        if (_stats.best_secs === 0 || secs < _stats.best_secs) {
            _stats.best_secs = secs;
        }

        persist();
    }

    post(() => _prompt.set(PROMPT_PLAY_AGAIN), 1000);
};

export const elapsedSecs = () => Math.round(((ss.ticks || 0) * TICK_MS) / 1000);

export const onSizeSet = (size, tileSets) => {
    ss.size = size;

    if (!tileSets) {
        ss.tileSets = null;
        post(() => ss.tileSets = retile(size));
    }

    ss.step = 1;
    ss.ticks = 0;
    ss.over = null;
    ss.paused = true;

    _prompt.set(null);
};

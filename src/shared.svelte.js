import { random, sample } from 'lodash-es';
import { APP_STATE, BILLS, COLS, PROMPT_PLAY_AGAIN, ROWS, TICK_MS, TIME_OUT_SECS } from './const';
import { _sound } from './sound.svelte';
import { _prompt, _stats, ss } from './state.svelte';
import { post, retile } from './utils';

export const log = (value) => console.log($state.snapshot(value));

export const persist = () => {
    const json = JSON.stringify({ ..._stats, sfx: _sound.sfx, music: _sound.music });
    localStorage.setItem(APP_STATE, json);
};

export const showIntro = (value, plop = true) => {
    _prompt.opacity = 0;

    plop && _sound.play('plop');
    ss.intro = true;
    ss.paused = true;
};

export const startTimer = () => {
    stopTimer();
    ss.ticks = 0;

    post(() => {
        onTick();
        ss.timer = setInterval(onTick, TICK_MS);
    }, 1000);
};

const stopTimer = () => {
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

    if (over === 'won') {
        _stats.won += 1;
        const secs = elapsedSecs();

        _stats.total_secs += secs;
        _stats.total_points += ss.score;

        if (_stats.best_secs === 0 || secs < _stats.best_secs) {
            _stats.best_secs = secs;
            _stats.best_points = ss.score;
        }

        persist();
    }

    post(() => _prompt.set(PROMPT_PLAY_AGAIN), 1000);
};

export const elapsedSecs = () => Math.round(((ss.ticks || 0) * TICK_MS) / 1000);

export const onSizeSet = (size, tileSets) => {
    ss.size = size;

    const doRetile = !tileSets;

    if (doRetile) {
        tileSets = retile(size);
    }

    ss.tileSets = tileSets;
    ss.step = 1;
    ss.ticks = 0;
    ss.over = null;
    ss.paused = true;
    _prompt.id = null;
};

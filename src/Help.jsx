import { useAtom } from 'jotai';
import { a_lang } from './atoms';
import { windowSize } from './utils';

const Help = () => {
    const [lang] = useAtom(a_lang);

    const content = {
        'en': <>
            <div>How quickly can you find the delicious <span className='coin'>cookie</span> hiding some-where on the table?</div>
            <div><span className='rose'>Napkins</span> mark either the <span className='coin'>cookie</span> or a <span className='trap'>burnt toast</span>.</div>
            <div>Tap a <span className='rose'>napkin</span> if you think it hides the <span className='coin'>cookie</span>. Otherwise, tap an empty plate.</div>
            <div><span className='trap'>Toasts</span> may move with each tap, but the <span className='coin'>cookie</span> stays in the same spot.</div>
        </>,
    };

    const { x: wx } = windowSize();
    const fontSize = wx < 600 ? '20px' : '24px';

    return <div className='help-content' style={{ fontSize }}>{content[lang]}</div>;
};

export default Help;
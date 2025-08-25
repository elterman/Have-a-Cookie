import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import _ from 'lodash';
import Tile from './Tile';
import { a_paused, a_size, a_tiles } from './atoms';

const Board = () => {
    const [tiles] = useAtom(a_tiles);
    const [size] = useAtom(a_size);
    const [paused] = useAtom(a_paused);

    if (!size) {
        return null;
    }

    return <motion.div className='board' animate={{ filter: paused ? 'brightness(0.45)' : 'drop-shadow(0 4px 4px #00000080)' }}>
        {_.map(tiles, (tile, i) => <Tile key={size * 100 + i} tile={tile} />)}
    </motion.div>;
};

export default Board;
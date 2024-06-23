import { type FC } from 'react';
import MemoryGame from './components/MemoryGame.tsx';

export const App: FC = () => {
    return (
        <div className='App'>
            <MemoryGame />
        </div>
    );
};

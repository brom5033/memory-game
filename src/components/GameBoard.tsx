// GameBoard.tsx
import React from 'react';
import styled from '@emotion/styled';
import MemoryCard from './MemoryCard.tsx';

interface Card {
  image: string;
  flipped: boolean;  // 카드 인터페이스에 'flipped' 속성이 정의되어야 함
}

interface GameBoardProps {
  cards: Card[];
  // eslint-disable-next-line no-unused-vars
  onCardClick: (index: number) => void;
}

const StyledGameBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 20px;
`;

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick }) => {
  return (
    <StyledGameBoard>
      {cards.map((card, index) => (
        <MemoryCard
          key={index}
          image={card.image}
          flipped={card.flipped}  // 'flipped' 상태를 MemoryCard에 전달
          onClick={() => onCardClick(index)}
        />
      ))}
    </StyledGameBoard>
  );
};

export default GameBoard;


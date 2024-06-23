import { useState, useEffect, useRef, FC } from 'react';
import styled from '@emotion/styled';
import GameBoard from './GameBoard.tsx';

interface CardState {
    id: string;
    image: string;
    flipped: boolean;
    matched: boolean;
}

// 카드 셔플 함수
const shuffleArray = (array: CardState[]): CardState[] => {
    const result = array.slice(); // 배열 복사
    for (let i = result.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
};

const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-image: linear-gradient(135deg, #6e8efb, #a777e3);
    border: none;
    border-radius: 30px;
    cursor: pointer;
    outline: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        background-image: linear-gradient(to left, #6e8efb, #a777e3);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    &:focus {
        box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.5);
    }

    &:active {
        transform: translateY(2px);
    }
`;

const Title = styled.h1`
    font-size: 36px;
    text-align: center;
    color: #333;
    margin-top: 20px;
`;

const Timer = styled.div`
    font-size: 18px;
    text-align: center;
    color: #555;
    margin-bottom: 20px;
`;

// 게임 보드 스타일
const GameBoardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    padding: 20px;
    background-color: #f8f8f8; // 배경색 조정
    border-radius: 10px; // 경계 둥글게
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 그림자 추가
`;

const SubText = styled.h2`
    font-size: 24px;
    text-align: center;
    color: #333;
    margin-top: 20px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const FooterText = styled.h4`
    font-size: 12px;
    text-align: center;
    color: #333;
    margin-top: 20px;
`;

const MemoryGame: FC = () => {
    const initialCards: CardState[] = [
        {
            id: 'card1-1',
            image: '/images/card1.jpg',
            flipped: false,
            matched: false,
        },
        {
            id: 'card1-2',
            image: '/images/card1.jpg',
            flipped: false,
            matched: false,
        },
        {
            id: 'card2-1',
            image: '/images/card2.png',
            flipped: false,
            matched: false,
        },
        {
            id: 'card2-2',
            image: '/images/card2.png',
            flipped: false,
            matched: false,
        },
        {
            id: 'card3-1',
            image: '/images/card3.jpg',
            flipped: false,
            matched: false,
        },
        {
            id: 'card3-2',
            image: '/images/card3.jpg',
            flipped: false,
            matched: false,
        },
    ];

    const [cards, setCards] = useState<CardState[]>(
        shuffleArray([...initialCards]),
    );
    const [firstCardIndex, setFirstCardIndex] = useState<number | null>(null);
    const [gameWon, setGameWon] = useState<boolean>(false);
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(0);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        timerRef.current = window.setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
        return () => {
            if (timerRef.current !== null) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // 모든 카드를 초기에 보여주고, 5초 후에 뒤집기
        const flipBackTimer = setTimeout(() => {
            const flippedCards = cards.map((card) => ({
                ...card,
                flipped: false,
            }));
            setCards(flippedCards);
        }, 5000); // 카드 보여주기 시간을 5초로 설정

        return () => clearTimeout(flipBackTimer); // 컴포넌트 언마운트 시 타이머 취소
    }, [cards]);

    useEffect(() => {
        if (cards.every((card) => card.matched)) {
            setGameWon(true);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    }, [cards]);

    // const handleCardClick = (index: number) => {
    //     if (isLocked || cards[index].flipped || cards[index].matched) return;

    //     const newCards = [...cards];
    //     newCards[index].flipped = true;

    //     if (firstCardIndex === null) {
    //         setFirstCardIndex(index);
    //     } else {
    //         const firstCard = newCards[firstCardIndex];
    //         if (newCards[index].image === firstCard.image) {
    //             newCards[index].matched = true;
    //             firstCard.matched = true;
    //             setTimeout(() => {
    //                 setCards(newCards);
    //             }, 600);
    //         } else {
    //             setIsLocked(true);
    //             setTimeout(() => {
    //                 newCards[index].flipped = false;
    //                 firstCard.flipped = false;
    //                 setIsLocked(false);
    //                 setCards(newCards);
    //             }, 1000);
    //         }
    //         setFirstCardIndex(null);
    //     }
    // };

    const handleCardClick = (index: number) => {
        if (isLocked || cards[index].flipped || cards[index].matched) return;

        const newCards = [...cards];
        const currentCard = newCards[index];
        currentCard.flipped = true;

        // 첫 번째 카드 선택
        if (firstCardIndex === null) {
            setFirstCardIndex(index);
        } else {
            const firstCard = newCards[firstCardIndex];

            // 두 카드가 일치하는 경우
            if (currentCard.image === firstCard.image) {
                currentCard.matched = true;
                firstCard.matched = true;
            } else {
                // 두 카드가 일치하지 않는 경우, 일정 시간 후에 두 카드를 다시 뒤집기
                setIsLocked(true);
                setTimeout(() => {
                    currentCard.flipped = false;
                    firstCard.flipped = false;
                    setIsLocked(false);
                }, 500);
            }
            setFirstCardIndex(null);
        }

        setCards(newCards);
    };

    const resetGame = () => {
        setCards(
            shuffleArray(
                [...initialCards].map((card) => ({
                    ...card,
                    flipped: false,
                    matched: false,
                })),
            ),
        );
        setGameWon(false);
        setFirstCardIndex(null);
        setSeconds(0);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    return (
        <div>
            <Title>Memory Game</Title>
            <Timer>Time: {seconds} seconds</Timer>
            <GameBoardContainer>
                <GameBoard cards={cards} onCardClick={handleCardClick} />
            </GameBoardContainer>
            {gameWon && (
                <div>
                    <SubText>모든 카드를 맞추셨습니다. 축하드립니다!</SubText>
                    <ButtonWrapper>
                        <Button onClick={resetGame}>Restart Game</Button>
                    </ButtonWrapper>
                </div>
            )}
            <div>
                <FooterText>
                    * 이 게임은 모두 ChatGpt로 제작 되었습니다. <br /> 간단한
                    코드 수정 및 css 만 작업하였습니다.
                </FooterText>
            </div>
        </div>
    );
};

export default MemoryGame;

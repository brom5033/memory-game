// MemoryCard.tsx
import styled from '@emotion/styled';
import React from 'react';

interface MemoryCardProps {
    image: string;
    onClick: () => void;
    flipped: boolean;
}

const Button = styled.div`
    width: 150px;
    color: #fff;
    background-color: #998789;
    height: 150px;
    font: 600;
    font-size: 6rem;
    text-align: center;
`;

const Image = styled.img`
object-fit: cover;
aspect-ratio: 9/16;
`

const MemoryCard: React.FC<MemoryCardProps> = ({ image, onClick, flipped }) => {
    return (
        <div className={`card ${flipped ? '' : 'flipped'}`} onClick={onClick}>
            <div className="card-inner">
                {flipped ? (
                    <div className="card-front">
                        <Image src={image} alt="Memory Card" width="150" height={150} />
                    </div>
                ) : (
                    <Button className="card-back">?</Button>
                )}
            </div>
        </div>
    );
};

export default MemoryCard;

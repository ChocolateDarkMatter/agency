import React from 'react';
import styled from '@emotion/styled';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const StyledCard = styled.div`
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const StyledCardContent = styled.div`
  padding: 1.5rem;
`;

export const Card: React.FC<CardProps> = ({ children, className, style }) => {
  return (
    <StyledCard className={className} style={style}>
      {children}
    </StyledCard>
  );
};

export const CardContent: React.FC<CardContentProps> = ({ children, className, style }) => {
  return (
    <StyledCardContent className={className} style={style}>
      {children}
    </StyledCardContent>
  );
};
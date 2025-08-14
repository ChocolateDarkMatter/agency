import React from 'react';
import styled from '@emotion/styled';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'outline';
  style?: React.CSSProperties;
}

const StyledBadge = styled.div<{ variant?: string }>`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  transition: all 0.2s ease;

  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: #f1f5f9;
          color: #475569;
          border: 1px solid transparent;
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: #374151;
          border: 1px solid #d1d5db;
        `;
      default:
        return `
          background-color: #8b5cf6;
          color: white;
          border: 1px solid transparent;
        `;
    }
  }}

  &:hover {
    opacity: 0.8;
  }
`;

export const Badge: React.FC<BadgeProps> = ({ children, className, variant = 'default', style }) => {
  return (
    <StyledBadge variant={variant} className={className} style={style}>
      {children}
    </StyledBadge>
  );
};
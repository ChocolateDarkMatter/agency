import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "@styles/colors";

export const ButtonWrapper = styled.div<{
    $align?: "left" | "center" | "right";
}>`
    display: flex;
    justify-content: ${({ $align }) => $align || "flex-start"};
    margin-top: 20px;
`;

export const ButtonLink = styled.a<{
    $variant: "primary" | "secondary" | "outline";
}>`
    text-transform: uppercase;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    position: relative;
    overflow: hidden;
    transform: translateY(0);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    }

    ${({ $variant }) => $variant === "primary" && PrimaryVariant};
    ${({ $variant }) => $variant === "secondary" && SecondaryVariant};
    ${({ $variant }) => $variant === "outline" && OutlineVariant};
`;

export const Button = ButtonLink.withComponent("button");

const PrimaryVariant = css`
    padding: 12px 40px;
    min-width: 150px;
    border: 1.5px solid ${Theme.textDefault};
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 1px;
    font-weight: 500;
    border-radius: 50px;
    background: transparent;
    color: ${Theme.textDefault};

    &:hover {
        background: ${Theme.textDefault};
        color: ${Theme.primary};
    }
`;

const SecondaryVariant = css`
    padding: 12px 40px;
    min-width: 150px;
    border: 1.5px solid ${Theme.tertiary};
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 1px;
    font-weight: 500;
    border-radius: 50px;
    background: ${Theme.tertiary};
    color: ${Theme.primary};

    &:hover {
        background: transparent;
        color: ${Theme.tertiary};
    }
`;

const OutlineVariant = css`
    padding: 12px 40px;
    min-width: 150px;
    border: 1.5px solid ${Theme.textDefault};
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 1px;
    font-weight: 500;
    border-radius: 50px;
    background: transparent;
    color: ${Theme.textDefault};

    &:hover {
        background: ${Theme.textDefault};
        color: ${Theme.primary};
    }
`;

import styled from "@emotion/styled";

export const FadeInStyled = styled.div`
    opacity: 0.001;
    transform: translateY(20px);
    transition: opacity 0.5s, transform 0.5s;

    &.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

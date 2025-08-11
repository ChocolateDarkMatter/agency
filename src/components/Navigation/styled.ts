import { Socials } from "@components/Socials";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Theme } from "@styles/colors";
import { MediaQuery } from "@styles/mediaQuery";

export const NavigationStyled = styled.div`
    display: flex;
    gap: 50px;

    ${MediaQuery.max("xl")} {
        gap: 20px;
    }
`;

export const NavigationListWrapper = styled.nav<{
    $isOpen: boolean;
}>`
    display: flex;
    align-items: center;
    justify-content: center;

    ${MediaQuery.max("lg")} {
        position: fixed;
        top: 0;
        right: -100%;

        background: ${Theme.bgElement};
        height: 100vh;
        z-index: 2;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        padding-top: 85px;

        width: clamp(300px, 80%, 300px);

        ${({ $isOpen }) =>
            $isOpen &&
            css`
                right: 0;
                transform: translateX(0);
            `};
    }
`;

export const NavigationList = styled.ul`
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: flex;

    ${MediaQuery.min("lg")} {
        gap: 20px;
        align-items: center;
        justify-content: center;
    }

    ${MediaQuery.max("lg")} {
        gap: 10px;
        padding: 20px 10px 53px;
        overflow: auto;
        width: 100%;
        height: 100%;

        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    > li a {
        text-decoration: none;
        color: ${Theme.textDefault};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        line-height: 18px;
        padding: 10px;
        border-radius: 5px;
        background-color: transparent;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        transform: translateY(0);

        ${MediaQuery.max("lg")} {
            padding: 15px 20px;
            width: 100%;
            min-height: 44px;
        }

        &:hover {
            background-color: ${Theme.tertiary};
            color: ${Theme.primary};
            transform: translateY(-1px);
            
            ${MediaQuery.min("lg")} {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
        }

        &.active:not(:hover) {
            background-color: ${Theme.tertiary};
            color: ${Theme.primary};
        }
        img {
            margin: 0 15px 0 0;

            max-width: 30px;
            max-height: 30px;

            ${MediaQuery.max("xl")} {
                margin: 0 10px 0 0;
            }
        }
    }
`;

export const NavigationSocials = styled(Socials)`
    position: absolute;
    bottom: 0;
    background: ${Theme.bgElement};
    width: 100%;
    padding: 10px 0;
    margin: 0;
    left: 0;

    li {
        opacity: 1;
    }

    ${MediaQuery.min("lg")} {
        display: none;
    }
`;

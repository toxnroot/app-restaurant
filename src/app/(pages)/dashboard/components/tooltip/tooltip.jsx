"use client";
import styled from "styled-components";

const Tooltip = ({children, nameTooltip}) => {
    return (
        <StyledWrapper>
            <div className="tooltip-container">
                <span className="tooltip">{nameTooltip}</span>
                {children}
            </div>
        </StyledWrapper>
    );
};

let StyledWrapper = styled.div`
    .tooltip-container {
        position: relative;
        font-size: 17px;
        padding: 1rem 0;
        width: fit-content;
        box-sizing: border-box;
        --color: #fff;
        --tooltip-bg: #0f0f0f;
        --tooltip-color: #fff;
        --margin: 0.0rem;
    }
    
    .tooltip {
        position: absolute;
        top: calc(-1 * var(--margin));
        left: 50%;
        transform: translateX(-50%) translateY(0%) scale(0);
        padding: 0.3em 0.6em;
        opacity: 0;
        visibility: hidden;
        background: var(--tooltip-bg);
        color: var(--tooltip-color);
        border-radius: 0.5rem;
        transition: opacity 0.2s, transform 0.2s;
        z-index: 9999;
        white-space: nowrap;
    }

    .tooltip::before {
        position: absolute;
        content: "";
        width: 0.6em;
        height: 0.6em;
        bottom: -0.3em;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        background: var(--tooltip-bg);
    }

    .tooltip-container:hover .tooltip {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(-100%) scale(1);
    }
`;

export default Tooltip;

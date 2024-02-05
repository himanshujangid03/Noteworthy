import styled, { css } from "styled-components";

const Row = styled.div`
    display: flex;

    ${props => props.type === 'horizontal' && css`
        flex-direction: column;
    `}
    ${props => props.type === 'vertical' && css`
        flex-direction: row;
    `}
`

Row.defaultProps = {
    type: 'vertical'
}

export default Row;
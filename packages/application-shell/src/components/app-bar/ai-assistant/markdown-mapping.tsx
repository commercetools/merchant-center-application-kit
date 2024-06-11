import styled from '@emotion/styled';

export const components = {
  p: styled.p`
    font-size: 14px;
    line-height: 22px;
    &:not(:last-child) {
      margin-bottom: 22px;
    }
  `,
  ul: styled.ul`
    font-size: 14px;
    line-height: 22px;
    margin: 0;
    margin-left: 1em;
    padding: 0;

    &:not(:last-child) {
      margin-bottom: 22px;
    }
  `,
  ol: styled.ul`
    font-size: 14px;
    line-height: 22px;
    margin: 0;
    margin-left: 1em;
    padding: 0;

    &:not(:last-child) {
      margin-bottom: 22px;
    }
  `,
  li: styled.li`
    font-size: 14px;
    line-height: 22px;
  `,
  code: styled.code`
    font-size: 14px;
    line-height: 22px;
    font-family: monospace;
  `,
  pre: styled.pre`
    background-color: rgba(0, 0, 0, calc(1 / 32));
    padding: 1em;
    border-radius: 0.5em;
  `,
};

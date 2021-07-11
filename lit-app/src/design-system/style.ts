import { css } from 'lit-element';

export const designSystem = css`
  .line-through {
    text-decoration: line-through;
  }
  .flex {
    display: flex;
  }
  .flex-row {
    flex-direction: row;
  }
  .items-center {
    align-items: center;
  }
  .justify-start {
    justify-content: start;
  }

  .m-1 {
    margin: 0.25rem;
  }
  .mr-1 {
    margin-right: 0.25rem;
  }
  .ml-1 {
    margin-left: 0.25rem;
  }
  .mt-1 {
    margin-top: 0.25rem;
  }
  .mb-1 {
    margin-bottom: 0.25rem;
  }

  .m-2 {
    margin: 0.75rem;
  }
  .mr-2 {
    margin-right: 0.75rem;
  }
  .ml-2 {
    margin-left: 0.75rem;
  }
  .mt-2 {
    margin-top: 0.75rem;
  }
  .mb-2 {
    margin-bottom: 0.75rem;
  }

  .cursor-pointer {
    cursor: pointer;
  }
  .font-monospace {
    font-family: monospace;
  }
  .color-red-300 {
    color: rgb(239, 68, 68);
  }
  .color-white {
    color: white;
  }
  .bg-red-300 {
    background-color: rgb(239, 68, 68);
  }
  .border-0 {
    border: 0px;
  }
`;

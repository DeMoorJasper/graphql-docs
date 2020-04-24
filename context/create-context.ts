import * as React from 'react';

// Typescript helper for creating contexts...
export default function createContext<V>(): [() => V, typeof ctx.Provider, typeof ctx.Consumer] {
  let ctx = React.createContext<V | undefined>(undefined);

  function useContext() {
    let c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }

  return [useContext, ctx.Provider, ctx.Consumer];
}

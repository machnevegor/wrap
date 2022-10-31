// deno-lint-ignore no-explicit-any
export type BaseHandler = (...args: any[]) => any;

export type Wrapped<Handler extends BaseHandler> = (
  ...args: Parameters<Handler>
) => Promise<Awaited<ReturnType<Handler>>>;

export type Wrapper<Handler extends BaseHandler> = (
  handler: Wrapped<Handler>,
  ...args: Parameters<Handler>
) => Promise<Awaited<ReturnType<Handler>>>;

export function wrap<Handler extends BaseHandler>(
  wrapped: Wrapped<Handler>,
  wrapper: Wrapper<Handler>,
): Wrapped<Handler> {
  return (...args: Parameters<Handler>) => wrapper(wrapped, ...args);
}

export function compose<Handler extends BaseHandler>(
  handler: Handler,
  ...wrappers: Wrapper<Handler>[]
): Wrapped<Handler> {
  return wrappers.reduce(
    wrap,
    async (...args: Parameters<Handler>) => await handler(...args),
  );
}

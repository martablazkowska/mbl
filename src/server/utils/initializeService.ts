/* eslint-disable @typescript-eslint/no-explicit-any */
export type IGlobalInstance<T> = { [key: string]: T | undefined };

interface IServiceFactory<T> {
  new (data: any, ...params: any[]): T;
}

export function initializeService<T>(
  ServiceFactory: IServiceFactory<T>,
  data: any,
  globalInstance: { [key: string]: T | undefined },
  globalKey: string,
  ...params: any[]
): T {
  if (!globalInstance[globalKey]) {
    globalInstance[globalKey] = new ServiceFactory(data, ...params);
  }
  const service: T = globalInstance[globalKey]!;

  return service;
}

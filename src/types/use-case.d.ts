export type UseCase<Params extends object, Deps extends object, Result> = (
  params: Params,
  deps?: Deps
) => Promise<Result>;

export const getErrorMessage = (err: unknown): string => {
  let message;
  if(err instanceof Error) message = err.message;
  else message = JSON.stringify(err)

  return message;
}
export const getSortedData = <T extends { [key: string]: string }>(data: T[], key: string, order: string | null) => {
  if (order === null) {
    return data;
  }

  return data.sort((a: T, b: T) => (a[key] < b[key] ? -1 : 1) * (order === 'asc' ? 1 : -1));
};

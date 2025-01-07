export * from './shadcnUtils';

export async function streamToString(stream: any) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}
export const parseStream = async (stream: ReadableStream<any> | null) => {
  const bodyString = await streamToString(stream);
  return JSON.parse(bodyString);
};

export const isServerSide = () => typeof window === 'undefined';
export const isClientSide = () => typeof window !== 'undefined';

export const transformCapabilitiesToPath = (arr: string[]): string[] => {
  return arr.map((item) => '/' + item.toLowerCase().replace('.', '/').replace('_', '-'));
};

export const createQueryParams = (params: Record<string, string | number | undefined>) => {
  const query = Object.keys(params)
    .filter((key) => params[key] !== undefined)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return query ? `?${query}` : '';
};

/**
 * Formats a date string in the format 'YYYY' or 'YYYY-MM' to 'YYYY-MM'.
 * If the input is 'YYYY', it uses the provided default month or '01' if no default is provided.
 *
 * @param {string} dateString - The date string to format, expected to be in 'YYYY' or 'YYYY-MM' format.
 * @param {number} [defaultMonth=1] - The default month to use if the input is in 'YYYY' format.
 * @returns {string} - The formatted date string in 'YYYY-MM' format.
 * @throws {Error} - Throws an error if the input dateString is not in the expected format.
 */
export function formatYyyyMM(dateString: string, defaultMonth = new Date().getMonth() + 1) {
  if (!/^\d{4}(-\d{2})?$/.test(dateString)) {
    throw new Error(`Invalid date format: ${dateString}`);
  }
  const [year, month] = dateString.split('-');
  const yyyy = year;
  const mm = parseInt(month) ? parseInt(month) : defaultMonth;
  const formattedMonth = mm < 10 ? `0${mm}` : mm;
  return `${yyyy}-${formattedMonth}`;
}

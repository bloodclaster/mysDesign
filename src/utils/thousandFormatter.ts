export default function thousandFormatter(value: number) {
  const splits = String(value).split('.');
  const formatted = splits[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return splits[1] ? `${formatted}.${splits[1]}` : formatted;
}

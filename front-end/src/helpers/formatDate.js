export default function formatDate(date) {
  const resultsplit = date.split('T');
  return resultsplit[0].split('-').reverse().join('/');
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
  year: 'numeric',
});

const formatDate = isoString => dateFormat.format(new Date(isoString));

export { formatDate };

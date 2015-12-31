Package.describe({
  name: 'mmsv:jquery-rateit',
  summary: 'RateIt - a modern, mobile-friendly, jQuery (star) rating plugin',
  version: '1.0.22_2',
  git: 'https://github.com/mmsv/meteor-jquery-rateit'
});

Package.onUse(function (api) {
  api.versionsFrom('0.9.0');
  api.use('jquery', 'client');
  api.imply('jquery', 'client');
  api.addFiles([
    'rateit/src/jquery.rateit.js',
    'rateit/src/rateit.css',
    'rateit/src/star.gif',
    'rateit/src/delete.gif',
    'rateit/src/star-black32.png',
    'rateit/src/star-white32.png',
    'rateit/src/star-red32.png',
    'rateit/src/star-gold32.png',
  ], 'client'
  );
});

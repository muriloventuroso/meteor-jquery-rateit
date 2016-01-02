Package.describe({
  name: 'muriloventuroso:jquery-rateit',
  summary: 'RateIt - a modern, mobile-friendly, jQuery (star) rating plugin',
  version: '1.0.4',
  git: 'https://github.com/muriloventuroso/meteor-jquery-rateit'
});

Package.onUse(function (api) {
  api.versionsFrom('0.9.0');
  api.use('templating', 'client','jquery');
  api.imply('jquery', 'client');
  api.addAssets([

      'rateit/star.gif',
      'rateit/delete.gif',
      'rateit/star-black32.png',
      'rateit/star-white32.png',
      'rateit/star-red32.png',
      'rateit/star-gold32.png',

  ], 'client'
  );
  api.addFiles([
      'client/jquery-rateit.html',
    'rateit/jquery-rateit.js',
    'rateit/rateit.css',

    'client/jquery-rateit.js',

  ], 'client'
  );

});

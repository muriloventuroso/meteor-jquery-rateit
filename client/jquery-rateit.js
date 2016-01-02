if (Meteor.isClient) {
    Template.rateit.rendered = function () {
  this.$('.rateit').rateit();
}
}

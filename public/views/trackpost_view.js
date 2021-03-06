Redd.Views.TrackPost = Backbone.View.extend({
  initialize: function() {
    console.log('in TrackPost view');
    this.model.on('sync', function() {
      this.render();
      var obj = this.model.attributes;
      var currentObj = {ups: obj.ups, downs: obj.downs, score: obj.score};
      this.collection.add(currentObj);
    }, this);
  },
  el: '#trackpost',
  template: Redd.Templates('track-post'),
  events: {
    'submit form': 'enterURL'
  },
  render: function(){
    window.debug = this.model.attributes;
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  enterURL: function(e) {
    var url = $('#tracking-url').val();
    Redd.Data.urlSubmit = url;
    console.log('url submitted', url);
    this.model.fetch();
    Redd.Vent.trigger('urlSubmitChange');
    $('#tracking-url').val('');
    return false;
  }
});

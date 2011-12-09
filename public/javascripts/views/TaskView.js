namespace('Todo.views', {
  TaskView : Backbone.View.extend({
    tagName : 'tr',
    className : 'task',

    events : {
      "click.task" : "editTask",
      'submit form#delete-task' : 'deleteTask'
    },

    initialize: function () {
      this.model.bind('change', this.render, this);     //insta-refresh!
    },

    render : function () {
      var html = JST['task'](this.model.attributes);
      $(this.el).html(html);          //this.el is where events are bound
      return this;
    },

    editTask: function () {
      this.resetEdit();
      this.editTaskView = new Todo.views.EditTaskView({model: this.model});
      $('.edit').html(this.editTaskView.render().el);
    },

    deleteTask: function() {
      this.model.destroy();
    },

    resetEdit: function () {
      // prevent any weirdness with rogue bindings
      $('div.edit').html('');
      if (this.editTaskView !== undefined) {
        this.editTaskView.unbind();
      }
    }
  })
});

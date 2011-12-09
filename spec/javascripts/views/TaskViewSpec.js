describe("TaskView", function () {
  beforeEach(function () {
    JST = {task: function() {}};
    this.model = new Backbone.Model({description: "do this thing"});

    this.view = new Todo.views.TaskView({model: this.model});
  });

  it("tagName is 'tr'", function () {
    expect(this.view.tagName).toEqual('tr');
  });

  it("className is 'task'", function () {
    expect(this.view.className).toEqual('task');
  });

  it("renders the template", function () {
    var templateSpy = sinon.spy(JST, "task");
    el = this.view.render();

    expect(templateSpy).toHaveBeenCalled();
  });

  describe("events", function () {
    it("binds 'click .task' to 'editTask'", function () {
      expect(this.view.events['click.task']).toEqual('editTask');
    });

    it("binds a change event to the model", function () {
      var bindSpy = sinon.spy(this.model, "bind");

      var view = new Todo.views.TaskView({model: this.model});

      expect(bindSpy).toHaveBeenCalledWith("change", view.render, view)
    });

    it("binds 'submit form#delete-task' to 'deleteTask'", function() {
      expect(this.view.events['submit form#delete-task']).toEqual('deleteTask');
    });
  });

  describe("deleteTask", function() {

    it("should call delete on the model", function() {
      var destroySpy = sinon.spy(this.model, "destroy");

      this.view.deleteTask();

      expect(destroySpy).toHaveBeenCalled();
    });

  });

  describe("editTask", function () {
    beforeEach(function () {
      this.editTaskView = new Todo.views.EditTaskView();
      this.editStub = sinon.stub(Todo.views, "EditTaskView").returns(this.editTaskView);
      this.renderStub = sinon.stub(this.editTaskView, "render").returns(this.editTaskView);
    });

    afterEach(function () {
      this.editStub.restore();
      this.renderStub.restore();
    });

    it("instantiates an EditTaskView", function () {
      this.view.editTask();

      expect(this.editStub).toHaveBeenCalledWith({model: this.view.model});
      expect(this.view.editTaskView).toEqual(this.editTaskView);
    });

    it("renders the editTaskView", function () {
      this.view.editTask();

      expect(this.editTaskView.render).toHaveBeenCalled();
    });

    it("unbinds events from editTaskView if it exists", function () {
      var unbindStub = sinon.stub(this.editTaskView, "unbind");

      this.view.editTaskView = this.editTaskView;

      this.view.editTask();

      expect(unbindStub).toHaveBeenCalled();
    });

    it("clears edit element", function () {
      setFixtures("<div class='edit'>some content></div>");

      this.view.editTask();

      expect($('div.edit').html()).not.toMatch('some content');
    });
  });
});

import Task from "../controllers/tasks";

export = (app) => {

    const endpoint = process.env.API_BASE + "tasks";

    app.get(endpoint, Task.getAll);

    app.post(endpoint, Task.create);

    app.get(endpoint + "/:id", Task.getOne);

    app.put(endpoint + "/:id", Task.update);

    app.delete(endpoint + "/:id", Task.delete);

};

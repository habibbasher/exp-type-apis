import Task from "../controllers/tasks";

export = (app) => {

    const endpoint = process.env.API_BASE + "tasks";

    app.post(endpoint, Task.create);

    app.delete(endpoint + "/:id", Task.delete);

    app.get(endpoint + "/:id", Task.getOne);

    app.get(endpoint, Task.getAll);

    app.put(endpoint + "/:id", Task.update);

};

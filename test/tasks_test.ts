import { request, chai } from "./common";

describe("# Tasks", () => {
    const endpoint = process.env.API_BASE + "tasks";
    let token;
    let taskId;

    /*
        We could configure this "before" to run before all tests here, login and get a valid token for authentication in the following API calls.
        For that to work, I usually implement a login function inside the common.ts file and import it along with request and chai above.
        before(() => {
            return login().then(res => {
                token = res.body.token;
                return res;
            })
        });
    */

    it("should add some tasks", () => {
        return request.post(endpoint)
            // This is how we can configure authentication once we implement it
            // .set("Authorization", token)
            .send({ "name": "Do the dishes" })
            .expect(res => res.body.message.should.equal("Task saved successfully!"))
            .expect(201)
            .then(res => {
                return request.post(endpoint)
                .send({ "name": "Run in the park" })
                .expect(res => {
                    taskId = res.body.id;
                    res.body.message.should.equal("Task saved successfully!");
                })
                .expect(201);
            });
    });

    it("should not add a task when no data is sent", () => {
        return request.post(endpoint)
            .send({})
            .expect(res => {
                res.body.message.should.equal("Missing parameters");
            })
            .expect(400);
    });

    it("should update a task", () => {
        return request.put(endpoint + "/" + taskId)
            .send({ name: "Take out the trash" })
            .expect(res => res.body.message.should.equal("Task updated successfully!"))
            .expect(200);
    });

    it("should not update a task when no data is sent", () => {
        return request.put(endpoint + "/" + taskId)
            .send({})
            .expect(400);
    });

    it("should return bad request for trying to update a task with a malformed id", () => {
        return request.put(endpoint + "/anything")
            .send({ name: "something else" })
            .expect(400);
    });

    it("should retrieve a task", () => {
        return request.get(endpoint + "/" + taskId)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => res.body._id.should.equal(taskId))
            .expect(200);
    });

    it("should retrieve all tasks", () => {
        return request.get(endpoint)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(res => chai.expect(res.body).to.have.length.of.at.least(1))
            .expect(200);
    });

    it("should return bad request for trying to retrieve a task with a malformed id", () => {
        return request.get(endpoint + "/anything")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400);
    });

    it("should return not found for a non existent task", () => {
        return request.get(endpoint + "/57d6e440b80470c440b3401f")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404);
    });

    it("should return bad request for trying to delete a task with a malformed id", () => {
        return request.delete(endpoint + "/anything")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400);
    });

    it("should delete a task", () => {
        return request.delete(endpoint + "/" + taskId)
            .expect(res => res.body.message.should.equal("Task deleted successfully!"))
            .expect(200);
    });

});
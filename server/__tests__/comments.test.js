const request = require("supertest");
const operations = require("../Sql/dummy_dboperations/commentOperations");

describe("POST /comment", () => {
  describe("Check if user can get post's comments by it's id", () => {
    test("Should get all post's comments", () => {
      const comments = operations.getCommentsForPostOperation(1);
      expect(comments.statusCode).toBe(!null);
    });
  });

  describe("Check if user is able to comment on a post", () => {
    test("User should be able to add a comment to a post", () => {
      const addComment = operations.addCommentOperation(
        1,
        1,
        "Nice photo!"
      );
      expect(addComment.statusCode).toBe(200);
    });
  });

  describe("Check if user can edit a post", () => {
    test("User should be able to edit a post of his own", () => {
      const postEdited = operations.editCommentOperation(
        1,
        "Comment Changed - Testing"
      );
      expect(postEdited.statusCode).toBe(200);
    });
  });
});
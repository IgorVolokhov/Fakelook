const request = require("supertest");
const operations = require("../Sql/dummy_dboperations/postOperations");
const Post = require('../../react/src/classes/post')

describe("POST /posts", () => {
  describe("Check if user receives all posts", () => {
    test("Should get all posts", () => {
      const posts = operations.getAllPostsOperation;
      expect(posts).toBe(!null);
    });
  });

  describe("Check if user gets posts by user id", () => {
    test("Should get all posts by user id", () => {
      const userPosts = operations.getPostsByIdOperation(1);
      expect(userPosts).toBe(!null);
    });

    test("Should get all user posts - smaller", () => {
      const userPosts = operations.getSmallerPostsByUserOperation(1);
      expect(userPosts).toBe(!null);
    });
  });

  describe("Should get a post by it's id", () => {
    const post = operations.getPostByIdOperation(1);
    expect(post).toBe(!null);
  });

  //////////////////////   HOW   ////////////////////////
  describe("Check's if user can add a new post", () => {
    const post = new Post()
  })
});

import { Chat337, User } from "../server.mjs";
import { expect } from "chai";

describe('Chat337 Server Basics', function() {
  let chat;

  before(function() {
    const dcp = new User("dcp", "David Castro-Perez", "DavidCastroPerez.jpg");
    const king = new User("king", "The King", "King-Charles-III.jpg");
    const spanishpm = new User("spanishpm", "Spain's Prime Minister", "Pedro-Sanchez.jpg");

    chat = new Chat337([dcp, king , spanishpm]);
  })

  describe('Conversation Id need to be unique, order, ...', function () {
    it('should generate ids that uniquely identify a conversation between two user ids' , function () {
      const chat = new Chat337([]);
      let id1 = chat.getConversationId("aaa", "aaa");
      let id2 = chat.getConversationId("aaa", "aaa");
      expect(id1).to.equal(id2);

      id1 = chat.getConversationId("aaa", "bbb");
      id2 = chat.getConversationId("bbb", "aaa");
      expect(id1).to.equal(id2);

      id1 = chat.getConversationId("BB", "zzz");
      id2 = chat.getConversationId("zzz", "BB");
      expect(id1).to.equal(id2);

      id1 = chat.getConversationId("BBz", "zz");
      id2 = chat.getConversationId("BB", "zzz");
      expect(id1).to.not.equal(id2);
    });
  });

  describe('Users are kept', function() {
    it("Initial users should be in list of users", function() {
      const users = chat.getUsers();
      expect(users).lengthOf(3);
    });
  });

  describe('Message Sending', function() {
    it("Sent messages should be in a conversation", function() {
      let data = chat.allMessages('dcp', 'king');

      expect(data.messages).lengthOf(0);
      chat.sendMessage('dcp', 'king', 'test message');

      data = chat.allMessages('dcp', 'king');
      expect(data.messages).lengthOf(1);
    });
  });
});

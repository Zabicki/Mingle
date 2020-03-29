package io.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Chat.
 */
@Document(collection = "chat")
public class Chat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @DBRef
    @Field("message")
    private Set<Message> messages = new HashSet<>();

    @DBRef
    @Field("chats")
    private Set<User> chats = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public Chat messages(Set<Message> messages) {
        this.messages = messages;
        return this;
    }

    public Chat addMessage(Message message) {
        this.messages.add(message);
        message.setMessages(this);
        return this;
    }

    public Chat removeMessage(Message message) {
        this.messages.remove(message);
        message.setMessages(null);
        return this;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }

    public Set<User> getChats() {
        return chats;
    }

    public Chat chats(Set<User> users) {
        this.chats = users;
        return this;
    }

    public Chat addChats(User user) {
        this.chats.add(user);
        return this;
    }

    public Chat removeChats(User user) {
        this.chats.remove(user);
        return this;
    }

    public void setChats(Set<User> users) {
        this.chats = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Chat)) {
            return false;
        }
        return id != null && id.equals(((Chat) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Chat{" +
            "id=" + getId() +
            "}";
    }
}

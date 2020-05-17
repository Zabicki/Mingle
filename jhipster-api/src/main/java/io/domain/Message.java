package io.domain;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Message.
 */
@Document(collection = "message")
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("text")
    private String text;

    @Field("createdAt")
    private ZonedDateTime createdAt;

    @DBRef
    @Field("user")
    private User user;

    @DBRef
    @Field("chat")
    private Chat chat;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    @JsonProperty("_id")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public Message text(String message) {
        this.text = message;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public Message createdAt(ZonedDateTime date) {
        this.createdAt = date;
        return this;
    }

    public void setCreatedAt(ZonedDateTime date) {
        this.createdAt = date;
    }

    public User getUser() {
        return user;
    }

    public Message user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Chat getChat() {
        return chat;
    }

    public Message chat(Chat chat) {
        this.chat = chat;
        return this;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Message)) {
            return false;
        }
        return id != null && id.equals(((Message) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Message{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", date='" + getCreatedAt() + "'" +
            "}";
    }
}

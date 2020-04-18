package io.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Review.
 */
@Document(collection = "review")
public class Review implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("score")
    private Integer score;

    @Field("text")
    private String text;

    @DBRef
    @Field("reviewer")
    private User reviewer;

    @DBRef
    @Field("user")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getScore() {
        return score;
    }

    public Review score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getText() {
        return text;
    }

    public Review text(String review) {
        this.text = review;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public User getReviewer() {
        return reviewer;
    }

    public Review reviewer(User user) {
        this.reviewer = user;
        return this;
    }

    public void setReviewer(User user) {
        this.reviewer = user;
    }

    public User getUser() {
        return user;
    }

    public Review user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Review)) {
            return false;
        }
        return id != null && id.equals(((Review) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Review{" +
            "id=" + getId() +
            ", score=" + getScore() +
            ", text='" + getText() + "'" +
            "}";
    }
}

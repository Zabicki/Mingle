package io.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;

import io.domain.enumeration.Category;

/**
 * A Favourites.
 */
@Document(collection = "favourites")
public class Favourites implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("favourite")
    private Category favourite;

    @DBRef
    @Field("favourites")
    @JsonIgnoreProperties("favourites")
    private User favourites;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Category getFavourite() {
        return favourite;
    }

    public Favourites favourite(Category favourite) {
        this.favourite = favourite;
        return this;
    }

    public void setFavourite(Category favourite) {
        this.favourite = favourite;
    }

    public User getFavourites() {
        return favourites;
    }

    public Favourites favourites(User user) {
        this.favourites = user;
        return this;
    }

    public void setFavourites(User user) {
        this.favourites = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Favourites)) {
            return false;
        }
        return id != null && id.equals(((Favourites) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Favourites{" +
            "id=" + getId() +
            ", favourite='" + getFavourite() + "'" +
            "}";
    }
}

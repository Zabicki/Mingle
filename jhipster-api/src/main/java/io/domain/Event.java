package io.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import io.domain.enumeration.Category;

import io.domain.enumeration.Privacy;

/**
 * A Event.
 */
@Document(collection = "event")
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("description")
    private String description;

    @Field("picture")
    private byte[] picture;

    @Field("picture_content_type")
    private String pictureContentType;

    @NotNull
    @Field("city")
    private String city;

    @NotNull
    @Field("address")
    private String address;

    @NotNull
    @GeoSpatialIndexed
    @Field("location")
    private double[] location;

    @Field("max_particpants")
    private Integer maxParticpants;

    @NotNull
    @Field("date")
    private LocalDate date;

    @NotNull
    @Field("recurent")
    private Boolean recurent;

    @Field("interval")
    private Long interval;

    @NotNull
    @Field("category")
    private Category category;

    @NotNull
    @Field("privacy")
    private Privacy privacy;

    @DBRef
    @Field("user")
    @JsonIgnoreProperties("hosts")
    private User user;

    @DBRef
    @Field("events")
    private Set<User> events = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Event name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Event description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPicture() {
        return picture;
    }

    public Event picture(byte[] picture) {
        this.picture = picture;
        return this;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public Event pictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
        return this;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public String getCity() {
        return city;
    }

    public Event city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public Event address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double[] getLocation(){
        return location;
    }

    public Event location(double [] location){
        this.location = location;
        return this;
    }

    public void setLocation(double[] location){
        this.location = location;
    }

    public Integer getMaxParticpants() {
        return maxParticpants;
    }

    public Event maxParticpants(Integer maxParticpants) {
        this.maxParticpants = maxParticpants;
        return this;
    }

    public void setMaxParticpants(Integer maxParticpants) {
        this.maxParticpants = maxParticpants;
    }

    public LocalDate getDate() {
        return date;
    }

    public Event date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Boolean isRecurent() {
        return recurent;
    }

    public Event recurent(Boolean recurent) {
        this.recurent = recurent;
        return this;
    }

    public void setRecurent(Boolean recurent) {
        this.recurent = recurent;
    }

    public Long getInterval() {
        return interval;
    }

    public Event interval(Long interval) {
        this.interval = interval;
        return this;
    }

    public void setInterval(Long interval) {
        this.interval = interval;
    }

    public Category getCategory() {
        return category;
    }

    public Event category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Privacy getPrivacy() {
        return privacy;
    }

    public Event privacy(Privacy privacy) {
        this.privacy = privacy;
        return this;
    }

    public void setPrivacy(Privacy privacy) {
        this.privacy = privacy;
    }

    public User getUser() {
        return user;
    }

    public Event user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<User> getEvents() {
        return events;
    }

    public Event events(Set<User> users) {
        this.events = users;
        return this;
    }

    public Event addEvents(User user) {
        this.events.add(user);
        return this;
    }

    public Event removeEvents(User user) {
        this.events.remove(user);
        return this;
    }

    public void setEvents(Set<User> users) {
        this.events = users;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Event)) {
            return false;
        }
        return id != null && id.equals(((Event) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Event{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", picture='" + getPicture() + "'" +
            ", pictureContentType='" + getPictureContentType() + "'" +
            ", city='" + getCity() + "'" +
            ", address='" + getAddress() + "'" +
            ", location='" + getLocation() + "'" +
            ", maxParticpants=" + getMaxParticpants() +
            ", date='" + getDate() + "'" +
            ", recurent='" + isRecurent() + "'" +
            ", interval=" + getInterval() +
            ", category='" + getCategory() + "'" +
            ", privacy='" + getPrivacy() + "'" +
            "}";
    }
}

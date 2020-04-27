package io.repository;
import io.domain.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Event entity.
 */
@Repository
public interface EventRepository extends MongoRepository<Event, String> {

    @Query("{}")
    Page<Event> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Event> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Event> findOneWithEagerRelationships(String id);

    @Query("{'location': { $nearSphere: { $geometry: {type: 'Point', coordinates: ?0 } , $maxDistance: ?1 } }, " +
        "'category': { $regex: ?2 }, " +
        "'date': {$gte: ?4}, " +
        "'host': {$ne: ?3}, " +
        "'participants': {$ne: ?3 } }")
    Page<Event> findByLocationNear(Point point, double distance, String favourites, String userId, LocalDate date, Pageable pageable);


    @Query("{'city' : ?0, " +
        "'category': { $regex: ?1 }, " +
        "'date': {$gte: ?3}, " +
        "'host': { $ne: ?2 }, " +
        "'participants': { $ne: ?2} }")
    Page<Event> findByCity( String city, String favourites, String userId, LocalDate date, Pageable pageable);


    Page<Event> findByHost(String host,Pageable pageable);

    Page<Event> findByParticipants(String user, Pageable pageable);
}

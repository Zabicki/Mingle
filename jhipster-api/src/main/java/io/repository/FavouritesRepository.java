package io.repository;
import io.domain.Favourites;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the Favourites entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FavouritesRepository extends MongoRepository<Favourites, String> {

}

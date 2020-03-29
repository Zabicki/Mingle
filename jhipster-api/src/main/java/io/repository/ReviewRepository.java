package io.repository;
import io.domain.Review;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the Review entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {

}

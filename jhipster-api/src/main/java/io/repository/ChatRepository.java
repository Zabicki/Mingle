package io.repository;
import io.domain.Chat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Chat entity.
 */
@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {

    @Query("{}")
    Page<Chat> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Chat> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Chat> findOneWithEagerRelationships(String id);

}

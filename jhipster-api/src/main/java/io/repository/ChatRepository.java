package io.repository;
import io.domain.Chat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Chat entity.
 */
@Repository
public interface ChatRepository extends MongoRepository<Chat, String> {

    Page<Chat> findAllByChatters(String id, Pageable pageable);

    Optional<Chat> findOneById(String id);
}

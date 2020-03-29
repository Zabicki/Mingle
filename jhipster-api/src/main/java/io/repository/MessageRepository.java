package io.repository;
import io.domain.Message;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data MongoDB repository for the Message entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageRepository extends MongoRepository<Message, String> {

}

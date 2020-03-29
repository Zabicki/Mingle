package io.service;

import io.domain.Chat;
import io.repository.ChatRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Chat}.
 */
@Service
public class ChatService {

    private final Logger log = LoggerFactory.getLogger(ChatService.class);

    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    /**
     * Save a chat.
     *
     * @param chat the entity to save.
     * @return the persisted entity.
     */
    public Chat save(Chat chat) {
        log.debug("Request to save Chat : {}", chat);
        return chatRepository.save(chat);
    }

    /**
     * Get all the chats.
     *
     * @return the list of entities.
     */
    public List<Chat> findAll() {
        log.debug("Request to get all Chats");
        return chatRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the chats with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Chat> findAllWithEagerRelationships(Pageable pageable) {
        return chatRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one chat by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<Chat> findOne(String id) {
        log.debug("Request to get Chat : {}", id);
        return chatRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the chat by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Chat : {}", id);
        chatRepository.deleteById(id);
    }
}

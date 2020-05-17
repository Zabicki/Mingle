package io.service;

import io.domain.Chat;
import io.domain.Message;
import io.domain.User;
import io.repository.ChatRepository;
import io.repository.MessageRepository;
import io.service.errors.UserNotLoggedIn;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

/**
 * Service Implementation for managing {@link Chat}.
 */
@Service
public class ChatService {

    private final Logger log = LoggerFactory.getLogger(ChatService.class);

    private final ChatRepository chatRepository;

    private final MessageRepository messageRepository;

    @Autowired
    private UserService userService;

    public ChatService(ChatRepository chatRepository, MessageRepository messageRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
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
     * save a message.
     *
     * @param message message to save.
     * @return saved message.
     */
    public Message save(Message message){
        log.debug("Request to save Message : {}", message);
        return messageRepository.save(message);
    }

    /**
     * get a page of messages from given chat.
     *
     * @param pageable pagination information.
     * @param chatId id of the chat.
     * @return page of messages
     */
    public Page<Message> getMessagesFromChat(Pageable pageable, String chatId){
        return messageRepository.findByChat(chatId,pageable);
    }

    /**
     * submit message to save.
     *
     * @param channelId id of chat.
     * @param message content of message.
     * @return created message.
     */
    public Message submitMessage(String channelId, String message){
        User logged = userService.getUserWithAuthorities().orElseThrow(UserNotLoggedIn::new);
        // Todo check if user is member of chat
        // Todo improve exception if chat does not exist
        Chat chat = chatRepository.findOneById(channelId).orElseThrow(RuntimeException::new);
        Message newMessage = new Message()
            .user(logged)
            .createdAt(ZonedDateTime.now())
            .text(message)
            .chat(chat);
        return save(newMessage);
    }


    /**
     * get logged user chats.
     *
     * @param pageable pagination information.
     * @return page of user chats.
     */
    public Page<Chat> getUserChats(Pageable pageable){
        User logged = userService.getUserWithAuthorities().orElseThrow(UserNotLoggedIn::new);
        return chatRepository.findAllByChatters(logged.getId(), pageable);
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

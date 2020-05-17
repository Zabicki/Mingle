package io.web.websocket;

import io.domain.Chat;
import io.domain.Message;
import io.github.jhipster.web.util.PaginationUtil;
import io.service.ChatService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.security.Principal;
import java.util.List;

@Controller
public class SocketController {

    private final Logger log = LoggerFactory.getLogger(SocketController.class);

    private final ChatService chatService;

    public SocketController(ChatService chatService){
        this.chatService = chatService;
    }

    /**
     * webSocket endpoint for chat room.
     *
     * @param channelId id of the room
     * @param message message send.
     * @param principal principal.
     * @return Sends message to all subscribed users.
     */
    @MessageMapping("/topic/send/{channelId}")
    @SendTo("/topic/chat/{channelId}")
    public Message send(@DestinationVariable String channelId, @Payload Message message, Principal principal){
        log.debug("Message received: {}",message);
        log.debug("Principal: {}",principal);
        return chatService.submitMessage(channelId,message.getText());
    }

    /**
     * endpoint to get messages from given chat.
     *
     * @param pageable pagination information.
     * @param channel chat id.
     * @return page of messages from chat.
     */
    @GetMapping("/api/chat/{channel}")
    public ResponseEntity<List<Message>> getMessages(Pageable pageable, @PathVariable String channel){
        log.debug("REST request to get all messages from given chat");

        Page<Message> foundMessages = chatService.getMessagesFromChat(pageable,channel);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(),foundMessages);
        return ResponseEntity.ok().headers(headers).body(foundMessages.getContent());
    }

    /**
     * endpoint to get all currently logged user chats.
     *
     * @param pageable pagination information.
     * @return page of user chats.
     */
    @GetMapping("/api/chat")
    public ResponseEntity<List<Chat>> getChats(Pageable pageable){
        log.debug("REST request to get all user chats");

        Page<Chat> foundChats = chatService.getUserChats(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(),foundChats);
        return ResponseEntity.ok().headers(headers).body(foundChats.getContent());
    }
}
